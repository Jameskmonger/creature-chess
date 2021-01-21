import { Client, TextChannel } from "discord.js";
import { LOBBY_WAIT_TIME as LOBBY_WAIT_TIME_SECONDS } from "@creature-chess/models";
import { logger } from "./log";

export type DiscordApi = {
    startLobby: (playerName: string) => void;
}

const awaitClientReady = (client: Client) => {
    return new Promise<void>(resolve => {
        client.on("ready", () => {
            resolve();
        });
    });
}

const LOBBY_NOTIFICATIONS_CHANNEL_ID = "794003654545375232";
const LOBBY_NOTIFICATIONS_ROLE_ID = "793944131369304104";

const roleMention = (roleId: string) => `<@&${roleId}>`;

const noopApi: DiscordApi = { startLobby: () => {} };

export const createDiscordApi = async (token: string): Promise<DiscordApi> => {
    if (!token) {
        logger.error("No Discord bot token provided");
        return noopApi;
    }

    const client = new Client();

    try {
        await client.login(token);
        await awaitClientReady(client);
    } catch (e) {
        logger.error("Error occured while creating discord token");
        return noopApi;
    }

    const channel: TextChannel = client.channels.cache.get(LOBBY_NOTIFICATIONS_CHANNEL_ID) as TextChannel;

    if (!channel) {
        logger.warn("Lobby notification channel not found");
        return noopApi;
    }

    if (!channel.isText()) {
        logger.warn("Lobby notification channel was not a text channel");
        return noopApi;
    }

    return {
        startLobby: (playerName) => {
            channel.send(`:bell: ${roleMention(LOBBY_NOTIFICATIONS_ROLE_ID)} :bell: - '**${playerName}**' has started a lobby - it will close in ${LOBBY_WAIT_TIME_SECONDS} seconds. https://creaturechess.jamesmonger.com/`);
        }
    };
};
