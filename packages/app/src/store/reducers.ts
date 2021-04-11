import { ReducersMapObject } from "redux";
import { BoardSlice } from "@creature-chess/board";
import { lobbyReducer } from "../lobby";
import { uiReducer } from "../ui";
import { userReducer } from "../menu/auth/store/reducer";
import { AppState } from "./state";
import { PieceModel } from "@creature-chess/models";
import { createGameReducer } from "../game";

export const createReducers = (slices: { boardSlice: BoardSlice<PieceModel>, benchSlice: BoardSlice<PieceModel> }): ReducersMapObject<AppState> => ({
    lobby: lobbyReducer,
    game: createGameReducer(slices),
    ui: uiReducer,
    user: userReducer
});
