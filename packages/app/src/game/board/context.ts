import { BoardState } from "@creature-chess/shared"
import { createContext, useContext } from "react"

const BoardContext = createContext<BoardState>(null);
BoardContext.displayName = "BoardContext";

export const BoardContextProvider = BoardContext.Provider;
export const useBoard = () => useContext(BoardContext);

export const useBelowPieceLimit = () => {
    const board = useContext(BoardContext);

    if (!board) {
        return;
    }

    return board.pieceLimit === null || Object.values(board.pieces).length < board.pieceLimit;
};

export const usePieces = () => {
    const board = useContext(BoardContext);

    if (!board) {
        return null;
    }

    return board.pieces;
};

export const usePiecePositions = () => {
    const board = useContext(BoardContext);

    if (!board) {
        return null;
    }

    return board.piecePositions;
};
