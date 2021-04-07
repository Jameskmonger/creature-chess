import { ReducersMapObject } from "redux";
import { playerInfoReducer, gameReducer, PlayerReducers, BoardSlice } from "@creature-chess/shared";
import { playerList } from "../game/features/playerList/playerListReducer";
import { lobbyReducer } from "../lobby";
import { uiReducer } from "../ui";
import { userReducer } from "../menu/auth/store/reducer";
import { AppState } from "./state";

export const createReducers = ({ boardSlice, benchSlice }: { boardSlice: BoardSlice, benchSlice: BoardSlice }): ReducersMapObject<AppState> => ({
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
