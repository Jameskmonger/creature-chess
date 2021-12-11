import { createServer } from "http";
import { Server } from "socket.io";
import { createWinstonLogger } from "./src/log";
import { startServer } from "./src/server";

const logger = createWinstonLogger("global");

const port = parseInt(process.env.PORT || "3000", 10);

const httpServer = createServer();
const io = new Server(httpServer, { /* options */ });

httpServer.listen(port, "0.0.0.0");
logger.info(`Server running on port ${port}`);

startServer({ io, logger });
