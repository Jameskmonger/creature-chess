import { boardReducer, benchReducer, playerInfoReducer, gameReducer } from "@creature-chess/shared";
import { playerList } from "../game/features/playerList/playerListReducer";
import { authReducer } from "../auth";
import { lobbyReducer } from "../lobby";
import { uiReducer } from "../ui";

export const reducers = {
    board: boardReducer,
    bench: benchReducer,
    lobby: lobbyReducer,
    playerList,
    playerInfo: playerInfoReducer,
    game: gameReducer,
    auth: authReducer,
    ui: uiReducer
};
