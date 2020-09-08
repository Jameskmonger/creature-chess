import { boardReducer } from "@common/board";
import { benchReducer } from "@common/player/bench";
import { cardsReducer } from "@common/player/cardShop";
import { gameInfoReducer } from "@common/player/gameInfo";
import { playerList } from "../../features/playerList/playerListReducer";
import { game } from "./gameReducer";
import { localPlayer } from "./localPlayerReducer";
import { lobby } from "./lobbyReducer";
import { auth } from "./authReducer";
import { ui } from "./uiReducer";
import { levelReducer } from "@common/player/level";

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
    auth,
    ui
};
