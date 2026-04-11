import cluster from "cluster";
import { createWriteStream } from "fs";
import { cpus } from "os";
import { join } from "path";
import { v4 as uuid } from "uuid";

import { BotPersonality, BotPersonalityValue } from "@cc-server/data";

import { runGame, BotUnderTest } from "./runGame";

const TOTAL_GAMES = parseInt(process.env.GAMES ?? "200", 10);
const BOTS_PER_GAME = 8;
const WORKER_COUNT = parseInt(
	process.env.WORKERS ?? String(Math.max(1, cpus().length - 1)),
	10
);

const RUN_ID = process.env.RUN_ID ?? String(Date.now());
const DEBUG_BOT = process.env.DEBUG_BOT === "1";
const dataDir = join(__dirname, "..", "data");

const debugLogPath = (workerId: string | number) =>
	join(dataDir, `${RUN_ID}-w${workerId}-debug.jsonl`);

// Match production: multiples of 20 in [20, 200].
// See modules/@cc-server/data/src/bot/_setup.ts
const makePersonality = (): BotPersonality => {
	const value = (): BotPersonalityValue =>
		((Math.floor(Math.random() * 10) + 1) * 20) as BotPersonalityValue;

	return {
		ambition: value(),
		composure: value(),
		vision: value(),
	};
};

const makeBot = (index: number): BotUnderTest => {
	const id = uuid();
	return {
		id,
		name: `Bot${index}-${id.slice(0, 6)}`,
		personality: makePersonality(),
	};
};

const runWorker = async () => {
	const workerId = process.env.WORKER_ID ?? "0";
	const gamesForThisWorker = parseInt(process.env.WORKER_GAMES ?? "0", 10);
	const startGameIndex = parseInt(process.env.WORKER_START ?? "0", 10);

	const outPath = join(dataDir, `${RUN_ID}-w${workerId}.csv`);
	const file = createWriteStream(outPath);
	file.write(
		"gameId,botId,ambition,composure,vision,finishPosition,finishRound\n"
	);

	for (let g = 0; g < gamesForThisWorker; g++) {
		const globalIndex = startGameIndex + g;
		const bots = Array.from({ length: BOTS_PER_GAME }, (_, i) => makeBot(i));
		const gameId = `game-${globalIndex}`;

		const result = await runGame(gameId, bots);

		for (const bot of result.bots) {
			file.write(
				[
					gameId,
					bot.id,
					bot.personality.ambition,
					bot.personality.composure,
					bot.personality.vision,
					bot.finishPosition,
					bot.finishRound,
				].join(",") + "\n"
			);
		}

		// Notify master after each game so it can show overall progress
		if (process.send) {
			process.send({ type: "game-done" });
		}
	}

	await new Promise<void>((resolve) => file.end(resolve));
};

const runMaster = () => {
	const startTime = Date.now();

	const gamesPerWorker = Math.ceil(TOTAL_GAMES / WORKER_COUNT);
	console.log(`Run id: ${RUN_ID}`);
	console.log(
		`Running ${TOTAL_GAMES} games × ${BOTS_PER_GAME} bots ` +
			`across ${WORKER_COUNT} workers (${gamesPerWorker}/worker) ` +
			`→ ${dataDir}/${RUN_ID}-w*.csv`
	);

	if (DEBUG_BOT) {
		console.log(
			"DEBUG_BOT=1 → per-bot decisions will be dumped to " +
				`${dataDir}/${RUN_ID}-w*-debug.jsonl`
		);
	}

	let gamesDone = 0;
	let workersDone = 0;

	for (let i = 0; i < WORKER_COUNT; i++) {
		const start = i * gamesPerWorker;
		const remaining = Math.max(0, TOTAL_GAMES - start);
		const workerGames = Math.min(gamesPerWorker, remaining);
		if (workerGames === 0) {
			continue;
		}

		// Each worker gets its own debug file so appends from multiple workers
		// don't interleave. DEBUG_BOT is only propagated when set on the master.
		const workerEnv: Record<string, string> = {
			RUN_ID,
			WORKER_ID: String(i),
			WORKER_GAMES: String(workerGames),
			WORKER_START: String(start),
		};
		if (DEBUG_BOT) {
			workerEnv.DEBUG_BOT = "1";
			workerEnv.DEBUG_BOT_LOG_FILE = debugLogPath(i);
		}

		const worker = cluster.fork(workerEnv);

		worker.on("message", (msg: { type: string }) => {
			if (msg?.type === "game-done") {
				gamesDone++;
				if (gamesDone % 10 === 0 || gamesDone === TOTAL_GAMES) {
					const elapsed = ((Date.now() - startTime) / 1000).toFixed(1);
					console.log(
						`game ${gamesDone}/${TOTAL_GAMES}  (${elapsed}s elapsed)`
					);
				}
			}
		});

		worker.on("exit", () => {
			workersDone++;
			if (workersDone === WORKER_COUNT || gamesDone >= TOTAL_GAMES) {
				const totalSeconds = ((Date.now() - startTime) / 1000).toFixed(1);
				console.log(`Done in ${totalSeconds}s.`);
				console.log(`Run id: ${RUN_ID}`);
				console.log(
					`Analyse with: yarn nx run @tools/bot-arena:correlate -- --run ${RUN_ID}`
				);
				process.exit(0);
			}
		});
	}
};

if (cluster.isPrimary) {
	runMaster();
} else {
	runWorker()
		.then(() => process.exit(0))
		.catch((err) => {
			console.error(err);
			process.exit(1);
		});
}
