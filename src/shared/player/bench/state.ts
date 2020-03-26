import { combineReducers } from "redux";
import { Piece } from "@common/models";

import { pieces } from "./reducers/piecesReducer";
import { locked } from "./reducers/lockedReducer";

type BenchState = {
  pieces: Piece[],
  locked: boolean
};

const reducer = combineReducers<BenchState>({
  pieces,
  locked
});

export { BenchState, reducer };
