import { createContext, useContext } from "react";


import { Board } from "@creature-chess/board";
import { PieceRegistry } from "@creature-chess/utils/piece";

export type GameBoardContext = {
	board: Board;
	bench: Board;
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
