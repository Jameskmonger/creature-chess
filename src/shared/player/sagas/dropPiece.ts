import { takeEvery, select, put } from "@redux-saga/core/effects";
import { PLAYER_DROP_PIECE } from "../actionTypes";
import { PlayerPiecesState } from "../state";
import { PlayerDropPieceAction } from "../actions";
import { BenchState } from "../bench";
import { BoardState } from "@common/board";
import { PlayerPieceLocation } from "@common/models";
import * as pieceSelectors from "../pieceSelectors";
import { moveBoardPiece, removeBoardPiece, addBoardPiece } from "@common/board/actions/boardActions";
import { moveBenchPiece, addBenchPiece, removeBenchPiece } from "../bench/benchActions";

const findPiece = (state: PlayerPiecesState, location: PlayerPieceLocation) => {
  if (location.type === "board") {
    const { x, y } = location.location;

    return pieceSelectors.getBoardPieceForPosition(state, x, y);
  }

  if (location.type === "bench") {
    const { slot } = location.location;

    return pieceSelectors.getBenchPieceForSlot(state, slot);
  }

  return null;
};

const isLocationLocked = (state: PlayerPiecesState, location: PlayerPieceLocation) => {
  if (location.type === "board") {
    return state.board.locked;
  }

  if (location.type === "bench") {
    return state.bench.locked;
  }

  return true;
};

export const dropPiece = function*() {
  yield takeEvery<PlayerDropPieceAction>(
    PLAYER_DROP_PIECE,
    function*({ payload: { from, pieceId, to } }) {
      const state: PlayerPiecesState = yield select();

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

      if (from.type === "board" && to.type === "board") {
        yield put(moveBoardPiece(pieceId, from.location, to.location));
      } else if (from.type !== "board" && to.type !== "board") {
        yield put(moveBenchPiece(pieceId, from.location, to.location));
      } else if (from.type === "board" && to.type !== "board") {
        yield put(removeBoardPiece(pieceId));
        yield put(addBenchPiece(fromPiece, to.location.slot));
      } else if (from.type !== "board" && to.type === "board") {
        yield put(removeBenchPiece(pieceId));
        yield put(addBoardPiece(fromPiece, to.location.x, to.location.y));
      }
    }
  );
};
