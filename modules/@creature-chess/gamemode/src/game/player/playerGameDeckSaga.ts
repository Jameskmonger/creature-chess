import { all, put, takeEvery } from "@redux-saga/core/effects";
import { select } from "typed-redux-saga";

import { Card, PieceModel } from "@creature-chess/models";

import { PlayerState, PlayerCommands, getPlayerEntityDependencies } from "../../entities/player";
import {
	playerDeathEvent,
	PlayerDeathEvent,
	afterRerollCardsEvent,
	AfterRerollCardsEvent,
	afterSellPieceEvent,
	AfterSellPieceEvent,
} from "../../entities/player/events";
import { updateCardsCommand } from "../../entities/player/state/cardShop";
import {
	getPlayerCards,
	isPlayerAlive,
} from "../../entities/player/state/selectors";
import { CardDeck } from "../cardDeck";
import { clearBenchCommand, clearBoardCommand } from "../../entities/player/state/board";

export const playerGameDeckSagaFactory = function*(
	deck: CardDeck,
	rerollMultiplier: number
) {
	const {
		boards: { board, bench },
		gamemode: { pieceRegistry }
	} = yield* getPlayerEntityDependencies();

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

	function getAllPieces() {
		return [
			...board.getAllPieces(),
			...bench.getAllPieces(),
		]
			.map((p) => pieceRegistry.getPieceById(p.id))
			.filter((p): p is PieceModel => p !== null);
	}

	yield all([
		takeEvery<PlayerDeathEvent>(playerDeathEvent.toString(), function*() {
			const cards = yield* select(getPlayerCards);

			const allPieces = getAllPieces();

			const remainingCards = cards.filter(
				(card): card is Card => card !== null
			);

			yield put(updateCardsCommand([]));
			yield put(clearBoardCommand());
			yield put(clearBenchCommand());

			for (const piece of allPieces) {
				pieceRegistry.deregisterPiece(piece.id);
			}

			addToDeck(allPieces, remainingCards);
		}),
		takeEvery<AfterRerollCardsEvent>(
			afterRerollCardsEvent.toString(),
			function*() {
				const state = yield* select((s: PlayerState) => s);

				if (!isPlayerAlive(state)) {
					return;
				}

				const {
					cardShop: { cards },
					playerInfo: { level },
				} = state;

				const threeStarPieces = getAllPieces().filter((p) => p.stage === 2);
				const excludeIds = threeStarPieces.map((p) => p.definitionId);

				const remainingCards = cards.filter(
					(card): card is Card => card !== null
				);
				const newCards = pullNewCards(remainingCards, level, excludeIds);

				yield put(PlayerCommands.updateCardsCommand(newCards));
			}
		),
		takeEvery<AfterSellPieceEvent>(
			afterSellPieceEvent.toString(),
			function*({ payload: { piece } }) {
				// when a player sells a piece, add it back to the deck
				deck.addPiece(piece);
				deck.shuffleAllDecks();
			}
		),
	]);
};
