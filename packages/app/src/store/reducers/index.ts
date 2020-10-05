import { boardReducer } from "@creature-chess/shared/board";
import { benchReducer } from "@creature-chess/shared/player/bench";
import { cardsReducer } from "@creature-chess/shared/player/cardShop";
import { gameInfoReducer } from "@creature-chess/shared/player/gameInfo";
import { playerList } from "../../game/features/playerList/playerListReducer";
import { levelReducer } from "@creature-chess/shared/player/level";
import { gameReducer } from "@creature-chess/shared/game";
import { authReducer } from "../../auth";
import { lobbyReducer } from "../../lobby";
import { uiReducer } from "../../ui";

export const reducers = {
    board: boardReducer,
    bench: benchReducer,
    lobby: lobbyReducer,
    playerList,
    cards: cardsReducer,
    gameInfo: gameInfoReducer,
    level: levelReducer,
    game: gameReducer,
    auth: authReducer,
    ui: uiReducer
};
