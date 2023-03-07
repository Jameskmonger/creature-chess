import { BotPersonality, DatabaseConnection } from "@creature-chess/data";
import { LobbyPlayer } from "@creature-chess/models";

export const getBots = async (database: DatabaseConnection, count: number) => {
	const output: { player: LobbyPlayer; personality: BotPersonality }[] = [];

	const bots = await database.bot.getLeastPlayedBots(count);
	for (const { id, nickname, ambition, composure, vision } of bots!) {
		// get a random picture from one to 20 - temporary
		const picture = Math.floor(Math.random() * 20) + 1;

		const player = {
			id: (id + 1) * -1,
			name: `[BOT] ${nickname}`,
			profile: {
				title: null,
				picture,
			},
		};

		await database.bot.addGamePlayed(id);

		output.push({
			player,
			personality: { ambition, composure, vision } as any,
		});
	}

	return output;
};
