import { BoardState } from "@common/board";
import { BenchState } from "./bench";

export interface PlayerState {
  board: BoardState;
  bench: BenchState;
}
