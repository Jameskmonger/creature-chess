import { ManagementClient } from "auth0";
import { Server } from "socket.io";

import { DatabaseConnection } from "@cc-server/data";

export type HandshakeListenerDependencies = {
	io: Server;
	authClient: ManagementClient;
	database: DatabaseConnection;
};
