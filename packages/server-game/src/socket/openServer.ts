import { Logger } from "winston";

import { createServer } from "http";
import { Server } from "socket.io";

export const openServer = (logger: Logger, port: number) => {
	const httpServer = createServer();

	const server = new Server(httpServer, { transports: ["websocket", "polling"] });

	httpServer.listen(port);

	logger.info("Server listening on port " + port);

	return server;
};
