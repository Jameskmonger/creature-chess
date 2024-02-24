import { LobbyPlayer } from "@creature-chess/models/lobby";

import {
	BotPersonality,
	BotPersonalityValue,
	DatabaseConnection,
} from "@cc-server/data";

export const getBots = async (database: DatabaseConnection, count: number) => {
	const output: { player: LobbyPlayer; personality: BotPersonality }[] = [];

	const bots = await database.prisma.bots.findMany({
		take: count,
		orderBy: {
			games_played: "asc",
		},
	});

	for (const { id, nickname, ambition, composure, vision } of bots) {
		// get a random picture from one to 20 - temporary
		const picture = Math.floor(Math.random() * 20) + 1;

		const player = {
			id: "bot-" + id,
			name: `[BOT] ${nickname}`,
			profile: {
				title: null,
				picture,
			},
			type: "bot" as const,
		};

		await database.bot.addGamePlayed(id);

		output.push({
			player,
			personality: {
				ambition: ambition as BotPersonalityValue,
				composure: composure as BotPersonalityValue,
				vision: vision as BotPersonalityValue,
			},
		});
	}

	return output;
};
