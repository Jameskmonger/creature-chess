import io = require("socket.io");
import { log } from "@creature-chess/shared";

export const openServer = (port: number) => {
    const server = io.listen(port, { transports: ["websocket", "polling"] });

    log("Server listening on port " + port);

    return server;
};
