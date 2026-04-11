import { createContext, useContext } from "react";

import { SubscribableBoard } from "@creature-chess/board";
import { PieceRegistry } from "@creature-chess/utils";

export type GameBoardContext = {
	board: SubscribableBoard;
	bench: SubscribableBoard;
	pieceRegistry: PieceRegistry;
};

const GameBoardContext = createContext<GameBoardContext>(
	null as unknown as GameBoardContext
);
GameBoardContext.displayName = "GameBoardContext";

export const GameBoardContextProvider = GameBoardContext.Provider;

export const useGameBoard = () => {
	const GameBoard = useContext(GameBoardContext);

	if (!GameBoard) {
		throw new Error("No valid GameBoardContext found for useGameBoard");
	}

	return GameBoard;
};
