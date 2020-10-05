import { boardReducer } from "@creature-chess/shared/board";
import { benchReducer } from "@creature-chess/shared/player/bench";
import { playerInfoReducer } from "@creature-chess/shared/player/playerInfo";
import { gameReducer } from "@creature-chess/shared/game";
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
