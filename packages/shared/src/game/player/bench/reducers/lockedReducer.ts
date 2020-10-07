import { Reducer } from "redux";
import { BenchAction, LOCK_BENCH, UNLOCK_BENCH } from "../actions";

type LockedState = boolean;

const initialState: LockedState = false;

const locked: Reducer<LockedState, BenchAction> = (state = initialState, action) => {
  switch (action.type) {
    case LOCK_BENCH:
      return true;
    case UNLOCK_BENCH:
      return false;
    default:
      return state;
  }
};

export { LockedState, locked };