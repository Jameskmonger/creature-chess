import { BoardState } from "@common/board";
import { BenchState } from "./bench";

export interface PlayerPiecesState {
  board: BoardState;
  bench: BenchState;
}
