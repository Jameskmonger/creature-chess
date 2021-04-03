import { BoardState } from "@creature-chess/shared"
import { createContext, useContext } from "react"

const BoardContext = createContext<BoardState>(null);
BoardContext.displayName = "BoardContext";

export const BoardContextProvider = BoardContext.Provider;
export const useBoard = () => useContext(BoardContext);
