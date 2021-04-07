import { ReducersMapObject } from "redux";
import { boardReducer, benchReducer, playerInfoReducer, gameReducer, PlayerReducers } from "@creature-chess/shared";
import { playerList } from "../game/features/playerList/playerListReducer";
import { lobbyReducer } from "../lobby";
import { uiReducer } from "../ui";
import { userReducer } from "../menu/auth/store/reducer";
import { AppState } from "./state";

export const reducers: ReducersMapObject<AppState> = {
    board: boardReducer,
    bench: benchReducer,
    lobby: lobbyReducer,
    playerList,
    playerInfo: playerInfoReducer,
    cardShop: PlayerReducers.cardShopReducer,
    game: gameReducer,
    ui: uiReducer,
    user: userReducer
};
