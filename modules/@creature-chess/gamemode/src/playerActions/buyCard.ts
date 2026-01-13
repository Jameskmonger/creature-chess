import { take, put } from "@redux-saga/core/effects";
import { createAction } from "@reduxjs/toolkit";
import { select, getContext } from "typed-redux-saga";
import { v4 as uuid } from "uuid";

import {
	Card,
	GamePhase,
	PieceModel,
	PlayerPieceLocation,
} from "@creature-chess/models";

import { getDefinitionById } from "../definitions";
import { getPlayerEntityDependencies } from "../entities/player/dependencies";
import { getBench, getBoard } from "../entities/player/selectors";
import { PlayerState } from "../entities/player/state";
import { updateCardsCommand } from "../entities/player/state/cardShop";
import { playerInfoCommands } from "../entities/player/state/playerInfo/reducer";
import {
	getPlayerBelowPieceLimit,
	getPlayerCards,
	getPlayerMoney,
} from "../entities/player/state/selectors";
import { addBenchPieceCommand, addBoardPieceCommand } from "../entities/player/state/board";
import { Board, getFirstEmptySlot, PackedPosition, topLeftToBottomRightSortPositions, unpackX } from "@creature-chess/board";

const getCardDestination = (
	state: PlayerState,
	board: Board,
	bench: Board,
	playerId: string,
	sortPositions?: (a: PackedPosition, b: PackedPosition) => -1 | 1
): PlayerPieceLocation | null => {
	const belowPieceLimit = getPlayerBelowPieceLimit(state.playerInfo.level, board);
	const inPreparingPhase = state.roundInfo.phase === GamePhase.PREPARING;

	if (belowPieceLimit && inPreparingPhase) {
		const boardSlot = getFirstEmptySlot(
			board,
			sortPositions
		);

		if (boardSlot) {
			return {
				type: "board",
				location: boardSlot,
			};
		}
	}

	const benchSlot = getFirstEmptySlot(
		bench,
		topLeftToBottomRightSortPositions
	);

	if (benchSlot !== null) {
		return {
			type: "bench",
			location: benchSlot,
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
		facingAway: false,
		maxHealth: stats.hp,
		currentHealth: stats.hp,
		traits: definition.traits,
		stage: 0,
		lastBattleStats: null,
	};
};

export type BuyCardPlayerAction = ReturnType<typeof buyCardPlayerAction>;
export const buyCardPlayerAction = createAction<
	{
		index: number;
		sortPositions?: (a: PackedPosition, b: PackedPosition) => -1 | 1;
	},
	"buyCardPlayerAction"
>("buyCardPlayerAction");

export const buyCardPlayerActionSaga = function*() {
	while (true) {
		const playerId = yield* getContext<string>("id");
		const name = yield* getContext<string>("playerName");
		const { logger, gamemode: { pieceRegistry } } = yield* getPlayerEntityDependencies();
		const board = yield* getBoard();
		const bench = yield* getBench();

		const action: BuyCardPlayerAction = yield take(
			buyCardPlayerAction.toString()
		);
		const index = action.payload.index;
		const sortPositions = action.payload.sortPositions || undefined;

		const cards = yield* select(getPlayerCards);
		const money = yield* select(getPlayerMoney);

		const card = cards[index];

		if (!card) {
			logger.warn("Player attempted to buy null/undefined card", {
				actor: { playerId, name },
			});

			yield put(playerInfoCommands.updateMoneyCommand(money));
			yield put(updateCardsCommand(cards));

			continue;
		}

		if (money < card.cost) {
			logger.warn("Not enough money to buy card", {
				actor: { playerId, name },
				details: { index },
			});

			yield put(playerInfoCommands.updateMoneyCommand(money));
			yield put(updateCardsCommand(cards));

			continue;
		}

		const destination = yield* select((state: PlayerState) =>
			getCardDestination(state, board, bench, playerId, sortPositions)
		);

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

		pieceRegistry.registerPiece(piece);

		const remainingCards = cards.map((c) => (c === card ? null : c));

		if (destination.type === "board") {
			yield put(
				addBoardPieceCommand({
					pieceId: piece.id,
					position: destination.location,
				})
			);
		} else if (destination.type === "bench") {
			yield put(
				addBenchPieceCommand({
					pieceId: piece.id,
					position: { x: unpackX(destination.location) },
				})
			);
		}

		yield put(playerInfoCommands.updateMoneyCommand(money - card.cost));
		yield put(updateCardsCommand(remainingCards));
	}
};
