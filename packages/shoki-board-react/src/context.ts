import { createContext, useContext } from "react";
import { BoardSelectors, BoardState } from "@shoki/board";

const BoardContext = createContext<BoardState>(null!);
BoardContext.displayName = "BoardContext";

export const BoardContextProvider = BoardContext.Provider;
export const useBoard = () => useContext(BoardContext);

export const useBelowPieceLimit = () => {
	const board = useContext(BoardContext);

	if (!board) {
		return false;
	}

	return board.pieceLimit === null || BoardSelectors.isBelowPieceLimit(board);
};

export const usePieces = () => {
	const board = useContext(BoardContext);

	if (!board) {
		return {};
	}

	return board.pieces;
};

export const usePiecePositions = () => {
	const board = useContext(BoardContext);

	if (!board) {
		return {};
	}

	return board.piecePositions;
};
