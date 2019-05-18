import { Server } from "./server";
import { log } from "@common/log";

if (process.argv[2] === undefined) {
    log("Arguments: [port]");
    process.exit(1);
}

const port = parseInt(process.argv[2], 10);

log("");
log("Server running with settings:");
log("   PORT: " + port);
log("");

const server = new Server();
server.listen(port);
