import { v4 as uuid } from "uuid";
import { createAction } from "@reduxjs/toolkit";
import { take, put } from "@redux-saga/core/effects";
import { select, getContext } from "typed-redux-saga";
import { Card, GamePhase, PieceModel, PlayerPieceLocation, TileCoordinates } from "@creature-chess/models";
import { BoardSelectors, topLeftToBottomRightSortPositions } from "@shoki/board";
import { PlayerState } from "../entities/player/state";
import { getPlayerBelowPieceLimit, getPlayerCards, getPlayerMoney } from "../entities/player/state/selectors";
import { updateMoneyCommand } from "../player/playerInfo/commands";
import { updateCardsCommand } from "../entities/player/state/cardShop";
import { getDefinitionById } from "../definitions";
import { getBenchSlice, getBoardSlice } from "../entities/player/selectors";
import { getPlayerEntityDependencies } from "../entities/player/dependencies";

const getCardDestination = (
	state: PlayerState,
	playerId: string,
	sortPositions?: (a: TileCoordinates, b: TileCoordinates) => -1 | 1
): PlayerPieceLocation | null => {
	const belowPieceLimit = getPlayerBelowPieceLimit(state, playerId);
	const inPreparingPhase = state.roundInfo.phase === GamePhase.PREPARING;

	if (belowPieceLimit && inPreparingPhase) {
		const boardSlot = BoardSelectors.getFirstEmptySlot(state.board, sortPositions);

		if (boardSlot) {
			return {
				type: "board",
				location: boardSlot
			};
		}
	}

	const benchSlot = BoardSelectors.getFirstEmptySlot(state.bench, topLeftToBottomRightSortPositions);

	if (benchSlot !== null) {
		return {
			type: "bench",
			location: benchSlot
		};
	}

	return null;
};

const createPieceFromCard = (
	ownerId: string,
	card: Card
): PieceModel | null => {
	const { id, definitionId } = card;

	const definition = getDefinitionById(definitionId);

	if (!definition) {
		return null;
	}

	const stats = definition.stages[0];

	return {
		id: id || uuid(),
		ownerId,
		definitionId,
		definition,
		facingAway: true,
		maxHealth: stats.hp,
		currentHealth: stats.hp,
		stage: 0
	};
};

export type BuyCardPlayerAction = ReturnType<typeof buyCardPlayerAction>;
export const buyCardPlayerAction = createAction<{
	index: number;
	sortPositions?: (a: TileCoordinates, b: TileCoordinates) => -1 | 1;
}, "buyCardPlayerAction">("buyCardPlayerAction");

export const buyCardPlayerActionSaga = function*() {
	while (true) {
		const playerId = yield* getContext<string>("id");
		const name = yield* getContext<string>("playerName");
		const { logger } = yield* getPlayerEntityDependencies();
		const boardSlice = yield* getBoardSlice();
		const benchSlice = yield* getBenchSlice();

		const action: BuyCardPlayerAction = yield take(buyCardPlayerAction.toString());
		const index = action.payload.index;
		const sortPositions = action.payload.sortPositions || undefined;

		const cards = yield* select(getPlayerCards);
		const money = yield* select(getPlayerMoney);

		const card = cards[index];

		if (!card) {
			logger.warn(
				"Player attempted to buy null/undefined card",
				{ actor: { playerId, name } }
			);

			yield put(updateMoneyCommand(money));
			yield put(updateCardsCommand(cards));

			continue;
		}

		if (money < card.cost) {
			logger.warn(
				"Not enough money to buy card",
				{
					actor: { playerId, name },
					details: { index }
				}
			);

			yield put(updateMoneyCommand(money));
			yield put(updateCardsCommand(cards));

			continue;
		}

		const destination = yield* select((state: PlayerState) => getCardDestination(state, playerId, sortPositions));

		// no valid slots
		if (destination === null) {
			logger.warn(
				"Player attempted to buy a card but has no available destination",
				{ actor: { playerId, name } }
			);
			continue;
		}

		const piece = createPieceFromCard(playerId, card);

		if (!piece) {
			return;
		}

		const remainingCards = cards.map(c => c === card ? null : c);

		if (destination.type === "board") {
			const { x, y } = destination.location;
			yield put(boardSlice.commands.addBoardPieceCommand({ piece, x, y }));
		} else if (destination.type === "bench") {
			yield put(benchSlice.commands.addBoardPieceCommand({ piece, x: destination.location.x, y: 0 }));
		}

		yield put(updateMoneyCommand(money - card.cost));
		yield put(updateCardsCommand(remainingCards));
	}
};
