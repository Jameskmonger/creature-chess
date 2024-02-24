import { getContext } from "typed-redux-saga";
import { Logger } from "winston";

import { BoardSlice } from "@shoki/board";

import { PieceModel } from "@creature-chess/models";
import { GamemodeSettings } from "@creature-chess/models/settings";

import { Gamemode } from "../../game";

type PlayerBoardSlices = {
	boardSlice: BoardSlice<PieceModel>;
	benchSlice: BoardSlice<PieceModel>;
};

export type PlayerEntityDependencies = {
	logger: Logger;
	boardSlices: PlayerBoardSlices;
	gamemode: Gamemode;
	settings: GamemodeSettings;
};

export const getPlayerEntityDependencies = () =>
	getContext<PlayerEntityDependencies>("dependencies");
