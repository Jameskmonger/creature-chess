import { createStore, combineReducers, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
import { fork, all } from "@redux-saga/core/effects";

import { boardReducer } from "@common/board";
import { benchReducer } from "../../player/bench";
import { PieceModel } from "@common/models";
import { lockBench, unlockBench, addBenchPiece, removeBenchPiece, initialiseBench } from "@common/player/bench/benchActions";
import { evolutionSagaFactory } from "@common/player/sagas/evolution";

import { PlayerPiecesState } from "@common/player";
import { PlayerAction } from "@common/player/actions";
import { dropPiece } from "@common/player/sagas/dropPiece";
import { removeBoardPiece, initialiseBoard } from "@common/board/actions/boardActions";

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
