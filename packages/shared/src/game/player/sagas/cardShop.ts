import { takeEvery, select, put } from "@redux-saga/core/effects";
import { BuyCardAction, BUY_CARD_ACTION } from "../actions";
import { PlayerPieceLocation } from "@creature-chess/models";
import { getFirstEmptyBenchSlot, BoardCommands } from "../../../board";
import { DefinitionProvider } from "../../definitions/definitionProvider";
import { createPieceFromCard } from "../../../utils/piece-utils";
import { addBenchPieceCommand } from "../bench/commands";
import { PlayerState } from "../store";
import { log } from "../../../log";
import { getPlayerBelowPieceLimit, getPlayerFirstEmptyBoardSlot } from "../playerSelectors";
import { updateCardsCommand, updateMoneyCommand } from "../playerInfo/commands";

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
            BUY_CARD_ACTION,
            function*({ payload: { index } }) {
                const state: TState = yield select();

                const card = state.playerInfo.cards[index];
                const money = state.playerInfo.money;

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
                const remainingCards = state.playerInfo.cards.map(c => c === card ? null : c);

                if (destination.type === "board") {
                    yield put(BoardCommands.addBoardPiece(piece, destination.location.x, destination.location.y));
                } else if (destination.type === "bench") {
                    yield put(addBenchPieceCommand(piece, destination.location.slot));
                }

                yield put(updateMoneyCommand(money - card.cost));
                yield put(updateCardsCommand(remainingCards));
            }
        );
    };
};
