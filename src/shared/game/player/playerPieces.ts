import { createStore, combineReducers, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
import { fork, all } from "@redux-saga/core/effects";

import { boardReducer, BoardState } from "@common/board";
import { benchReducer, BenchState } from "../../player/bench";
import { Piece, PlayerPieceLocation } from "@common/models";
import { lockBench, unlockBench, addBenchPiece } from "@common/player/bench/benchActions";
import { evolutionSagaFactory } from "@common/player/sagas/evolution";

import { PlayerPiecesState } from "@common/player";
import { playerDropPiece } from "@common/player/actions";
import { dropPiece } from "@common/player/sagas/dropPiece";

const createBoardStore = () => {
  const rootSaga = function*() {
    yield all([
      yield fork(evolutionSagaFactory<PlayerPiecesState>()),
      yield fork(dropPiece)
    ]);
  };

  const sagaMiddleware = createSagaMiddleware();

  const store = createStore(
    combineReducers<PlayerPiecesState>({
      board: boardReducer,
      bench: benchReducer
    }),
    applyMiddleware(sagaMiddleware)
  );

  sagaMiddleware.run(rootSaga);

  return store;
};

export class PlayerPieces {
  private store = createBoardStore();

  public getState(): PlayerPiecesState {
    return this.store.getState();
  }

  public addBenchPiece(piece: Piece) {
    this.store.dispatch(addBenchPiece(piece, null));
  }

  public removePiece(pieceId: string) {
    //
  }

  public clear() {
    //
  }

  public unlockEvolutions() {
    this.store.dispatch(unlockBench());
  }

  public lockEvolutions() {
    this.store.dispatch(lockBench());
  }

  public applyDamagePerTurn(template: Piece[]) {
    //
  }

  public playerDropPiece(pieceId: string, from: PlayerPieceLocation, to: PlayerPieceLocation) {
    this.store.dispatch(playerDropPiece(pieceId, from, to));
  }
}
