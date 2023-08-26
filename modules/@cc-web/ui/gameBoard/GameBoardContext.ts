import { createContext, useContext } from "react";

import { BoardState } from "@shoki/board";

import { PieceModel } from "@creature-chess/models";

export type GameBoardContext = {
	board: BoardState<PieceModel>;
	bench: BoardState<PieceModel>;
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
