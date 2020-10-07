import { Reducer } from "redux";
import { BenchCommand, LOCK_BENCH_COMMAND, UNLOCK_BENCH_COMMAND } from "../commands";

type LockedState = boolean;

const initialState: LockedState = false;

const locked: Reducer<LockedState, BenchCommand> = (state = initialState, command) => {
  switch (command.type) {
    case LOCK_BENCH_COMMAND:
      return true;
    case UNLOCK_BENCH_COMMAND:
      return false;
    default:
      return state;
  }
};

export { LockedState, locked };
