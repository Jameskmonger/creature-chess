import winston from "winston";

// Silent logger so harness output stays clean. Switch the level to "info"
// (or pass --verbose) for debugging individual games.
export const logger = winston.createLogger({
	level: "error",
	silent: true,
	transports: [new winston.transports.Console()],
});
