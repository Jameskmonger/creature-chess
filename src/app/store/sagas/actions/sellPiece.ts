import { takeEvery, select, put } from "@redux-saga/core/effects";
import { PLAYER_SELL_PIECE } from "@common/player/actionTypes";
import { PlayerSellPieceAction } from "@common/player/actions";
import { AppState } from "@app/store/state";
import { getPiece } from "@common/player/pieceSelectors";
import { removeBenchPiece } from "@common/player/bench/benchActions";
import { removeBoardPiece } from "@common/board/actions/boardActions";

export const sellPiece = function*() {
  yield takeEvery<PlayerSellPieceAction>(
    PLAYER_SELL_PIECE,
    function*({ payload: { pieceId }}) {
      const state: AppState = yield select();

      const piece = getPiece(state, pieceId);

      if (!piece) {
        return;
      }

      // todo add money here also, remove immediate update packets from the server

      if (piece.position.y === null) {
        yield put(removeBenchPiece(pieceId));
      } else {
        yield put(removeBoardPiece(pieceId));
      }
    }
  );
};
