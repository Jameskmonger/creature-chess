import { PieceModel } from "../../models";
import { lockBench, unlockBench, addBenchPiece, removeBenchPiece, initialiseBench } from "../../player/bench/benchActions";

import { PlayerAction } from "../../player/actions";
import { removeBoardPiece, initialiseBoard } from "../../board/actions/boardActions";
import { PlayerStore } from "../../player/store";

export class PlayerPieces {
  constructor(private store: PlayerStore) {

  }

  public addBenchPiece(piece: PieceModel) {
    this.store.dispatch(addBenchPiece(piece, null));
  }

  public removePiece(pieceId: string) {
    this.store.dispatch(removeBenchPiece(pieceId));
    this.store.dispatch(removeBoardPiece(pieceId));
  }

  public clear() {
    this.store.dispatch(initialiseBoard({}));

    // todo this is ugly
    this.store.dispatch(initialiseBench({
      pieces: [],
      locked: this.store.getState().bench.locked
    }));
  }

  public unlockEvolutions() {
    this.store.dispatch(unlockBench());
  }

  public lockEvolutions() {
    this.store.dispatch(lockBench());
  }

  public dispatchAction(action: PlayerAction) {
    this.store.dispatch(action);
  }

  public dispatchActions(actions: PlayerAction[]) {
    for (const action of actions) {
      this.store.dispatch(action);
    }
  }
}
