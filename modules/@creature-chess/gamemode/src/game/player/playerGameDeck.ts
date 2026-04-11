import { Card, PieceModel } from "@creature-chess/models";

import { PlayerCommands } from "../../entities/player";
import {
	playerDeathEvent,
	afterRerollCardsEvent,
	afterSellPieceEvent,
} from "../../entities/player/events";
import { PlayerStartListening } from "../../entities/player/player";
import { PlayerState } from "../../entities/player/state";
import {
	clearBenchCommand,
	clearBoardCommand,
} from "../../entities/player/state/board";
import { updateCardsCommand } from "../../entities/player/state/cardShop";
import {
	getPlayerCards,
	isPlayerAlive,
} from "../../entities/player/state/selectors";
import { CardDeck } from "../cardDeck";

export const setupPlayerGameDeckListeners = (
	startListening: PlayerStartListening,
	deck: CardDeck,
	rerollMultiplier: number
) => {
	// when a player rerolls, get them some new cards from the deck
	const pullNewCards = (
		oldCards: Card[],
		level: number,
		excludeIds: number[]
	) => deck.reroll(oldCards, 5, level, rerollMultiplier, excludeIds);

	// when a player dies, add their cards and pieces back to the deck
	const addToDeck = (pieces: PieceModel[], cards: Card[]) => {
		for (const piece of pieces) {
			deck.addPiece(piece);
		}
		deck.addCards(cards);
		deck.shuffleAllDecks();
	};

	startListening({
		actionCreator: playerDeathEvent,
		effect: async (_action, api) => {
			const {
				board,
				bench,
				gamemode: { pieceRegistry },
			} = api.player;

			const cards = getPlayerCards(api.getState());

			const allPieces = [...board.getAllPieces(), ...bench.getAllPieces()]
				.map((p) => pieceRegistry.getPieceById(p.id))
				.filter((p): p is PieceModel => p !== null);

			const remainingCards = cards.filter(
				(card): card is Card => card !== null
			);

			api.dispatch(updateCardsCommand([]));
			api.dispatch(clearBoardCommand());
			api.dispatch(clearBenchCommand());

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

			const state = api.getState() as PlayerState;

			if (!isPlayerAlive(state)) {
				return;
			}

			const {
				cardShop: { cards },
				playerInfo: { level },
			} = state;

			const allPieces = [...board.getAllPieces(), ...bench.getAllPieces()]
				.map((p) => pieceRegistry.getPieceById(p.id))
				.filter((p): p is PieceModel => p !== null);

			const threeStarPieces = allPieces.filter((p) => p.stage === 2);
			const excludeIds = threeStarPieces.map((p) => p.definitionId);

			const remainingCards = cards.filter(
				(card): card is Card => card !== null
			);
			const newCards = pullNewCards(remainingCards, level, excludeIds);

			api.dispatch(PlayerCommands.updateCardsCommand(newCards));
		},
	});

	startListening({
		actionCreator: afterSellPieceEvent,
		effect: async ({ payload: { piece } }) => {
			// when a player sells a piece, add it back to the deck
			deck.addPiece(piece);
			deck.shuffleAllDecks();
		},
	});
};
