import { createAction } from "@reduxjs/toolkit";
import { v4 as uuid } from "uuid";
import { z } from "zod";

import {
	Board,
	getFirstEmptySlot,
	topLeftToBottomRightSortPositions,
	unpackX,
} from "@creature-chess/board";
import {
	Card,
	GamePhase,
	getDefinitionById,
	PieceModel,
	PlayerPieceLocation,
} from "@creature-chess/models";

import { Player } from "../entities/player/player";
import { definePlayerAction } from "./registry";

const getCardDestination = (
	player: Player,
	board: Board,
	bench: Board
): PlayerPieceLocation | null => {
	const inPreparingPhase =
		player.gamemode.getRoundInfo().phase === GamePhase.PREPARING;

	if (player.belowPieceLimit && inPreparingPhase) {
		const boardSlot = getFirstEmptySlot(board);

		if (boardSlot) {
			return { type: "board", location: boardSlot };
		}
	}

	const benchSlot = getFirstEmptySlot(bench, topLeftToBottomRightSortPositions);

	if (benchSlot !== null) {
		return { type: "bench", location: benchSlot };
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
		maxHealth: stats.hp,
		traits: definition.traits,
		stage: 0,
	};
};

const buyCardSchema = z.object({
	index: z.number().int().nonnegative(),
});

export type BuyCardPlayerAction = ReturnType<typeof buyCardPlayerAction>;
export const buyCardPlayerAction = createAction<
	z.infer<typeof buyCardSchema>,
	"buyCardPlayerAction"
>("buyCardPlayerAction");

export const buyCardDef = definePlayerAction({
	type: buyCardPlayerAction.type,
	schema: buyCardSchema,
	handler: (player, { index }) => {
		const {
			id: playerId,
			name,
			logger,
			gamemode: { pieceRegistry },
			board,
			bench,
		} = player;
		const cards = player.cards;
		const card = cards[index];

		if (!card) {
			logger.warn("Player attempted to buy null/undefined card", {
				actor: { playerId, name },
			});
			player.setMoney(player.money);
			player.setCards(cards);
			return;
		}

		if (player.money < card.cost) {
			logger.warn("Not enough money to buy card", {
				actor: { playerId, name },
				details: { index },
			});
			player.setMoney(player.money);
			player.setCards(cards);
			return;
		}

		const destination = getCardDestination(player, board, bench);

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
			player.addBoardPiece({
				pieceId: piece.id,
				position: destination.location,
			});
		} else {
			player.addBenchPiece({
				pieceId: piece.id,
				position: { x: unpackX(destination.location) },
			});
		}

		player.reduceMoney(card.cost);
		player.setCards(remainingCards);
	},
});
