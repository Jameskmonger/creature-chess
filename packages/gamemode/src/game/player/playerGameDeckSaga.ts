import { Card, PieceModel } from "@creature-chess/models";
import { all, put, takeEvery } from "@redux-saga/core/effects";
import { select } from "typed-redux-saga";
import { getBenchSlice, getBoardSlice } from "../../entities/player/selectors";
import { updateCardsCommand } from "../../entities/player/state/cardShop";
import { getAllPieces, getPiecesExceptStage, getPiecesForStage } from "../../player/pieceSelectors";
import { getPlayerCards, isPlayerAlive } from "../../entities/player/state/selectors";
import { PlayerState, PlayerCommands } from "../../entities/player";
import { CardDeck } from "../cardDeck";
import {
	playerDeathEvent, PlayerDeathEvent,
	afterRerollCardsEvent, AfterRerollCardsEvent,
	afterSellPieceEvent, AfterSellPieceEvent
} from "../../entities/player/events";

export const playerGameDeckSagaFactory = function*(deck: CardDeck) {
	const boardSlice = yield* getBoardSlice();
	const benchSlice = yield* getBenchSlice();

	// when a player rerolls, get them some new cards from the deck
	const pullNewCards = (
		oldCards: Card[],
		level: number,
		excludeIds: number[],
		blessCandidateIds: number[]
	) => deck.reroll(oldCards, 5, level, blessCandidateIds, excludeIds);

	// when a player dies, add their cards and pieces back to the deck
	const addToDeck = (pieces: PieceModel[], cards: Card[]) => {
		for (const piece of pieces) {
			deck.addPiece(piece);
		}
		deck.addCards(cards);
		deck.shuffle();
	};

	yield all([
		takeEvery<PlayerDeathEvent>(
			playerDeathEvent.toString(),
			function*() {
				const cards = yield* select(getPlayerCards);
				const pieces = yield* select(getAllPieces);

				const remainingCards = cards.filter((card): card is Card => card !== null);

				yield put(updateCardsCommand([]));
				yield put(boardSlice.commands.setBoardPiecesCommand({ pieces: {}, piecePositions: {} }));
				yield put(benchSlice.commands.setBoardPiecesCommand({ pieces: {}, piecePositions: {} }));

				addToDeck(pieces, remainingCards);
			}
		),
		takeEvery<AfterRerollCardsEvent>(
			afterRerollCardsEvent.toString(),
			function*() {
				const state = yield* select((s: PlayerState) => s);

				if (!isPlayerAlive(state)) {
					return;
				}

				const {
					cardShop: { cards },
					playerInfo: { level }
				} = state;

				const threeStarBoardPieces = getPiecesForStage(state.board, 2);
				const threeStarBenchPieces = getPiecesForStage(state.bench, 2);

				const excludeIds = [...threeStarBoardPieces, ...threeStarBenchPieces].map(p => p.definitionId);
				const blessCandidateIds = [... new Set(getPiecesExceptStage(state.board, 2).map(p => p.definitionId))];

				const remainingCards = cards.filter((card): card is Card => card !== null);
				const newCards = pullNewCards(remainingCards, level, excludeIds, blessCandidateIds);

				yield put(PlayerCommands.updateCardsCommand(newCards));
			}
		),
		takeEvery<AfterSellPieceEvent>(
			afterSellPieceEvent.toString(),
			function*({ payload: { piece } }) {
				// when a player sells a piece, add it back to the deck
				deck.addPiece(piece);
				deck.shuffle();
			}
		)
	]);
};
