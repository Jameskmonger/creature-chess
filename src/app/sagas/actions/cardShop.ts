import { takeEvery, select, put } from "@redux-saga/core/effects";
import { PurchaseCardAction, cardsUpdated } from "../../actions/cardActions";
import { PURCHASE_CARD } from "../../actiontypes/cardActionTypes";
import { AppState } from "../../store/store";
import { GamePhase } from "@common";
import { createPieceFromCard } from "@common/pokemon-piece";
import { getFirstEmptyBenchSlot, BoardActions } from "@common/board";
import { createTileCoordinates, TileType } from "@common/position";
import { moneyUpdateAction } from "../../actions/gameActions";

export const cardShop = function*() {
    yield takeEvery<PurchaseCardAction>(
        PURCHASE_CARD,
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

            const piece = createPieceFromCard(localPlayerId, card, slot);
            const remainingCards = state.cards.map(c => c === card ? null : c);

            yield put(BoardActions.pieceMoved(piece, createTileCoordinates(slot, null), TileType.BENCH));
            yield put(moneyUpdateAction(money - card.cost));
            yield put(cardsUpdated(remainingCards));
        }
    );
};
