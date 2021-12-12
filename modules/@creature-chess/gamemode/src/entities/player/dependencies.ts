import { Logger } from "winston";
import { getContext } from "typed-redux-saga";
import { BoardSlice } from "@shoki/board";
import { PieceModel } from "@creature-chess/models";

import { Gamemode } from "../../game";

type PlayerBoardSlices = {
	boardSlice: BoardSlice<PieceModel>;
	benchSlice: BoardSlice<PieceModel>;
};

export type PlayerEntityDependencies = {
	logger: Logger;
	boardSlices: PlayerBoardSlices;
	gamemode: Gamemode;
};

export const getPlayerEntityDependencies = () => getContext<PlayerEntityDependencies>("dependencies");
