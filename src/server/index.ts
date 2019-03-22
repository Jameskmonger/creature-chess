import io = require("socket.io");
import { NetworkHandler } from "./network-handler";
import { GameHandler } from "./game-handler";

const server = io.listen(3000);

const gameHandler = new GameHandler();
const networkHandler = new NetworkHandler(gameHandler);

server.on("connection", socket => {
    networkHandler.receiveConnection(socket);
});
