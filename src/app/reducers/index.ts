import { deck } from "./deckReducer";
import { pieces } from "./piecesReducer";
import { benchPieces } from "./benchPiecesReducer";
import { playerList } from "./playerListReducer";
import { cards } from "./cardsReducer";
import { game } from "./gameReducer";
import { localPlayer } from "./localPlayerReducer";

export const reducers = {
    deck,
    pieces,
    benchPieces,
    playerList,
    cards,
    game,
    localPlayer
};
