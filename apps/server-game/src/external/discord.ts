import { Client, TextChannel } from "discord.js";

import { APP_BASE_URL, LOBBY_WAIT_TIME as LOBBY_WAIT_TIME_SECONDS } from "@creature-chess/models";

import { logger } from "../log";

export type DiscordApi = {
	startLobby: () => void;
};

const awaitClientReady = (client: Client) =>
	new Promise<void>((resolve) => {
		client.on("ready", () => {
			resolve();
		});
	});

const LOBBY_NOTIFICATIONS_CHANNEL_ID = "794003654545375232";
const LOBBY_NOTIFICATIONS_ROLE_ID = "793944131369304104";

const roleMention = (roleId: string) => `<@&${roleId}>`;

const noopApi: DiscordApi = {
	startLobby: () => {
		/* empty */
	},
};

export const createDiscordApi = async (): Promise<DiscordApi> => {
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

	const channel: TextChannel = client.channels.cache.get(
		LOBBY_NOTIFICATIONS_CHANNEL_ID
	) as TextChannel;

	if (!channel) {
		logger.warn("Lobby notification channel not found");
		return noopApi;
	}

	if (!channel.isText()) {
		logger.warn("Lobby notification channel was not a text channel");
		return noopApi;
	}

	return {
		startLobby: () => {
			// can't see an easy way to bring this line down to 160 characters
			// eslint-disable-next-line max-len
			channel.send(
				`:bell: ${roleMention(
					LOBBY_NOTIFICATIONS_ROLE_ID
				)} :bell: - A new lobby has started - it will close in ${LOBBY_WAIT_TIME_SECONDS} seconds. ${APP_BASE_URL}`
			);
		},
	};
};
