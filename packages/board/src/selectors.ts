import { topToBottomMiddleSortPositions } from "./positionSort";
import { BoardState, PiecePosition, SortPositionFn } from "./types";

// todo add a position-for-id lookup to the board state to improve this
export const getPiecePosition = (state: BoardState, pieceId: string): PiecePosition => {
    const entry = Object.entries(state.piecePositions)
        .find(([_, id]) => id === pieceId);

    if (!entry) {
        return null;
    }

    const [x, y] = entry[0].split(",")
        .map(x => parseInt(x, 10));

    return { x, y };
};

export const getAllPieces = <TPiece>(state: BoardState<TPiece>): TPiece[] => Object.values(state.pieces);
export const getPiece = <TPiece>(state: BoardState<TPiece>, pieceId: string): TPiece => state.pieces[pieceId] || null;
export const isBelowPieceLimit = (state: BoardState) => getAllPieces(state).length < state.pieceLimit

export const getPieceForPosition = <TPiece>(state: BoardState<TPiece>, x: number, y: number): TPiece =>
    state.pieces[state.piecePositions[`${x},${y}`]] || null;

export const getFirstEmptySlot = (state: BoardState, sortPositions: SortPositionFn = topToBottomMiddleSortPositions): (PiecePosition | null) => {
    const emptyPositions: PiecePosition[] = [];

    for (let y = 0; y < state.size.height; y++) {
        for (let x = 0; x < state.size.width; x++) {
            const boardPiece = getPieceForPosition(state, x, y);

            if (!boardPiece) {
                emptyPositions.push({ x, y });
            }
        }
    }

    if (emptyPositions.length === 0) {
        return null;
    }

    emptyPositions.sort(sortPositions);

    const { x, y } = emptyPositions[0];

    return { x, y };
};
