import { Counter, Histogram, Gauge } from "prom-client";

export const gamesStarted = new Counter({
	name: "games_started",
	help: "Total number of games started on the server",
});

export const activeGames = new Gauge({
	name: "active_games",
	help: "Number of active games on the server",
});

export const battlesStarted = new Counter({
	name: "battles_started",
	help: "Total number of battles started on the server",
});

export const turnDurationMs = new Histogram({
	name: "turn_duration_ms",
	help: "Duration of each turn in milliseconds",
	buckets: [0.5, 1, 1.5, 2, 2.5, 3, 4, 5, 6, 7.5, 10],
});

export const activeBattles = new Gauge({
	name: "active_battles",
	help: "Number of active battles on the server",
});
