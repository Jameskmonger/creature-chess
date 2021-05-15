import { Logger } from "winston";
import { BoardSlice } from "@creature-chess/board";
import { PieceModel } from "@creature-chess/models";
import { getContext } from "typed-redux-saga";
import { Game } from "../game";

export type PlayerBoardSlices = {
	boardSlice: BoardSlice<PieceModel>,
	benchSlice: BoardSlice<PieceModel>
};
export type PlayerSagaDependencies = {
	logger: Logger;
	boardSlices: PlayerBoardSlices;
	game: Game;
};

export type PlayerSagaContext = {
	playerId: string;
	playerName: string;
	dependencies: PlayerSagaDependencies;
};

export const getPlayerSagaDependencies = () => getContext<PlayerSagaDependencies>("dependencies");
