import { Logger } from "winston";
import io = require("socket.io");

export const openServer = (logger: Logger, port: number) => {
	const server = io.listen(port, { transports: ["websocket", "polling"] });

	logger.info("Server listening on port " + port);

	return server;
};
