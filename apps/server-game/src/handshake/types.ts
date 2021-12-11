import { Server } from "socket.io";
import { ManagementClient } from "auth0";
import { Logger } from "winston";
import { UserAppMetadata } from "@creature-chess/auth-server";
import { DatabaseConnection } from "@creature-chess/data";

export type HandshakeListenerDependencies = {
	io: Server;
	logger: Logger;
	authClient: ManagementClient<UserAppMetadata>;
	database: DatabaseConnection;
};

export type HandshakeRequest = { idToken: string };
