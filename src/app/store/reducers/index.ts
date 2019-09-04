import { boardReducer as board, benchReducer as bench } from "@common/board";
import { playerList } from "../../playerList/playerListReducer";
import { cards } from "../../cardShop/cardsReducer";
import { game } from "./gameReducer";
import { localPlayer } from "./localPlayerReducer";
import { feedMessages } from "../../feed/feedMessagesReducer";
import { lobby } from "./lobbyReducer";

export const reducers = {
    board,
    bench,
    playerList,
    cards,
    game,
    localPlayer,
    feedMessages,
    lobby
};
