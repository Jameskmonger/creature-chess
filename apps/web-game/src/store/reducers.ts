import { ReducersMapObject } from "@reduxjs/toolkit";

import { BoardSlice } from "@shoki/board";

import { PieceModel } from "@creature-chess/models";

import { createGameReducer } from "./game/state";
import { lobbyReducer } from "./lobby/state";
import { menuReducer } from "./menu/state";
import { AppState } from "./state";

export const createReducers = (slices: {
	boardSlice: BoardSlice<PieceModel>;
	benchSlice: BoardSlice<PieceModel>;
}): ReducersMapObject<AppState> => ({
	lobby: lobbyReducer,
	game: createGameReducer(slices),
	menu: menuReducer,
});
