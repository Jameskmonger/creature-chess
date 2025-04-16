import React, { createContext, useContext } from "react";

import { BoardSelectors, BoardState, PiecePosition } from "@shoki/board";

export type BoardContextValue = {
	state: BoardState;

	tileBackgroundRenderer?: (position: PiecePosition) => React.ReactNode;
};

const BoardContext = createContext<BoardContextValue>(null!);
BoardContext.displayName = "BoardContext";

export const BoardContextProvider = BoardContext.Provider;

const useBoard = () => useContext(BoardContext);
export const useBoardState = () => useBoard().state;

export const useBelowPieceLimit = () => {
	const boardState = useBoardState();

	if (!boardState) {
		return false;
	}

	return (
		boardState.pieceLimit === null ||
		BoardSelectors.isBelowPieceLimit(boardState)
	);
};

export const usePieces = () => {
	const boardState = useBoardState();

	if (!boardState) {
		return {};
	}

	return boardState.pieces;
};

export const usePiecePositions = () => {
	const boardState = useBoardState();

	if (!boardState) {
		return {};
	}

	return boardState.piecePositions;
};

export function useTileBackgroundRenderer() {
	const context = useBoard();

	return context.tileBackgroundRenderer ?? null;
}
