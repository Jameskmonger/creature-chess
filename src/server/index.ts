import { Server } from "./server";
import { log } from "@common/log";

if (process.argv[2] === undefined || process.argv[3] === undefined || process.argv[4] === undefined) {
    log("Arguments: [port] [gameSize] [botCount]");
    process.exit(1);
}

const port = parseInt(process.argv[2], 10);
const gameSize = parseInt(process.argv[3], 10);
const botCount = parseInt(process.argv[4], 10);

log("");
log("Server running with settings:");
log("   PORT: " + port);
log("   GAME_SIZE: " + gameSize);
log("   BOT_COUNT: " + botCount);
log("");

const server = new Server(gameSize, botCount);
server.listen(port);
