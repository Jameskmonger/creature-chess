import { ReducersMapObject } from "redux";
import { BoardSlice } from "@creature-chess/board";
import { PieceModel } from "@creature-chess/models";
import { lobbyReducer } from "../lobby";
import { userReducer } from "../auth";
import { menuReducer } from "../menu";
import { AppState } from "./state";
import { createGameReducer } from "../game";

export const createReducers = (slices: { boardSlice: BoardSlice<PieceModel>, benchSlice: BoardSlice<PieceModel> }): ReducersMapObject<AppState> => ({
    lobby: lobbyReducer,
    game: createGameReducer(slices),
    menu: menuReducer,
    user: userReducer
});
