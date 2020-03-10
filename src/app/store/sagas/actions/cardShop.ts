import { takeEvery, select, put } from "@redux-saga/core/effects";
import { AppState } from "../../state";
import { GamePhase } from "@common";
import { pieceUtils } from "@common/utils";
import { getFirstEmptyBenchSlot, BenchActions } from "@common/board";
import { moneyUpdateAction } from "../../actions/gameActions";
import { DefinitionProvider } from "@common/game/definitionProvider";
import { BUY_CARD } from "../../../features/cardshop/cardActionTypes";
import { BuyCardAction, cardsUpdated } from "../../../features/cardshop/cardActions";

const definitionProvider = new DefinitionProvider();

export const cardShop = function*() {
    yield takeEvery<BuyCardAction>(
        BUY_CARD,
        function*(action) {
            const state: AppState = yield select();

            const gamePhase = state.game.phase;

            // not in correct phase
            if (gamePhase === GamePhase.WAITING || gamePhase === GamePhase.DEAD) {
                return;
            }

            const card = state.cards[action.payload.index];
            const money = state.game.money;

            // card doesn't exist or player can't afford
            if (!card || money < card.cost) {
                return;
            }

            const slot = getFirstEmptyBenchSlot(state.bench);

            // no valid slots
            if (slot === null) {
                return;
            }

            const localPlayerId = state.localPlayer.id;

            const piece = pieceUtils.createPieceFromCard(definitionProvider, localPlayerId, card, slot);
            const remainingCards = state.cards.map(c => c === card ? null : c);

            yield put(BenchActions.benchPieceAdded(piece));
            yield put(moneyUpdateAction(money - card.cost));
            yield put(cardsUpdated(remainingCards));
        }
    );
};
