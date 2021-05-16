import { select, delay, put, call } from "redux-saga/effects";
import { getContext } from "typed-redux-saga";
import { getDefinitionById, getAllPieces, PlayerActions, PlayerState, PlayerSagaContext } from "@creature-chess/gamemode";
import { BOT_ACTION_TIME_MS } from "../constants";
import { compareCardPieceViews, getCardViews, getPieceViews } from "./cardPieceViews";
import { PREFERRED_LOCATIONS } from "../preferredLocations";

const getPieceCount = (state: PlayerState): number => getAllPieces(state).length;
const atPieceLimit = (state: PlayerState) => getPieceCount(state) >= state.playerInfo.level;

const PIECE_IS_BETTER = 1;

export const buyBestPieces = function*() {
	const cards = getCardViews(yield select());

	for (const card of cards) {
		const pieces = getPieceViews(yield select());
		const worstPiece = pieces.pop();

		if (
			!worstPiece
			|| worstPiece.definitionId === card.definitionId
			|| compareCardPieceViews(card, worstPiece) === PIECE_IS_BETTER
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
			yield put(PlayerActions.sellPiecePlayerAction({ pieceId: worstPiece.id }));
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
		const { logger } = yield* PlayerSagaContext.getPlayerSagaDependencies();
		const name = yield* getContext<string>("playerName");

		logger.warn(
			`buyCardIfBelowLimit card was not found`,
			{ actor: { name } }
		);
		return;
	}

	const definition = getDefinitionById(card.definitionId);

	yield put(PlayerActions.buyCardPlayerAction({
		index,
		sortPositions: PREFERRED_LOCATIONS[definition!.class]
	}));
	yield delay(BOT_ACTION_TIME_MS);
};
