import { Board } from "@creature-chess/board";
import {
	Gamemode,
	createPlayer as createPlayerBase,
} from "@creature-chess/gamemode";
import { PlayerProfile } from "@creature-chess/models";
import { GamemodeSettings } from "@creature-chess/models";

import { logger } from "../log";

export const createPlayer = (
	gamemode: Gamemode,
	playerId: string,
	name: string,
	profile: PlayerProfile,
	settings: GamemodeSettings
) => {
	const boards = {
		board: new Board(settings.boardWidth, settings.boardHalfHeight),
		bench: new Board(settings.benchSize, 1),
	};

	return createPlayerBase(
		playerId,
		{ logger, gamemode, boards, settings },
		{ match: null, name, profile, finishPosition: -1, finishRound: -1 }
	);
};
