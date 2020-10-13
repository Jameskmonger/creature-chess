import io = require("socket.io");
import { logger } from "../log";

export const openServer = (port: number) => {
    const server = io.listen(port, { transports: ["websocket", "polling"] });

    logger.info("Server listening on port " + port);

    return server;
};
