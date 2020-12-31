import { ManagementClient } from "auth0";
import { log } from "@creature-chess/shared";
import { SocketAuthenticator } from "./socket/socketAuthenticator";
import { createDatabaseConnection } from "@creature-chess/data";
import { openServer } from "./socket/openServer";
import { Matchmaking } from "./matchmaking/matchmaking";
import { UserAppMetadata } from "@creature-chess/auth-server";
import { createDiscordApi } from "./discord";

process.on("unhandledRejection", (error) => {
    log("unhandled rejection:");
    log(error as any);
});

const AUTH0_CONFIG = {
    domain: "creaturechess.eu.auth0.com",
    clientId: "gWNTtsTNepgyyqE7QAEC4e7nt5A3ZZ4k",
    clientSecret: process.env.AUTH0_MANAGEMENT_CLIENT_SECRET
};

export const startServer = async (port: number) => {
    const socketServer = openServer(port);
    const client = new ManagementClient<UserAppMetadata>({
        domain: AUTH0_CONFIG.domain,
        clientId: AUTH0_CONFIG.clientId,
        clientSecret: AUTH0_CONFIG.clientSecret
    });

    const database = createDatabaseConnection(process.env.CREATURE_CHESS_FAUNA_KEY);
    const discordApi = await createDiscordApi(process.env.DISCORD_BOT_TOKEN);
    const matchmaking = new Matchmaking(database, discordApi);

    // networking
    const socketAuthenticator = new SocketAuthenticator(client, database, socketServer);
    socketAuthenticator.onSocketAuthenticated((socket, user) => {
        matchmaking.findGame(socket, user);
    });
};
