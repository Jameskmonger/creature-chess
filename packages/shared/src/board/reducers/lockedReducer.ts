import { Reducer } from "redux";
import { BoardAction, LOCK_BOARD, UNLOCK_BOARD } from "../actions";

type LockedState = boolean;

const initialState: LockedState = false;

const locked: Reducer<LockedState, BoardAction> = (state = initialState, action) => {
  switch (action.type) {
    case LOCK_BOARD:
      return true;
    case UNLOCK_BOARD:
      return false;
    default:
      return state;
  }
};

export { LockedState, locked };
