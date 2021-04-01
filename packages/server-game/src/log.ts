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

type LoggerWrapper = {
    info: (message: string, matchId?: string) => void;
    warn: (message: string, matchId?: string) => void;
    error: (message: string, matchId?: string) => void;
    closeMatch: (matchId: string) => void;
}

const loggers: { [matchId: string]: winston.Logger } = {
    [""]: createWinstonLogger("global")
};

const wrapLogFunction = (logMethodSelector: (logger: winston.Logger) => winston.LeveledLogMethod) =>
    (message: string, matchId: string = "") => {
        let logger = loggers[matchId];

        if (!logger) {
            logger = createWinstonLogger(`match-${matchId}`);
            loggers[matchId] = logger;
        }

        return logMethodSelector(logger)(message);
    }

const logger: LoggerWrapper = {
    info: wrapLogFunction(logger => logger.info),
    warn: wrapLogFunction(logger => logger.warn),
    error: wrapLogFunction(logger => logger.error),
    closeMatch: matchId => {
        const logger = loggers[matchId];

        if (!logger) {
            return;
        }

        logger.close();
        delete loggers[matchId];
    }
}

export { logger };
