import { boardReducer } from "@creature-chess/shared/board";
import { benchReducer } from "@creature-chess/shared/player/bench";
import { gameInfoReducer } from "@creature-chess/shared/player/gameInfo";
import { playerList } from "../../game/features/playerList/playerListReducer";
import { gameReducer } from "@creature-chess/shared/game";
import { authReducer } from "../../auth";
import { lobbyReducer } from "../../lobby";
import { uiReducer } from "../../ui";

export const reducers = {
    board: boardReducer,
    bench: benchReducer,
    lobby: lobbyReducer,
    playerList,
    gameInfo: gameInfoReducer,
    game: gameReducer,
    auth: authReducer,
    ui: uiReducer
};
