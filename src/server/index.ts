import io = require("socket.io");
import { GameHandler } from "./game-handler";
import { Connection } from "./connection";

const port = process.argv[2] || 3000;

const server = io.listen(port);

const gameHandler = new GameHandler();

console.log("Server running on " + port);

server.on("connection", socket => {
    const connection = new Connection(socket);

    gameHandler.registerConnection(connection);
});
