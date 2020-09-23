import { takeEvery, select, put } from "@redux-saga/core/effects";
import { BuyCardAction, BUY_CARD } from "../actions";
import { GamePhase, PlayerPieceLocation } from "@creature-chess/models";
import { getFirstEmptyBenchSlot } from "../../board";
import { DefinitionProvider } from "../../game/definitionProvider";
import { createPieceFromCard } from "../../utils/piece-utils";
import { addBenchPiece } from "../bench/benchActions";
import { cardsUpdated } from "./actions";
import { PlayerState } from "../store";
import { moneyUpdateAction } from "../gameInfo";
import { log } from "../../log";
import { getPlayerBelowPieceLimit, getPlayerFirstEmptyBoardSlot } from "../playerSelectors";
import { addBoardPiece } from "../../board/actions/boardActions";

const getCardDestination = (state: PlayerState, playerId: string): PlayerPieceLocation => {
    const belowPieceLimit = getPlayerBelowPieceLimit(state, playerId);

    if (belowPieceLimit) {
        const boardSlot = getPlayerFirstEmptyBoardSlot(state);

        if (boardSlot) {
            return {
                type: "board",
                location: {
                    x: boardSlot.x,
                    y: boardSlot.y
                }
            };
        }
    }

    const benchSlot = getFirstEmptyBenchSlot(state.bench.pieces);

    if (benchSlot !== null) {
        return {
            type: "bench",
            location: {
                slot: benchSlot
            }
        };
    }

    return null;
};

export const cardShopSagaFactory = <TState extends PlayerState>(definitionProvider: DefinitionProvider, playerId: string) => {
    return function*() {
        yield takeEvery<BuyCardAction>(
            BUY_CARD,
            function*({ payload: { index } }) {
                const state: TState = yield select();

                const gamePhase = state.gameInfo.phase;

                // not in correct phase
                if (gamePhase === GamePhase.WAITING || gamePhase === GamePhase.DEAD) {
                    return;
                }

                const card = state.cards[index];
                const money = state.gameInfo.money;

                // card doesn't exist or player can't afford
                if (!card) {
                    log(`attempted to buy null/undefined card`);
                    return;
                }

                if (money < card.cost) {
                    log(`attempted to buy card costing $${card.cost} but only had $${money}`);
                    return;
                }

                const destination = getCardDestination(state, playerId);

                // no valid slots
                if (destination === null) {
                    log(`attempted to buy a card but has no available destination`);
                    return;
                }

                const piece = createPieceFromCard(definitionProvider, playerId, card);
                const remainingCards = state.cards.map(c => c === card ? null : c);

                if (destination.type === "board") {
                    yield put(addBoardPiece(piece, destination.location.x, destination.location.y));
                } else if (destination.type === "bench") {
                    yield put(addBenchPiece(piece, destination.location.slot));
                }

                yield put(moneyUpdateAction(money - card.cost));
                yield put(cardsUpdated(remainingCards));
            }
        );
    };
};
