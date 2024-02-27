import { createWriteStream } from "fs";
import { put } from "redux-saga/effects";
import { v4 as uuid } from "uuid";

import { createBoardSlice } from "@shoki/board";

import {
	Gamemode,
	PlayerCommands,
	playerEntity,
} from "@creature-chess/gamemode";
import { PieceModel } from "@creature-chess/models";
import { PlayerProfile } from "@creature-chess/models/player";
import {
	GamemodeSettings,
	GamemodeSettingsPresets,
} from "@creature-chess/models/settings";

import { botLogicSaga } from "@cc-server/bot";
import { BotPersonality, BotPersonalityValue } from "@cc-server/data";

import { logger } from "./log";

function makeBotPersonality(): BotPersonality {
	return {
		ambition: Math.round(Math.random() * 200) as BotPersonalityValue,
		composure: Math.round(Math.random() * 200) as BotPersonalityValue,
		vision: Math.round(Math.random() * 200) as BotPersonalityValue,
	};
}

const createPlayerEntity = (
	gamemode: Gamemode,
	playerId: string,
	name: string,
	profile: PlayerProfile,
	settings: GamemodeSettings
) => {
	const boardSlices = {
		boardSlice: createBoardSlice<PieceModel>(`player-${playerId}-board`, {
			width: settings.boardWidth,
			height: settings.boardHalfHeight,
		}),
		benchSlice: createBoardSlice<PieceModel>(`player-${playerId}-bench`, {
			width: settings.benchSize,
			height: 1,
		}),
	};

	return playerEntity(
		playerId,
		{ logger, gamemode, boardSlices, settings },
		{ match: null, name, profile, finishPosition: -1, finishRound: -1 }
	);
};

function makeBotEntity(
	gamemode: Gamemode,
	settings: GamemodeSettings,
	bot: BotUnderAnalysis
) {
	const entity = createPlayerEntity(
		gamemode,
		bot.id,
		bot.id.substring(0, 8),
		{
			picture: 1,
			title: null,
		},
		settings
	);

	entity.runSaga(function* () {
		yield put(
			PlayerCommands.playerInfoCommands.updateMoneyCommand(
				settings.startingMoney
			)
		);
		yield put(
			PlayerCommands.playerInfoCommands.updateLevelCommand({
				level: settings.startingLevel,
				xp: 0,
			})
		);
	});

	entity.runSaga(botLogicSaga, bot.personality);

	return entity;
}

type BotUnderAnalysis = {
	id: string;
	personality: BotPersonality;
};

async function runBotAnalysis(
	gameId: string,
	settings: GamemodeSettings,
	iterations: number,
	chunkSize: number = 10
) {
	const bots: BotUnderAnalysis[] = [];

	for (let i = 0; i < 8; i++) {
		bots.push({
			id: uuid(),
			personality: makeBotPersonality(),
		});
	}

	let currentIteration = 0;

	const results: string[] = [];

	while (currentIteration < iterations) {
		const chunk = Math.min(chunkSize, iterations - currentIteration);
		console.log(
			`- Running ${chunk} games (${currentIteration} to ${
				currentIteration + chunk
			})`
		);

		let gamesInProgress = 0;

		for (let i = 0; i < chunk; i++) {
			const game = new Gamemode(gameId, logger, settings);

			game.onFinish(({ players }) => {
				players.forEach((player) => {
					const bot = bots.find((b) => b.id === player.id);

					if (bot) {
						results.push(
							// eslint-disable-next-line max-len
							`${bot.id},${bot.personality.ambition},${bot.personality.composure},${bot.personality.vision},${player.position},${player.finishRound}\n`
						);
					}
				});

				gamesInProgress--;
			});

			game.start(bots.map((bot) => makeBotEntity(game, settings, bot)));
			gamesInProgress++;
		}

		// await until onFinish is called for all
		while (gamesInProgress > 0) {
			await new Promise((resolve) => setTimeout(resolve, 1000));
		}

		currentIteration += chunk;
	}

	return results;
}

export async function runAnalysis(
	fileName: string,
	iterationCount: number,
	iterationGameCount: number,
	settings: Partial<GamemodeSettings> = {}
) {
	const file = createWriteStream(fileName, {
		flags: "a",
	});
	file.write("id,ambition,composure,vision,finishPosition,finishRound\n");
	file.end();

	const CHUNK_SIZE = 5;

	let currentIteration = 0;

	while (currentIteration < iterationCount) {
		const chunk = Math.min(CHUNK_SIZE, iterationCount - currentIteration);

		const promises: Promise<string[]>[] = [];

		for (let i = 0; i < chunk; i++) {
			promises.push(
				runBotAnalysis(
					`bot-analysis-${currentIteration}-${i}`,
					{
						...GamemodeSettingsPresets["default"],
						battleTurnDuration: 1,
						...settings,
					},
					iterationGameCount
				)
			);
		}

		currentIteration += chunk;

		const results = await Promise.all(promises);

		const resultStream = createWriteStream(fileName, { flags: "a" });
		results.forEach((result) =>
			result.forEach((line) => resultStream.write(line))
		);

		await new Promise((resolve) => resultStream.end(resolve));
	}
}

export async function runAnalysisOngoing(
	fileName: string,
	iterationGameCount: number
) {
	while (true) {
		await runAnalysis(fileName, 1, iterationGameCount);
	}
}
