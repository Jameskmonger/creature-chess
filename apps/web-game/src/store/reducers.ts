import { ReducersMapObject } from "redux";
import { BoardSlice } from "@shoki/board";
import { PieceModel } from "@creature-chess/models";
import { lobbyReducer } from "../lobby";
import { AppState } from "./state";
import { createGameReducer } from "../game";

export const createReducers = (slices: { boardSlice: BoardSlice<PieceModel>; benchSlice: BoardSlice<PieceModel> }): ReducersMapObject<AppState> => ({
	lobby: lobbyReducer,
	game: createGameReducer(slices),
});
