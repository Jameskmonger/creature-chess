import { combineReducers } from "redux";
import { PieceModel } from "../models";

import { pieces } from "./reducers/piecesReducer";
import { piecePositions } from "./reducers/piecePositionsReducer";
import { locked } from "./reducers/lockedReducer";

type BoardState = {
  pieces: {
    [key: string]: PieceModel
  },
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
