import { ManagementClient } from "auth0";
import { log } from "@creature-chess/shared";
import { SocketAuthenticator } from "./socket/socketAuthenticator";
import { createDatabaseConnection } from "@creature-chess/data";
import { openServer } from "./socket/openServer";
import { Matchmaking } from "./matchmaking/matchmaking";
import { UserAppMetadata } from "@creature-chess/auth-server";
import { createDiscordApi } from "./discord";
import { createWinstonLogger } from "./log";
import { config } from "@creature-chess/shared";

process.on("unhandledRejection", (error) => {
    log("unhandled rejection:");
    log(error as any);
});

const AUTH0_CONFIG = {
    domain: config.auth0.domain,
    clientId: config.auth0.machineToMachineClientId,
    clientSecret: process.env.AUTH0_MANAGEMENT_CLIENT_SECRET
};

export const startServer = async (port: number) => {
    const logger = createWinstonLogger("global");

    const socketServer = openServer(logger, port);
    const client = new ManagementClient<UserAppMetadata>({
        domain: AUTH0_CONFIG.domain,
        clientId: AUTH0_CONFIG.clientId,
        clientSecret: AUTH0_CONFIG.clientSecret
    });

    const database = createDatabaseConnection(process.env.CREATURE_CHESS_FAUNA_KEY);
    const discordApi = await createDiscordApi(logger, process.env.DISCORD_BOT_TOKEN);
    const matchmaking = new Matchmaking(logger, database, discordApi);

    // networking
    const socketAuthenticator = new SocketAuthenticator(logger, client, database, socketServer);
    socketAuthenticator.onSocketAuthenticated((socket, user) => {
        matchmaking.findGame(socket, user);
    });
};
