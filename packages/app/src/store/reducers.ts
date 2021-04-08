import { ReducersMapObject } from "redux";
import { playerInfoReducer, gameReducer, PlayerReducers } from "@creature-chess/shared";
import { BoardSlice } from "@creature-chess/board";
import { playerList } from "../game/features/playerList/playerListReducer";
import { lobbyReducer } from "../lobby";
import { uiReducer } from "../ui";
import { userReducer } from "../menu/auth/store/reducer";
import { AppState } from "./state";
import { PieceModel } from "@creature-chess/models";

export const createReducers = ({ boardSlice, benchSlice }: { boardSlice: BoardSlice<PieceModel>, benchSlice: BoardSlice<PieceModel> }): ReducersMapObject<AppState> => ({
    board: boardSlice.boardReducer,
    bench: benchSlice.boardReducer,
    lobby: lobbyReducer,
    playerList,
    playerInfo: playerInfoReducer,
    cardShop: PlayerReducers.cardShopReducer,
    game: gameReducer,
    ui: uiReducer,
    user: userReducer
});
