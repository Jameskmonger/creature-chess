import { Server } from "socket.io";
import { Logger } from "winston";
import { createManagementClient } from "./external/auth0";
import { createDatabaseConnection } from "./external/database";
import { createDiscordApi } from "./external/discord";
import { onHandshakeSuccess } from "./handshake";
import { Matchmaking } from "./matchmaking";

export const startServer = async ({ io, logger }: { io: Server; logger: Logger }) => {
	const managementClient = createManagementClient();
	const database = createDatabaseConnection(logger);
	const discordApi = await createDiscordApi(logger);

	const matchmaking = new Matchmaking(logger, database, discordApi);

	onHandshakeSuccess(
		{
			io,
			logger,
			authClient: managementClient,
			database
		},
		socket => {
			matchmaking.findGame(socket);
		}
	);
};
