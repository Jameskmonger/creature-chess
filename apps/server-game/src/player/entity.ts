import { createBoardSlice } from "@shoki/board";

import { Gamemode, playerEntity } from "@creature-chess/gamemode";
import { PieceModel } from "@creature-chess/models";
import { DEFAULT_GAME_OPTIONS } from "@creature-chess/models/config";
import { PlayerProfile } from "@creature-chess/models/player";
import { GamemodeSettings } from "@creature-chess/models/settings";

import { logger } from "../log";

export const createPlayerEntity = (
	gamemode: Gamemode,
	playerId: string,
	name: string,
	profile: PlayerProfile,
	settings: GamemodeSettings
) => {
	const boardSlices = {
		boardSlice: createBoardSlice<PieceModel>(`player-${playerId}-board`, {
			width: DEFAULT_GAME_OPTIONS.boardSize.width,
			height: DEFAULT_GAME_OPTIONS.boardSize.height / 2,
		}),
		benchSlice: createBoardSlice<PieceModel>(`player-${playerId}-bench`, {
			width: DEFAULT_GAME_OPTIONS.benchSize,
			height: 1,
		}),
	};

	return playerEntity(
		playerId,
		{ logger, gamemode, boardSlices, settings },
		{ match: null, name, profile }
	);
};
