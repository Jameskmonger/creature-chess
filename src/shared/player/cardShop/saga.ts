import { takeEvery, select, put } from "@redux-saga/core/effects";
import { BuyCardAction, BUY_CARD } from "../actions";
import { GamePhase } from "@common/models";
import { getFirstEmptyBenchSlot } from "@common/board";
import { DefinitionProvider } from "@common/game/definitionProvider";
import { createPieceFromCard } from "@common/utils/piece-utils";
import { addBenchPiece } from "../bench/benchActions";
import { cardsUpdated } from "./actions";
import { PlayerState } from "../store";
import { moneyUpdateAction } from "../gameInfo";
import { log } from "@common/log";

// todo figure out dependency injection here - or at least construct one and pass it down :)
const definitionProvider = new DefinitionProvider();

export const cardShopSagaFactory = <TState extends PlayerState>(playerId: string) => {
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

                const slot = getFirstEmptyBenchSlot(state.bench.pieces);

                // no valid slots
                if (slot === null) {
                    log(`attempted to buy a card but has no empty slot`);
                    return;
                }

                const piece = createPieceFromCard(definitionProvider, playerId, card, slot);
                const remainingCards = state.cards.map(c => c === card ? null : c);

                yield put(addBenchPiece(piece, slot));
                yield put(moneyUpdateAction(money - card.cost));
                yield put(cardsUpdated(remainingCards));
            }
        );
    };
};
