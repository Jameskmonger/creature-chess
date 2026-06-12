import { PluginLoader } from "@cc-engine/kernel/loader";
import {
	GamemodeContext,
	createDefaultGamemodeContext,
	createGamemode,
	resolveSettings,
} from "@creature-chess/gamemode";
import { v4 as uuid } from "uuid";

import { SubscribableBoard } from "@creature-chess/board";
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
// Boltzmann temperature without editing code. `0` is valid (deterministic
// top-1) and gives the pre-Stage-6 regression baseline.
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
// event loop can spin.
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

// Process-wide context: seed once and share across every harness game.
let sharedContext: GamemodeContext | null = null;

const seedCreaturesVanilla = async (
	context: GamemodeContext
): Promise<void> => {
	const loader = new PluginLoader({ logger });
	await loader.load(["@cc-plugins/creatures-vanilla"], { logger, ...context });
};

const getContext = async (): Promise<GamemodeContext> => {
	if (!sharedContext) {
		sharedContext = createDefaultGamemodeContext();
		await seedCreaturesVanilla(sharedContext);
	}
	return sharedContext;
};

export const runGame = async (
	gameId: string,
	bots: BotUnderTest[]
): Promise<GameResult> => {
	const context = await getContext();
	const resolvedSettings = resolveSettings(HARNESS_SETTINGS, context.defines);

	return new Promise<GameResult>((resolve) => {
		const gamemode = createGamemode({
			id: gameId,
			logger,
			settings: resolvedSettings,
			context,
		});

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
						resolvedSettings.boardWidth,
						resolvedSettings.boardHalfHeight
					),
					bench: new SubscribableBoard(resolvedSettings.benchSize, 1),
				},
				match: null,
				name: bot.name,
				profile: { picture: 1, title: null },
				finishPosition: -1,
				finishRound: -1,
			});

			entity.setMoney(resolvedSettings.startingMoney);
			entity.setLevel({ level: resolvedSettings.startingLevel, xp: 0 });

			setupBotLogic(entity, bot.implementation);

			return entity;
		});

		gamemode.start(entities);
	});
};

export const newBotId = () => uuid();
