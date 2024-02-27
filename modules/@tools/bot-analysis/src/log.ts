import winston = require("winston");

const createWinstonLogger = () => {
	const devMode = false;

	const newLogger = winston.createLogger({
		format: devMode
			? winston.format.combine(
					winston.format.errors({ stack: true }),
					winston.format.colorize(),
					winston.format.timestamp(),
					winston.format.prettyPrint()
				)
			: undefined,
	});

	newLogger.add(new winston.transports.Console());

	return newLogger;
};

export const logger = createWinstonLogger();
