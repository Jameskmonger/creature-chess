import { Reducer } from "redux";
import { BoardCommand, LOCK_BOARD_COMMAND, UNLOCK_BOARD_COMMAND } from "../commands";

type LockedState = boolean;

const initialState: LockedState = false;

const locked: Reducer<LockedState, BoardCommand> = (state = initialState, command) => {
  switch (command.type) {
    case LOCK_BOARD_COMMAND:
      return true;
    case UNLOCK_BOARD_COMMAND:
      return false;
    default:
      return state;
  }
};

export { LockedState, locked };
