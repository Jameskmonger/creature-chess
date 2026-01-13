import React, { createContext, useContext } from "react";

import { PackedPosition, SubscribableBoard } from "@creature-chess/board";
import { useBoardSubscription } from "./useBoard";

export type BoardContextValue = {
	state: SubscribableBoard;

	tileBackgroundRenderer?: (position: PackedPosition) => React.ReactNode;
};

const BoardContext = createContext<BoardContextValue>(null!);
BoardContext.displayName = "BoardContext";

export const BoardContextProvider = BoardContext.Provider;

const useBoard = () => useContext(BoardContext);
export const useBoardState = () => useBoardSubscription(useBoard().state);

export function useTileBackgroundRenderer() {
	const context = useBoard();

	return context.tileBackgroundRenderer ?? null;
}
