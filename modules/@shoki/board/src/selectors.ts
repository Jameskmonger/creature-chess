import { Board } from "@creature-chess/board";
import { topToBottomMiddleSortPositions } from "./positionSort";
import {
	BoardState,
	PiecePosition,
	PiecePositionsState,
	SortPositionFn,
} from "./types";

// todo add a position-for-id lookup to the board state to improve this
export const getPiecePosition = (
	state: BoardState,
	pieceId: string
): PiecePosition | null =>
	getPiecePositionFromPositionSet(state.piecePositions, pieceId);

export const getPiecePositionFromPositionSet = (
	state: PiecePositionsState,
	pieceId: string
): PiecePosition | null => {
	const entry = Object.entries(state).find(([_, id]) => id === pieceId);

	if (!entry) {
		return null;
	}

	const [x, y] = entry[0].split(",").map((val) => parseInt(val, 10));

	return { x, y };
};

export const getAllPieces = <TPiece>(state: BoardState<TPiece>): TPiece[] =>
	Object.values(state.pieces).filter((p) => p !== null);
export const getPiece = <TPiece>(
	state: BoardState<TPiece>,
	pieceId: string
): TPiece | null => state.pieces[pieceId] || null;
export const isBelowPieceLimit = (state: BoardState) =>
	state.pieceLimit === null || getAllPieces(state).length < state.pieceLimit;

export const getPieceForPosition = <TPiece>(
	state: BoardState<TPiece>,
	x: number,
	y: number
): TPiece | null => state.pieces[state.piecePositions[`${x},${y}`]] || null;

export const getFirstEmptySlot = (
	state: Board,
	sortPositions: SortPositionFn = topToBottomMiddleSortPositions
): PiecePosition | null => {
	const emptyPositions: PiecePosition[] = [];

	for (let y = 0; y < state.height; y++) {
		for (let x = 0; x < state.width; x++) {
			const boardPiece = state.getPieceIdAtPosition(x, y);

			if (!boardPiece) {
				emptyPositions.push({ x, y });
			}
		}
	}

	if (emptyPositions.length === 0) {
		return null;
	}

	emptyPositions.sort(sortPositions);

	const position = emptyPositions[0];

	return {
		x: position.x,
		y: position.y,
	};
};
