import { Gamemode, playerEntity } from "@creature-chess/gamemode";
import { PlayerProfile } from "@creature-chess/models/player";
import { GamemodeSettings } from "@creature-chess/models/settings";

import { logger } from "../log";
import { Board } from "@creature-chess/board";

export const createPlayerEntity = (
	gamemode: Gamemode,
	playerId: string,
	name: string,
	profile: PlayerProfile,
	settings: GamemodeSettings
) => {
	const boardSlices = {
		boardSlice: new Board(settings.boardWidth, settings.boardHalfHeight),
		benchSlice: new Board(settings.benchSize, 1),
	};

	return playerEntity(
		playerId,
		{ logger, gamemode, boardSlices, settings },
		{ match: null, name, profile, finishPosition: -1, finishRound: -1 }
	);
};
