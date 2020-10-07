import { combineReducers } from "redux";
import { PieceModel } from "@creature-chess/models";

import { pieces } from "./reducers/piecesReducer";
import { locked } from "./reducers/lockedReducer";

type BenchState = {
  pieces: PieceModel[],
  locked: boolean
};

const reducer = combineReducers<BenchState>({
  pieces,
  locked
});

export { BenchState, reducer };
