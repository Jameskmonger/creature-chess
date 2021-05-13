import winston = require("winston");
import WinstonCloudWatch = require("winston-cloudwatch");

const createWinstonLogger = (logStreamName: string) => {
	const newLogger = winston.createLogger();

	if (!process.env.AWS_ACCESS_KEY_ID || !process.env.AWS_SECRET_ACCESS_KEY) {
		newLogger.add(new winston.transports.Console());

		newLogger.warn("No AWS_ACCESS_KEY_ID or AWS_SECRET_ACCESS_KEY set, not logging to Cloudwatch");

		return newLogger;
	}

	newLogger.add(new WinstonCloudWatch({
		logGroupName: "creature-chess/server-game",
		logStreamName,
		awsRegion: "eu-west-1",
		awsAccessKeyId: process.env.AWS_ACCESS_KEY_ID,
		awsSecretKey: process.env.AWS_SECRET_ACCESS_KEY
	}));

	newLogger.info("Sending Winston logs to Cloudwatch");

	return newLogger;
};

export { createWinstonLogger };
