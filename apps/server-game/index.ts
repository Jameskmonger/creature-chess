import express from "express";
import { logger as expressWinston } from "express-winston";
import { createServer } from "http";
import { register } from "prom-client";
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

const app = express();
const server = createServer(app);
const io = new Server(server, { path: "/socket.io" });

app.use(expressWinston({ winstonInstance: logger }));

app.get("/metrics", async (req, res) => {
	res.setHeader("Content-Type", register.contentType);
	res.end(await register.metrics());
});

startServer({ io }).catch((e) => {
	logger.error("An error occurred while starting the server", e);
	process.exit(1);
});

server.listen(port, "0.0.0.0");
logger.info(`Server running on port ${port}`);
