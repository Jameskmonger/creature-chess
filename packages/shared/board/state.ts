import { combineReducers } from "redux";
import { pieces } from "./reducers/piecesReducer";
import { piecePositions } from "./reducers/piecePositionsReducer";
import { locked } from "./reducers/lockedReducer";
import { IndexedPieces } from "@creature-chess/models/src/piece";

type BoardState = {
  pieces: IndexedPieces,
  piecePositions: {
    [key: string]: string
  },
  locked: boolean
};

const reducer = combineReducers<BoardState>({
  pieces,
  piecePositions,
  locked
});

export { BoardState, reducer };