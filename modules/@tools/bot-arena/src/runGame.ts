import { v4 as uuid } from "uuid";

import { SubscribableBoard } from "@creature-chess/board";
import { Gamemode } from "@creature-chess/gamemode";
import {
	GamemodeSettings,
	GamemodeSettingsPresets,
} from "@creature-chess/models";

import { BotImplementation, setupBotLogic } from "@cc-server/bot";
import { Personality } from "@cc-bot/utility";

import { logger } from "./log";

export type BotUnderTest = {
	id: string;
	name: string;
	personality: Personality;
	implementation: BotImplementation;
};

export type BotResult = {
	id: string;
	personality: Personality;
	finishPosition: number;
	finishRound: number;
};

export type GameResult = {
	gameId: string;
	bots: BotResult[];
};

// `BOT_SELECTION_TEMPERATURE` env var lets harness sweeps override the
// Boltzmann temperature without editing code. Falls back to the preset
// default (0.025) when unset. `0` explicitly means "deterministic top-1"
// and is valid — it gives the pre-Stage-6 regression baseline.
const parseTemperatureOverride = (): number | undefined => {
	const raw = process.env.BOT_SELECTION_TEMPERATURE;
	if (raw === undefined || raw === "") {
		return undefined;
	}
	const parsed = Number(raw);
	if (!Number.isFinite(parsed) || parsed < 0) {
		throw new Error(
			`BOT_SELECTION_TEMPERATURE must be a non-negative finite number, got "${raw}"`
		);
	}
	return parsed;
};

const temperatureOverride = parseTemperatureOverride();

// All delay-related settings collapsed to zero so games run as fast as the
// event loop can spin. battleTurnDuration: 0 matches the battleRunner.test
// preset and is the dominant speed-up.
const HARNESS_SETTINGS: GamemodeSettings = {
	...GamemodeSettingsPresets.default,
	battleTurnDuration: 0,
	preparingPhaseLengthMs: 0,
	readyPhaseSettleMs: 0,
	readyPhaseLengthMs: 0,
	playingPhaseMaxLengthMs: 0,
	playingPhaseEndDelayMs: 0,
	botInitialDelayMs: 0,
	botActionDelayMs: 0,
	...(temperatureOverride !== undefined
		? { botSelectionTemperature: temperatureOverride }
		: {}),
};

export const runGame = (
	gameId: string,
	bots: BotUnderTest[]
): Promise<GameResult> =>
	new Promise<GameResult>((resolve) => {
		const gamemode = new Gamemode(gameId, logger, HARNESS_SETTINGS);

		gamemode.onFinish(({ players }) => {
			resolve({
				gameId,
				bots: bots.map((bot) => {
					const final = players.find((p) => p.id === bot.id);

					return {
						id: bot.id,
						personality: bot.personality,
						finishPosition: final?.position ?? -1,
						finishRound: final?.finishRound ?? -1,
					};
				}),
			});
		});

		const entities = bots.map((bot) => {
			const entity = gamemode.createPlayer(bot.id, {
				boards: {
					board: new SubscribableBoard(
						HARNESS_SETTINGS.boardWidth,
						HARNESS_SETTINGS.boardHalfHeight
					),
					bench: new SubscribableBoard(HARNESS_SETTINGS.benchSize, 1),
				},
				match: null,
				name: bot.name,
				profile: { picture: 1, title: null },
				finishPosition: -1,
				finishRound: -1,
			});

			entity.setMoney(HARNESS_SETTINGS.startingMoney);
			entity.setLevel({ level: HARNESS_SETTINGS.startingLevel, xp: 0 });

			setupBotLogic(entity, bot.implementation);

			return entity;
		});

		gamemode.start(entities);
	});

// Re-export for the harness so callers don't need a second import
export const newBotId = () => uuid();
