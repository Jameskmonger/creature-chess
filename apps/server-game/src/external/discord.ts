import { Logger } from "winston";
import { Client, TextChannel } from "discord.js";
import { LOBBY_WAIT_TIME as LOBBY_WAIT_TIME_SECONDS } from "@creature-chess/models";

export type DiscordApi = {
	startLobby: (playerName: string) => void;
};

const awaitClientReady = (client: Client) => new Promise<void>(resolve => {
	client.on("ready", () => {
		resolve();
	});
});

const LOBBY_NOTIFICATIONS_CHANNEL_ID = "794003654545375232";
const LOBBY_NOTIFICATIONS_ROLE_ID = "793944131369304104";

const roleMention = (roleId: string) => `<@&${roleId}>`;

const noopApi: DiscordApi = { startLobby: () => { /* empty */ } };

export const createDiscordApi = async (logger: Logger): Promise<DiscordApi> => {
	const token = process.env.DISCORD_BOT_TOKEN!;

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
			// can't see an easy way to bring this line down to 160 characters
			// eslint-disable-next-line max-len
			channel.send(`:bell: ${roleMention(LOBBY_NOTIFICATIONS_ROLE_ID)} :bell: - '**${playerName}**' has started a lobby - it will close in ${LOBBY_WAIT_TIME_SECONDS} seconds. https://creaturechess.com/`);
		}
	};
};
