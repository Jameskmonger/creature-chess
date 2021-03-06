import { Logger } from "winston";
import { ManagementClient } from "auth0";
import { config } from "@creature-chess/models";
import { createDatabaseConnection } from "@creature-chess/data";
import { UserAppMetadata } from "@creature-chess/auth-server";

import { SocketAuthenticator } from "./socket/socketAuthenticator";
import { openServer } from "./socket/openServer";
import { Matchmaking } from "./matchmaking/matchmaking";
import { createDiscordApi } from "./discord";

const AUTH0_CONFIG = {
	domain: config.auth0.domain,
	clientId: config.auth0.machineToMachineClientId,
	clientSecret: process.env.AUTH0_MANAGEMENT_CLIENT_SECRET
};

export const startServer = async (logger: Logger, port: number) => {
	process.on("unhandledRejection", (error, p) => {
		logger.error("unhandled rejection:");

		console.log("THE ERROR IS ", (error as any).stack);
		console.log("THE PROMISE IS ", p);
	});

	const socketServer = openServer(logger, port);
	const client = new ManagementClient<UserAppMetadata>({
		domain: AUTH0_CONFIG.domain,
		clientId: AUTH0_CONFIG.clientId,
		clientSecret: AUTH0_CONFIG.clientSecret
	});

	const database = createDatabaseConnection(logger, process.env.CREATURE_CHESS_FAUNA_KEY!);
	const discordApi = await createDiscordApi(logger, process.env.DISCORD_BOT_TOKEN!);
	const matchmaking = new Matchmaking(logger, database, discordApi);

	// networking
	const socketAuthenticator = new SocketAuthenticator(logger, client, database, socketServer);
	socketAuthenticator.onSocketAuthenticated((socket, user) => {
		matchmaking.findGame(socket, user);
	});
};
