import { getContext, select, delay, put, call } from "@redux-saga/core/effects";
import { getDefinitionById, getAllPieces, PlayerGameActions, PlayerState } from "@creature-chess/gamemode";
import { BOT_ACTION_TIME_MS } from "../constants";
import { compareCardPieceViews, getCardViews, getPieceViews } from "./cardPieceViews";
import { PREFERRED_LOCATIONS } from "../preferredLocations";

const getPieceCount = (state: PlayerState): number => getAllPieces(state).length;
const atPieceLimit = (state: PlayerState) => getPieceCount(state) >= state.playerInfo.level;

export const buyBestPieces = function*() {
    const cards = getCardViews(yield select());

    for (const card of cards) {
        const pieces = getPieceViews(yield select());
        const worstPiece = pieces.pop();

        const pieceIsBetter = () => compareCardPieceViews(card, worstPiece) === 1;

        if (
            !worstPiece
            || worstPiece.definitionId === card.definitionId
            || pieceIsBetter()
        ) {
            yield call(buyCardIfBelowLimit, card.index);
            continue;
        }

        const { playerInfo: { money: currentMoney } }: PlayerState = yield select();
        const moneyAfterSelling = currentMoney + worstPiece.cost;

        // if we still can't afford, move to the next card
        if (moneyAfterSelling < card.cost) {
            continue;
        }

        const canCurrentlyAfford = currentMoney >= worstPiece.cost;

        // sell a piece to make room
        if (atPieceLimit(yield select()) || !canCurrentlyAfford) {
            yield put(PlayerGameActions.sellPiecePlayerAction({ pieceId: worstPiece.id }));
            yield delay(BOT_ACTION_TIME_MS);
        }

        yield call(buyCardIfBelowLimit, card.index);
    }
};

const buyCardIfBelowLimit = function*(index: number) {
    const state: PlayerState = yield select();

    if (atPieceLimit(state)) {
        return;
    }

    const card = state.cardShop.cards[index];

    if (!card) {
        const { getLogger } = yield getContext("dependencies");

        getLogger().warn(
            `buyCardIfBelowLimit card was not found`,
            { actor: { name: this.name } }
        );
        return;
    }

    const definition = getDefinitionById(card.definitionId);

    yield put(PlayerGameActions.buyCardPlayerAction({
        index,
        sortPositions: PREFERRED_LOCATIONS[definition.class]
    }));
    yield delay(BOT_ACTION_TIME_MS);
};
