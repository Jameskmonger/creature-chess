import { takeEvery, select, put } from "@redux-saga/core/effects";
import { PlayerPieceLocation } from "@creature-chess/models";
import { PlayerDropPieceAction, PLAYER_DROP_PIECE } from "../actions";
import * as pieceSelectors from "../pieceSelectors";
import { BoardActions } from "../../../board";
import { moveBenchPiece, addBenchPiece, removeBenchPiece } from "../bench/actions";
import { PlayerState } from "../store";
import { getPlayerBelowPieceLimit } from "../playerSelectors";

const findPiece = (state: PlayerState, location: PlayerPieceLocation) => {
  if (location.type === "board") {
    const { x, y } = location.location;

    return pieceSelectors.getBoardPieceForPosition(state.board, x, y);
  }

  if (location.type === "bench") {
    const { slot } = location.location;

    return pieceSelectors.getBenchPieceForSlot(state, slot);
  }

  return null;
};

const isLocationLocked = (state: PlayerState, location: PlayerPieceLocation) => {
  if (location.type === "board") {
    return state.board.locked;
  }

  if (location.type === "bench") {
    return state.bench.locked;
  }

  return true;
};

export const dropPieceSagaFactory = <TState extends PlayerState>(playerId: string) => {
  return function*() {
    yield takeEvery<PlayerDropPieceAction>(
      PLAYER_DROP_PIECE,
      function*({ payload: { from, pieceId, to } }) {
        const state: TState = yield select();

        if (isLocationLocked(state, from) || isLocationLocked(state, to)) {
          // source or destination is locked
          return;
        }

        const fromPiece = findPiece(state, from);

        if (fromPiece === null || fromPiece.id !== pieceId) {
          // from piece not found or id wrong (position mismatch?)
          return;
        }

        const toPiece = findPiece(state, to);

        if (toPiece !== null) {
          // destination tile not empty
          return;
        }

        if (to.type === "board" && from.type !== "board") {
          const belowPieceLimit = getPlayerBelowPieceLimit(state, playerId);

          if (!belowPieceLimit) {
            return;
          }
        }

        if (from.type === "board" && to.type === "board") {
          yield put(BoardActions.moveBoardPiece(pieceId, from.location, to.location));
        } else if (from.type !== "board" && to.type !== "board") {
          yield put(moveBenchPiece(pieceId, from.location, to.location));
        } else if (from.type === "board" && to.type !== "board") {
          yield put(BoardActions.removeBoardPiece(pieceId));
          yield put(addBenchPiece(fromPiece, to.location.slot));
        } else if (from.type !== "board" && to.type === "board") {
          yield put(removeBenchPiece(pieceId));
          yield put(BoardActions.addBoardPiece(fromPiece, to.location.x, to.location.y));
        }
      }
    );
  };
};