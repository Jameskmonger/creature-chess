import { readdirSync, readFileSync, statSync } from "fs";
import { join } from "path";

type Level = "low" | "high";

type Row = {
	gameId: string;
	botId: string;
	ambition: Level;
	composure: Level;
	vision: Level;
	finishPosition: number;
	finishRound: number;
};

const TRAITS = ["ambition", "composure", "vision"] as const;
type Trait = (typeof TRAITS)[number];

const LEVELS: Level[] = ["low", "high"];

const parseLevel = (raw: string): Level => {
	if (raw !== "low" && raw !== "high") {
		throw new Error(`Expected "low" or "high", got "${raw}"`);
	}
	return raw;
};

// Map low->0, high->1 so Pearson stays meaningful on categorical traits.
const levelToNumber = (l: Level): number => (l === "high" ? 1 : 0);

const dataDir = join(__dirname, "..", "data");

// Cluster harness writes one CSV per worker, named "<runId>-w<n>.csv".
const findRunCsvs = (runId: string | null): string[] => {
	const files = readdirSync(dataDir)
		.filter((f) => f.endsWith(".csv"))
		.map((f) => ({
			name: f,
			path: join(dataDir, f),
			mtime: statSync(join(dataDir, f)).mtimeMs,
		}));

	if (files.length === 0) {
		throw new Error(`No CSV files found in ${dataDir}`);
	}

	// Explicit runId: collect every worker file matching that prefix.
	if (runId !== null) {
		const matches = files.filter((f) => f.name.startsWith(`${runId}`));
		if (matches.length === 0) {
			throw new Error(`No CSV files found for run id "${runId}" in ${dataDir}`);
		}
		return matches.map((f) => f.path);
	}

	// No runId: find the most recently touched file, then bundle in any that
	// share its runId prefix.
	files.sort((a, b) => b.mtime - a.mtime);
	const latest = files[0];
	const match = latest.name.match(/^(\d+)(?:-w\d+)?\.csv$/);
	const runIdPrefix = match ? match[1] : null;

	if (!runIdPrefix) {
		return [latest.path];
	}

	return files.filter((f) => f.name.startsWith(runIdPrefix)).map((f) => f.path);
};

const parseCsvFile = (path: string): Row[] => {
	const content = readFileSync(path, "utf8");
	const lines = content.trim().split("\n");
	const [, ...dataLines] = lines;

	return dataLines.map((line) => {
		const [
			gameId,
			botId,
			ambition,
			composure,
			vision,
			finishPosition,
			finishRound,
		] = line.split(",");
		return {
			gameId,
			botId,
			ambition: parseLevel(ambition),
			composure: parseLevel(composure),
			vision: parseLevel(vision),
			finishPosition: Number(finishPosition),
			finishRound: Number(finishRound),
		};
	});
};

const parseCsvs = (paths: string[]): Row[] =>
	paths.flatMap((p) => parseCsvFile(p));

const pearson = (xs: number[], ys: number[]): number => {
	const n = xs.length;
	if (n === 0) {
		return 0;
	}

	const meanX = xs.reduce((a, b) => a + b, 0) / n;
	const meanY = ys.reduce((a, b) => a + b, 0) / n;

	let num = 0;
	let denX = 0;
	let denY = 0;
	for (let i = 0; i < n; i++) {
		const dx = xs[i] - meanX;
		const dy = ys[i] - meanY;
		num += dx * dy;
		denX += dx * dx;
		denY += dy * dy;
	}

	const denom = Math.sqrt(denX * denY);
	if (denom === 0) {
		return 0;
	}

	return num / denom;
};

const fmt = (n: number, digits = 2): string => {
	const sign = n >= 0 ? " " : "";
	return sign + n.toFixed(digits);
};

const printPearsonTable = (rows: Row[]): void => {
	console.log(`\n=== View 1: Pearson correlation (n=${rows.length}) ===`);
	console.log(
		"            vs finishPosition (lower=better)   vs finishRound (higher=better)"
	);
	for (const trait of TRAITS) {
		const traitValues = rows.map((r) => levelToNumber(r[trait]));
		const positions = rows.map((r) => r.finishPosition);
		const rounds = rows.map((r) => r.finishRound);
		const rPos = pearson(traitValues, positions);
		const rRound = pearson(traitValues, rounds);
		console.log(
			`${trait.padEnd(10)}  r = ${fmt(rPos)}                       r = ${fmt(rRound)}`
		);
	}
};

const printLevelTable = (rows: Row[]): void => {
	console.log(
		"\n=== View 2: Average finishPosition by level (lower=better) ==="
	);
	const header = ["          "].concat(LEVELS.map((l) => l.padEnd(16)));
	console.log(header.join(" "));

	for (const trait of TRAITS) {
		const cells = LEVELS.map((level) => {
			const inGroup = rows.filter((r) => r[trait] === level);
			if (inGroup.length === 0) {
				return "    n/a    ".padEnd(16);
			}
			const avg =
				inGroup.reduce((a, r) => a + r.finishPosition, 0) / inGroup.length;
			return `${avg.toFixed(2)}  (n=${inGroup.length})`.padEnd(16);
		});
		console.log(`${trait.padEnd(10)} ${cells.join(" ")}`);
	}
};

const printPairwiseMatrices = (rows: Row[]): void => {
	console.log("\n=== View 3: Pairwise interaction (avg finishPosition) ===");

	const pairs: [Trait, Trait][] = [
		["ambition", "composure"],
		["ambition", "vision"],
		["composure", "vision"],
	];

	for (const [rowTrait, colTrait] of pairs) {
		console.log(`\n${rowTrait} × ${colTrait}:`);

		const header = ["         "].concat(
			LEVELS.map((l) => `${colTrait[0]}:${l}`.padEnd(13))
		);
		console.log(header.join(" "));

		for (const rl of LEVELS) {
			const cells = LEVELS.map((cl) => {
				const inCell = rows.filter(
					(r) => r[rowTrait] === rl && r[colTrait] === cl
				);
				if (inCell.length === 0) {
					return "   n/a    ".padEnd(13);
				}
				const avg =
					inCell.reduce((a, r) => a + r.finishPosition, 0) / inCell.length;
				return `${avg.toFixed(2)} (n=${inCell.length})`.padEnd(13);
			});
			console.log(`${rowTrait[0]}:${rl.padEnd(4)} ${cells.join(" ")}`);
		}
	}
};

const main = (): void => {
	const args = process.argv.slice(2);

	const runArgIndex = args.indexOf("--run");
	const runId = runArgIndex >= 0 ? args[runArgIndex + 1] ?? null : null;

	const explicitPaths = args.filter((a) => a.endsWith(".csv"));
	const csvPaths =
		explicitPaths.length > 0
			? explicitPaths.map((p) => join(process.cwd(), p))
			: findRunCsvs(runId);

	console.log(
		runId
			? `Run id: ${runId} - reading ${csvPaths.length} file(s):`
			: `Reading ${csvPaths.length} file(s) (latest run):`
	);
	for (const p of csvPaths) {
		console.log(`  ${p}`);
	}

	const rows = parseCsvs(csvPaths);
	console.log(
		`Loaded ${rows.length} rows from ${new Set(rows.map((r) => r.gameId)).size} games`
	);

	printPearsonTable(rows);
	printLevelTable(rows);
	printPairwiseMatrices(rows);
};

main();
