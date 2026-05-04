import { Server } from "socket.io";

import { DatabaseConnection } from "@cc-server/data";

export type HandshakeListenerDependencies = {
	io: Server;
	database: DatabaseConnection;
};
