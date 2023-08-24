import { ManagementClient } from "auth0";
import { Server } from "socket.io";

import { DatabaseConnection } from "@creature-chess/data";

export type HandshakeListenerDependencies = {
	io: Server;
	authClient: ManagementClient;
	database: DatabaseConnection;
};

export type HandshakeRequest = { idToken: string };
