import io = require("socket.io");
import { GameHandler } from "./game-handler";
import { Connection } from "./connection";

const server = io.listen(3000);

const gameHandler = new GameHandler();

console.log("Server running on 3000");

server.on("connection", socket => {
    const connection = new Connection(socket);

    gameHandler.registerConnection(connection);
});
