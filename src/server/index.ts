
import { Server } from "./server";
import { Connection } from "./connection";
import { log } from "./log";

if (process.argv[2] === undefined || process.argv[3] === undefined) {
    log("Arguments: [port] [gameSize]");
    process.exit(1);
}

const port = parseInt(process.argv[2], 10);
const gameSize = parseInt(process.argv[3], 10);

log("");
log("Server running with settings:");
log("   PORT: " + port);
log("   GAME_SIZE: " + gameSize);
log("");

const server = new Server(gameSize);
server.listen(port);
