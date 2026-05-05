import { Card, PieceModel } from "@creature-chess/models";

import {
	afterRerollCardsEvent,
	afterSellPieceEvent,
	playerDeathEvent,
} from "../../entities/player/events";
import { PlayerStartListening } from "../../entities/player/player";
import { CardDeck } from "../cardDeck";

export const setupPlayerGameDeckListeners = (
	startListening: PlayerStartListening,
	deck: CardDeck,
	rerollMultiplier: number
) => {
	const pullNewCards = (
		oldCards: Card[],
		level: number,
		excludeIds: number[]
	) => deck.reroll(oldCards, 5, level, rerollMultiplier, excludeIds);

	const addToDeck = (pieces: PieceModel[], cards: Card[]) => {
		deck.addPieces(pieces);
		deck.addCards(cards);
	};

	startListening({
		actionCreator: playerDeathEvent,
		effect: async (_action, api) => {
			const {
				board,
				bench,
				gamemode: { pieceRegistry },
			} = api.player;

			const allPieces = [...board.getAllPieces(), ...bench.getAllPieces()]
				.map((p) => pieceRegistry.getPieceById(p.id))
				.filter((p): p is PieceModel => p !== null);

			const remainingCards = api.player.cards.filter(
				(card): card is Card => card !== null
			);

			api.player.setCards([]);
			api.player.clearBoard();
			api.player.clearBench();

			for (const piece of allPieces) {
				pieceRegistry.deregisterPiece(piece.id);
			}

			addToDeck(allPieces, remainingCards);
		},
	});

	startListening({
		actionCreator: afterRerollCardsEvent,
		effect: async (_action, api) => {
			const {
				board,
				bench,
				gamemode: { pieceRegistry },
			} = api.player;

			if (!api.player.alive) {
				return;
			}

			const allPieces = [...board.getAllPieces(), ...bench.getAllPieces()]
				.map((p) => pieceRegistry.getPieceById(p.id))
				.filter((p): p is PieceModel => p !== null);

			const threeStarPieces = allPieces.filter((p) => p.stage === 2);
			const excludeIds = threeStarPieces.map((p) => p.definitionId);

			const remainingCards = api.player.cards.filter(
				(card): card is Card => card !== null
			);
			const newCards = pullNewCards(remainingCards, api.player.level, excludeIds);

			api.player.setCards(newCards);
		},
	});

	startListening({
		actionCreator: afterSellPieceEvent,
		effect: async ({ payload: { piece } }) => {
			deck.addPiece(piece);
		},
	});
};
