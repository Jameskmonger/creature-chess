import io = require("socket.io");
import { GameHandler } from "./game-handler";
import { Connection } from "./connection";
import { log } from "./log";

if (process.argv[2] === undefined || process.argv[3] === undefined) {
    log("Arguments: [port] [gameSize]");
    process.exit(1);
}

const port = process.argv[2];
const gameSize = parseInt(process.argv[3], 10);

log("");
log("Server running with settings:");
log("   PORT: " + port);
log("   GAME_SIZE: " + gameSize);
log("");

const server = io.listen(port);

log("Server listening on port " + port);

const gameHandler = new GameHandler(gameSize);

server.on("connection", socket => {
    const connection = new Connection(socket);

    gameHandler.registerConnection(connection);
});
