import winston = require("winston");

const createWinstonLogger = () => {
	const newLogger = winston.createLogger();

	newLogger.add(new winston.transports.Console());
	newLogger.info("Sending Winston logs to console");

	return newLogger;
};

export const logger = createWinstonLogger();
