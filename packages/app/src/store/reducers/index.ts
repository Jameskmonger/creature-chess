import { boardReducer } from "@creature-chess/shared/board";
import { benchReducer } from "@creature-chess/shared/player/bench";
import { cardsReducer } from "@creature-chess/shared/player/cardShop";
import { gameInfoReducer } from "@creature-chess/shared/player/gameInfo";
import { playerList } from "../../features/playerList/playerListReducer";
import { game } from "./gameReducer";
import { localPlayer } from "./localPlayerReducer";
import { lobby } from "./lobbyReducer";
import { authReducer } from "../../auth";
import { ui } from "./uiReducer";
import { levelReducer } from "@creature-chess/shared/player/level";

export const reducers = {
    board: boardReducer,
    bench: benchReducer,
    playerList,
    cards: cardsReducer,
    gameInfo: gameInfoReducer,
    level: levelReducer,
    game,
    localPlayer,
    lobby,
    auth: authReducer,
    ui
};
