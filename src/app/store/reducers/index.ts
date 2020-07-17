import { boardReducer as board } from "@common/board";
import { playerList } from "../../features/playerList/playerListReducer";
import { cards } from "../../features/cardShop/cardsReducer";
import { game } from "./gameReducer";
import { localPlayer } from "./localPlayerReducer";
import { feedMessages } from "../../features/feed/feedMessagesReducer";
import { lobby } from "./lobbyReducer";
import { benchReducer } from "@common/player/bench";
import { auth } from "./authReducer";
import { ui } from "./uiReducer";

export const reducers = {
    board,
    bench: benchReducer,
    playerList,
    cards,
    game,
    localPlayer,
    feedMessages,
    lobby,
    auth,
    ui
};
