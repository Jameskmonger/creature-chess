import { createBoardSlice } from "@shoki/board";

import { Gamemode, playerEntity } from "@creature-chess/gamemode";
import { PlayerProfile, PieceModel } from "@creature-chess/models";

import { logger } from "../log";

export const createPlayerEntity = (
	gamemode: Gamemode,
	playerId: string,
	name: string,
	profile: PlayerProfile
) => {
	const boardSlices = {
		boardSlice: createBoardSlice<PieceModel>(`player-${playerId}-board`, {
			width: 7,
			height: 3,
		}),
		benchSlice: createBoardSlice<PieceModel>(`player-${playerId}-bench`, {
			width: 7,
			height: 1,
		}),
	};

	return playerEntity(
		playerId,
		{ logger, gamemode, boardSlices },
		{ match: null, name, profile }
	);
};
