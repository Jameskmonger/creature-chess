import { BoardSelectors, BoardSlice, BoardState } from "@shoki/board";

import { PieceModel } from "@creature-chess/models";

import { PieceCombatState, PieceInfoStore } from "../state";
import { getStats } from "../utils/getStats";
import { simulatePiece } from "./piece/simulate";

type Stores = { combatStore: PieceInfoStore<PieceCombatState> };

export const simulateTurn = (
	currentTurn: number,
	board: BoardState<PieceModel>,
	boardSlice: BoardSlice<PieceModel>,
	stores: Stores
) => {
	const pieceEntries = Object.entries(board.pieces);

	pieceEntries.sort(([, aPiece], [, bPiece]) => {
		const aStats = getStats(aPiece);
		const bStats = getStats(bPiece);

		return bStats.speed - aStats.speed;
	});

	return pieceEntries.reduce(
		(b, [pieceId]) =>
			takePieceTurn(currentTurn, pieceId, b, boardSlice, stores),
		board
	);
};

const takePieceTurn = (
	currentTurn: number,
	pieceId: string,
	board: BoardState<PieceModel>,
	boardSlice: BoardSlice<PieceModel>,
	{ combatStore }: Stores
): BoardState<PieceModel> => {
	const piece = BoardSelectors.getPiece(board, pieceId);

	if (!piece) {
		return board;
	}

	const attacker: PieceModel = {
		...piece,
		attacking: null,
		hit: null,
	};

	const attackerPosition = BoardSelectors.getPiecePosition(board, pieceId);

	if (!attackerPosition) {
		return board;
	}

	return simulatePiece(
		currentTurn,
		board,
		boardSlice,
		attacker,
		attackerPosition,
		{ combatStore }
	);
};
