import express from "express";
import { logger as expressWinston } from "express-winston";
import { existsSync } from "fs";
import { createServer } from "http";
import path from "path";
import { Server } from "socket.io";

import { logger } from "./src/log";
import { startServer } from "./src/server";

process.on("unhandledRejection", function (reason, p) {
	console.log(
		"Possibly Unhandled Rejection at: Promise ",
		p,
		" reason: ",
		reason
	);
	// application specific logging here
});

const port = parseInt(process.env.PORT || "3000", 10);

const publicPath = path.join(__dirname, "/public");
if (!existsSync(publicPath)) {
	logger.error(`No /public dir found (looked in ${publicPath})`);
	process.exit(1);
}

const app = express();
const server = createServer(app);
const io = new Server(server, { path: "/socket.io" });

app.use(express.static(publicPath));
app.use(expressWinston({ winstonInstance: logger }));

startServer({ io }).catch((e) => {
	logger.error("An error occurred while starting the server", e);
	process.exit(1);
});

server.listen(port, "0.0.0.0");
logger.info(`Server running on port ${port}`);
