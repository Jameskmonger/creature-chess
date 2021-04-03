import { combineReducers } from "redux";
import { IndexedPieces } from "@creature-chess/models";
import { pieces } from "./reducers/piecesReducer";
import { piecePositions } from "./reducers/piecePositionsReducer";
import { locked } from "./reducers/lockedReducer";
import { pieceLimit } from "./reducers/pieceLimitReducer";

type BoardState = {
  pieces: IndexedPieces,
  piecePositions: {
    [key: string]: string
  },
  locked: boolean,
  pieceLimit: number | null
};

const reducer = combineReducers<BoardState>({
  pieces,
  piecePositions,
  locked,
  pieceLimit
});

export { BoardState, reducer };
