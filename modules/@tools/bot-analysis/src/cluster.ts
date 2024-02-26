import cluster from "cluster";
import { mkdirSync } from "fs";
import { cpus } from "os";
import readline from "readline";

import { GamemodeSettings } from "@creature-chess/models/settings";

import { runAnalysis } from "./analyser";

/**
 * Settings to override the default gamemode settings
 */
const settings: Partial<GamemodeSettings> = {
	healthLostPerPiece: 1,
};

/**
 * The number of games to run per generated set of 8 bots
 */
const GAME_ITERATION_COUNT = 30;

// === internal settings below ===

const ITERATION_COUNT = 1;
const numCPUs = cpus().length;
const coreCount = Math.max(24, numCPUs - 1);

// ===

if (cluster.isMaster) {
	runMaster();
} else {
	runWorker();
}

function runMaster() {
	const startTime = Date.now();

	// make dir ./data/startTime
	mkdirSync(`./data/${startTime}`, { recursive: true });

	console.log(`Master ${process.pid} is running`);
	console.log(`Forking for ${coreCount} cores`);

	let activeWorkers = 0;
	let stopSpawning = false;

	const spawnWorkers = () => {
		while (activeWorkers < coreCount && !stopSpawning) {
			cluster.fork({
				START_TIME: startTime,
			});
			activeWorkers++;
		}
	};

	spawnWorkers(); // Initial spawn of workers

	cluster.on("exit", (worker, code, signal) => {
		console.log(`Worker ${worker.process.pid} finished`);
		activeWorkers--;

		if (!stopSpawning) {
			// Spawn a new worker to replace the finished one
			cluster.fork({
				START_TIME: startTime,
			});
			activeWorkers++;
		} else if (activeWorkers === 0) {
			console.log("All processes completed");
			process.exit();
		}
	});

	const rl = readline.createInterface({
		input: process.stdin,
		output: process.stdout,
	});

	rl.on("line", (input) => {
		if (input === "q") {
			console.log("Stopping new worker spawning...");
			stopSpawning = true;
			rl.close();
		}
	});
}

function runWorker() {
	const workerId = cluster!.worker!.id;
	const totalWorkers = coreCount;

	runAnalysis(
		`./data/${process.env["START_TIME"]}/${workerId}.csv`,
		ITERATION_COUNT,
		GAME_ITERATION_COUNT,
		settings
	).then(() => {
		process.exit();
	});
}
