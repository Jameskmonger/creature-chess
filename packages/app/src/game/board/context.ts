import { BoardState } from "@creature-chess/shared"
import { createContext, useContext } from "react"

const BoardContext = createContext<BoardState>(null);
BoardContext.displayName = "BoardContext";

export const BoardContextProvider = BoardContext.Provider;
export const useBoard = () => useContext(BoardContext);

export const useBelowPieceLimit = () => {
    const { pieces, pieceLimit } = useContext(BoardContext);

    if (pieceLimit === null) {
        return false;
    }

    return Object.values(pieces).length < pieceLimit;
};
