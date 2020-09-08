import { Reducer } from "redux";
import { BoardAction } from "../actions/boardActions";
import { LOCK_BOARD, UNLOCK_BOARD } from "../actions/boardActionTypes";

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
