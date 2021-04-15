import { createWinstonLogger } from "./log";
import { startServer } from "./server";

const logger = createWinstonLogger("global");

if (process.argv[2] === undefined) {
    logger.error("Arguments: [port]");
    process.exit(1);
}

const port = parseInt(process.argv[2], 10);

logger.info("Server running with settings:");
logger.info("   PORT: " + port);

startServer(logger, port);
