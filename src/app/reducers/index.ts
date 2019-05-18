import { boardReducer as board, benchReducer as bench } from "@common/board";
import { playerList } from "./playerListReducer";
import { cards } from "./cardsReducer";
import { game } from "./gameReducer";
import { localPlayer } from "./localPlayerReducer";
import { feedMessages } from "./feedMessagesReducer";

export const reducers = {
    board,
    bench,
    playerList,
    cards,
    game,
    localPlayer,
    feedMessages
};
