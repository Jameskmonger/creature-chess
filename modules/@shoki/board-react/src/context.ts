import { createContext, useContext } from "react";

import { BoardSelectors, BoardState } from "@shoki/board";

type BoardContextValue = {
	state: BoardState;
	ui: {
		scaleMode: "width" | "height";
	};
};

const BoardContext = createContext<BoardContextValue>(null!);
BoardContext.displayName = "BoardContext";

export const BoardContextProvider = BoardContext.Provider;

const useBoard = () => useContext(BoardContext);
export const useBoardState = () => useBoard().state;
export const useScaleMode = () => useBoard().ui.scaleMode;

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
