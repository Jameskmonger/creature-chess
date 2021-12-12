import { Server } from "socket.io";
import { createManagementClient } from "./external/auth0";
import { createDatabaseConnection } from "./external/database";
import { createDiscordApi } from "./external/discord";
import { onHandshakeSuccess } from "./handshake";
import { Matchmaking } from "./matchmaking";

export const startServer = async ({ io }: { io: Server }) => {
	const managementClient = createManagementClient();
	const database = createDatabaseConnection();
	const discordApi = await createDiscordApi();

	const matchmaking = new Matchmaking(database, discordApi);

	onHandshakeSuccess(
		{
			io,
			authClient: managementClient,
			database
		},
		socket => {
			matchmaking.findGame(socket);
		}
	);
};
