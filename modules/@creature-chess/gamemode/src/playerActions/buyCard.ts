import { createAction } from "@reduxjs/toolkit";
import { v4 as uuid } from "uuid";

import {
	Card,
	GamePhase,
	PieceModel,
	PlayerPieceLocation,
} from "@creature-chess/models";

import { getDefinitionById } from "../definitions";
import { PlayerStartListening } from "../entities/player/player";
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

export const setupBuyCardListener = (startListening: PlayerStartListening) => {
	startListening({
		actionCreator: buyCardPlayerAction,
		effect: async (action, api) => {
			const playerId = api.player.id;
			const name = api.player.name;
			const { logger, gamemode: { pieceRegistry }, board, bench } = api.player;

			const index = action.payload.index;
			const sortPositions = action.payload.sortPositions || undefined;

			const state = api.getState();
			const cards = getPlayerCards(state);
			const money = getPlayerMoney(state);

			const card = cards[index];

			if (!card) {
				logger.warn("Player attempted to buy null/undefined card", {
					actor: { playerId, name },
				});

				api.dispatch(playerInfoCommands.updateMoneyCommand(money));
				api.dispatch(updateCardsCommand(cards));

				return;
			}

			if (money < card.cost) {
				logger.warn("Not enough money to buy card", {
					actor: { playerId, name },
					details: { index },
				});

				api.dispatch(playerInfoCommands.updateMoneyCommand(money));
				api.dispatch(updateCardsCommand(cards));

				return;
			}

			const destination = getCardDestination(api.getState(), board, bench, playerId, sortPositions);

			if (destination === null) {
				logger.warn(
					"Player attempted to buy a card but has no available destination",
					{ actor: { playerId, name } }
				);
				return;
			}

			const piece = createPieceFromCard(playerId, card);

			if (!piece) {
				return;
			}

			pieceRegistry.registerPiece(piece);

			const remainingCards = cards.map((c) => (c === card ? null : c));

			if (destination.type === "board") {
				api.dispatch(
					addBoardPieceCommand({
						pieceId: piece.id,
						position: destination.location,
					})
				);
			} else if (destination.type === "bench") {
				api.dispatch(
					addBenchPieceCommand({
						pieceId: piece.id,
						position: { x: unpackX(destination.location) },
					})
				);
			}

			api.dispatch(playerInfoCommands.updateMoneyCommand(money - card.cost));
			api.dispatch(updateCardsCommand(remainingCards));
		},
	});
};
