import { Logger } from "winston";
import { BoardSlice } from "@creature-chess/board";
import { PieceModel } from "@creature-chess/models";
import { getContext } from "typed-redux-saga";
import { PlayerVariablesStoreContext } from "./variablesStore";
import { PlayerVariables } from "./variables";

export type PlayerBoardSlices = {
	boardSlice: BoardSlice<PieceModel>,
	benchSlice: BoardSlice<PieceModel>
};
export type PlayerSagaDependencies = {
	logger: Logger;
};

export type PlayerSagaContext = {
	playerId: string;
	playerName: string;
	boardSlices: PlayerBoardSlices;
	dependencies: PlayerSagaDependencies;
} & PlayerVariablesStoreContext<PlayerVariables>;

export const getPlayerSagaDependencies = () => getContext<PlayerSagaDependencies>("dependencies");
