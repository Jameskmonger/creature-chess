import { Card, PieceModel } from "@creature-chess/models";
import { all, put, select, takeEvery } from "@redux-saga/core/effects";
import { PlayerCommands, PlayerEvents } from "../../player";
import { getPiecesExceptStage, getPiecesForStage } from "../../player/pieceSelectors";
import { isPlayerAlive } from "../../player/playerSelectors";
import { PlayerState } from "../../player/store";
import { CardDeck } from "../cardDeck";

export const playerGameDeckSagaFactory = (deck: CardDeck) => {
    // when a player rerolls, get them some new cards from the deck
    const pullNewCards = (
        oldCards: Card[],
        level: number,
        excludeIds: number[],
        blessCandidateIds: number[]
    ) => deck.reroll(oldCards, 5, level, blessCandidateIds, excludeIds);

    // when a player dies, add their cards and pieces back to the deck
    const addToDeck = (pieces: PieceModel[], cards: Card[]) => {
        for (const piece of pieces) {
            deck.addPiece(piece);
        }
        deck.addCards(cards);
        deck.shuffle();
    };

    return function*() {
        yield all([
            takeEvery<PlayerEvents.PlayerDeathEvent>(
                PlayerEvents.playerDeathEvent.toString(),
                function*({ payload: { pieces, cards } }) {
                    addToDeck(pieces, cards);
                }
            ),
            takeEvery<PlayerEvents.AfterRerollCardsEvent>(
                PlayerEvents.afterRerollCardsEvent.toString(),
                function*() {
                    const state: PlayerState = yield select();

                    if (!isPlayerAlive(state)) {
                        return;
                    }

                    const {
                        cardShop: { cards },
                        playerInfo: { level }
                    } = state;

                    const threeStarBoardPieces = getPiecesForStage(state.board, 2);
                    const threeStarBenchPieces = getPiecesForStage(state.bench, 2);

                    const excludeIds = [...threeStarBoardPieces, ...threeStarBenchPieces].map(p => p.definitionId);
                    const blessCandidateIds = [... new Set(getPiecesExceptStage(state.board, 2).map(p => p.definitionId))];

                    const remainingCards = cards.filter((card): card is Card => card !== null)
                    const newCards = pullNewCards(remainingCards, level, excludeIds, blessCandidateIds);

                    yield put(PlayerCommands.updateCardsCommand(newCards));
                }
            ),
            takeEvery<PlayerEvents.AfterSellPieceEvent>(
                PlayerEvents.afterSellPieceEvent.toString(),
                function*({ payload: { piece } }) {
                    // when a player sells a piece, add it back to the deck
                    deck.addPiece(piece);
                    deck.shuffle();
                }
            )
        ]);
    };
};
