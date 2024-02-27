import { ReducersMapObject } from "@reduxjs/toolkit";

import { BoardSlice } from "@shoki/board";

import { PieceModel } from "@creature-chess/models";

import { lobbyReducer } from "../../lobby";
import { createGameReducer } from "../game";
import { AppState } from "./state";

export const createReducers = (slices: {
	boardSlice: BoardSlice<PieceModel>;
	benchSlice: BoardSlice<PieceModel>;
}): ReducersMapObject<AppState> => ({
	lobby: lobbyReducer,
	game: createGameReducer(slices),
});
