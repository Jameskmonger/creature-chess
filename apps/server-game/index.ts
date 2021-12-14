import { createServer } from "http";
import path from "path";
import { existsSync } from "fs";
import express from "express";
import { Server } from "socket.io";
import { logger } from "./src/log";
import { startServer } from "./src/server";

const port = parseInt(process.env.PORT || "3000", 10);

const publicPath = path.join(__dirname, "/public");
if (!existsSync(publicPath)) {
	logger.error(`No /public dir found (looked in ${publicPath})`);
	process.exit(1);
}

const app = express();
const server = createServer(app);
const io = new Server(server);

app.use(express.static(publicPath));

startServer({ io });

server.listen(port, "0.0.0.0");
logger.info(`Server running on port ${port}`);
