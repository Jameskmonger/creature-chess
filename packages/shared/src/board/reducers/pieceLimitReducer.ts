import { Reducer } from "redux";
import { BoardCommand, LOCK_BOARD_COMMAND, SET_PIECE_LIMIT_COMMAND, UNLOCK_BOARD_COMMAND } from "../commands";

type PieceLimitState = number | null;

const initialState: PieceLimitState = null;

const pieceLimit: Reducer<PieceLimitState, BoardCommand> = (state = initialState, command) => {
  switch (command.type) {
    case SET_PIECE_LIMIT_COMMAND:
      return command.payload.limit;
    default:
      return state;
  }
};

export { PieceLimitState, pieceLimit };
