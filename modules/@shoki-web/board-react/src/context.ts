import React, { createContext, useContext } from "react";

import { PiecePosition } from "@shoki/board";
import { Board } from "@creature-chess/board";

export type BoardContextValue = {
	state: Board;

	tileBackgroundRenderer?: (position: PiecePosition) => React.ReactNode;
};

const BoardContext = createContext<BoardContextValue>(null!);
BoardContext.displayName = "BoardContext";

export const BoardContextProvider = BoardContext.Provider;

const useBoard = () => useContext(BoardContext);
export const useBoardState = () => useBoard().state;

export const useBelowPieceLimit = () => {
	// todo
	return true;
};

export function useTileBackgroundRenderer() {
	const context = useBoard();

	return context.tileBackgroundRenderer ?? null;
}
