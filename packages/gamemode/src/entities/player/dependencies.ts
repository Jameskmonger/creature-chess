import { Logger } from "winston";
import { getContext } from "typed-redux-saga";
import { BoardSlice } from "@creature-chess/board";
import { PieceModel } from "@creature-chess/models";

import { Game } from "../../game";

type PlayerBoardSlices = {
	boardSlice: BoardSlice<PieceModel>;
	benchSlice: BoardSlice<PieceModel>;
};

export type PlayerEntityDependencies = {
	logger: Logger;
	boardSlices: PlayerBoardSlices;
	game: Game;
};

export const getPlayerEntityDependencies = () => getContext<PlayerEntityDependencies>("dependencies");
