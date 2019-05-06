import io = require("socket.io");
import { GameHandler } from "./game-handler";
import { Connection } from "./connection";

if (process.argv[2] === undefined || process.argv[3] === undefined) {
    console.log("Arguments: [port] [gameSize]");
    process.exit(1);
}

const port = process.argv[2];
const gameSize = parseInt(process.argv[3], 10);

console.log("");
console.log("Server running with settings:");
console.log("   PORT: " + port);
console.log("   GAME_SIZE: " + gameSize);
console.log("");

const server = io.listen(port);

console.log("Server listening on port " + port);

const gameHandler = new GameHandler(gameSize);

server.on("connection", socket => {
    const connection = new Connection(socket);

    gameHandler.registerConnection(connection);
});
