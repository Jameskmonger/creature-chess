import { Logger } from "winston";
import { BoardSlice } from "@creature-chess/board";
import { PieceModel } from "@creature-chess/models";
import { Match } from "../game/match";
import { getContext } from "typed-redux-saga";

export type PlayerBoardSlices = {
	boardSlice: BoardSlice<PieceModel>,
	benchSlice: BoardSlice<PieceModel>
};
export type PlayerSagaDependencies = {
	logger: Logger;
	getMatch: () => Match | null;
};

export type PlayerSagaContext = {
	playerId: string;
	playerName: string;
	boardSlices: PlayerBoardSlices;
	dependencies: PlayerSagaDependencies;
};

export const getPlayerSagaDependencies = () => getContext<PlayerSagaDependencies>("dependencies");
