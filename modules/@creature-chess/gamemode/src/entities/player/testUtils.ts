import { Logger } from "winston";

import { Board } from "@creature-chess/board";
import { GamemodeSettings, GamemodeSettingsPresets } from "@creature-chess/models";

import { Gamemode } from "../../game";
import { Player, createPlayer } from "./player";

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
	const gamemode =
		overrides?.gamemode ?? new Gamemode(`game-${id}`, logger, settings);

	return createPlayer(
		id,
		{
			logger,
			boards: {
				board: new Board(settings.boardWidth, settings.boardHalfHeight),
				bench: new Board(settings.benchSize, 1),
			},
			gamemode,
			settings,
		},
		{
			name: id,
			profile: { title: null, picture: null },
			finishPosition: -1,
			finishRound: -1,
			match: null,
		}
	);
};
