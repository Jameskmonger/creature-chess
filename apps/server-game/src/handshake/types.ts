import { ManagementClient } from "auth0";
import { Server } from "socket.io";

import { UserAppMetadata } from "@creature-chess/auth-server";
import { DatabaseConnection } from "@creature-chess/data";

export type HandshakeListenerDependencies = {
	io: Server;
	authClient: ManagementClient<UserAppMetadata>;
	database: DatabaseConnection;
};
