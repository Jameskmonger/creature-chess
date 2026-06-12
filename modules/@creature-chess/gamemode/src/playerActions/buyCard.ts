import { v4 as uuid } from "uuid";

import {
	Board,
	getFirstEmptySlot,
	topLeftToBottomRightSortPositions,
} from "@creature-chess/board";
import {
	Card,
	GamePhase,
	PieceModel,
	PlayerPieceLocation,
} from "@creature-chess/models";

import { Player } from "../entities/player/player";
import { CreatureRegistry } from "../factory";
import { buyCardPlayerAction } from "./creators";
import { definePlayerAction } from "./registry";
import { resyncPlayer } from "./resync";

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
	card: Card,
	creatures: CreatureRegistry
): PieceModel | null => {
	const { id, definitionId } = card;
	const definition = creatures.get(definitionId);
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

export const buyCardDef = definePlayerAction({
	creator: buyCardPlayerAction,
	handler: (player, { index }) => {
		const { id: playerId, name, logger, board, bench } = player;
		const cards = player.cards;
		const card = cards[index];

		if (!card) {
			logger.warn("Player attempted to buy null/undefined card", {
				actor: { playerId, name },
			});
			resyncPlayer(player, "money", "cards");
			return;
		}

		if (player.money < card.cost) {
			logger.warn("Not enough money to buy card", {
				actor: { playerId, name },
				details: { index },
			});
			resyncPlayer(player, "money", "cards");
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

		const piece = createPieceFromCard(
			playerId,
			card,
			player.gamemode.creatures
		);
		if (!piece) {
			logger.warn("Player attempted to buy card with unregistered definition", {
				actor: { playerId, name },
				details: { definitionId: card.definitionId },
			});
			resyncPlayer(player, "money", "cards");
			return;
		}

		const remainingCards = cards.map((c) => (c === card ? null : c));

		player.addPiece(piece, destination);

		player.reduceMoney(card.cost);
		player.setCards(remainingCards);
	},
});
