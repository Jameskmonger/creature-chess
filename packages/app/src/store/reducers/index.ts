import { boardReducer } from "@creature-chess/shared/board";
import { benchReducer } from "@creature-chess/shared/player/bench";
import { cardsReducer } from "@creature-chess/shared/player/cardShop";
import { gameInfoReducer } from "@creature-chess/shared/player/gameInfo";
import { playerList } from "../../game/features/playerList/playerListReducer";
import { game } from "./gameReducer";
import { localPlayer } from "./localPlayerReducer";
import { authReducer } from "../../auth";
import { ui } from "./uiReducer";
import { levelReducer } from "@creature-chess/shared/player/level";
import { lobbyReducer } from "../../lobby";

export const reducers = {
    board: boardReducer,
    bench: benchReducer,
    lobby: lobbyReducer,
    playerList,
    cards: cardsReducer,
    gameInfo: gameInfoReducer,
    level: levelReducer,
    game,
    localPlayer,
    auth: authReducer,
    ui
};
