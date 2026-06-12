import { Logger } from "@cc-engine/kernel";

import { SubscribableBoard } from "@creature-chess/board";
import {
	CreatureDefinition,
	CreatureRegistry,
	GamemodeSettings,
	GamemodeSettingsPresets,
} from "@creature-chess/models";

import { createDefaultGamemodeContext } from "../../coreBootstrap";
import { Gamemode } from "../../game";
import { Player } from "./player";

const stubStages = (count: number) =>
	Array.from({ length: count }, () => ({
		hp: 100,
		attack: 10,
		defense: 10,
		speed: 10,
	}));

// Three stages so `pieceCanEvolve` lets stage 0 + 1 promote.
const seedTestCreatures = (creatures: CreatureRegistry): void => {
	const scoped = creatures.scopedTo({ plugin: "@test/stub-creatures" });
	for (let id = 1; id <= 50; id += 1) {
		const def: CreatureDefinition = {
			id,
			name: `Stub${id}`,
			cost: 1,
			traits: [],
			attackRange: 1,
			stages: stubStages(3),
		};
		scoped.set(id, def);
	}
};

export const createMockLogger = (): Logger =>
	({
		info: () => undefined,
		warn: () => undefined,
		error: () => undefined,
		debug: () => undefined,
	}) as unknown as Logger;

/**
 * Build a Player wired to a fresh single-player Gamemode, suitable for testing.
 */
export const createTestPlayer = (
	id = "test-player",
	overrides?: { settings?: GamemodeSettings; gamemode?: Gamemode }
): Player => {
	const settings = overrides?.settings ?? GamemodeSettingsPresets.default;
	const logger = createMockLogger();
	const context = createDefaultGamemodeContext();
	seedTestCreatures(context.creatures);
	const gamemode =
		overrides?.gamemode ??
		new Gamemode({
			id: `game-${id}`,
			logger,
			settings,
			context,
		});

	return gamemode.createPlayer(id, {
		boards: {
			board: new SubscribableBoard(
				settings.boardWidth,
				settings.boardHalfHeight
			),
			bench: new SubscribableBoard(settings.benchSize, 1),
		},
		name: id,
		profile: { title: null, picture: null },
		finishPosition: -1,
		finishRound: -1,
		match: null,
	});
};
