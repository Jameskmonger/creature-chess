import { Server } from "socket.io";
import { ManagementClient } from "auth0";
import { UserAppMetadata } from "@creature-chess/auth-server";
import { DatabaseConnection } from "@creature-chess/data";

export type HandshakeListenerDependencies = {
	io: Server;
	authClient: ManagementClient<UserAppMetadata>;
	database: DatabaseConnection;
};

export type HandshakeRequest = { idToken: string };
