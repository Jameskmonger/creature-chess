import { LobbyPlayer } from "@creature-chess/models";

import {
	BotImplementation,
	createBotEngineRegistry,
} from "@cc-server/bot";
import { DatabaseConnection } from "@cc-server/data";

import { utilityBotEngine } from "@cc-bot/utility";

const botEngines = createBotEngineRegistry();
botEngines.register(utilityBotEngine);

const randomPicture = () => Math.floor(Math.random() * 20) + 1;

export type BotParticipant = {
	player: LobbyPlayer;
	implementation: BotImplementation;
};

export const getBots = async (database: DatabaseConnection, count: number) => {
	const dbRows = await database.prisma.bots.findMany({
		take: count,
		orderBy: {
			games_played: "asc",
		},
	});

	const dbBots: BotParticipant[] = dbRows.map(
		({ id, nickname, engine, meta }) => ({
			player: {
				id: "bot-" + id,
				name: `[BOT] ${nickname}`,
				profile: {
					title: null,
					picture: randomPicture(),
				},
				type: "bot" as const,
			},
			implementation: botEngines.build(engine, meta),
		})
	);

	await Promise.all(dbRows.map(({ id }) => database.bot.addGamePlayed(id)));

	return dbBots;
};
