import { takeEvery, select, put } from "@redux-saga/core/effects";
import { PlayerSellPieceAction, PLAYER_SELL_PIECE } from "@creature-chess/shared/player/actions";
import { AppState } from "../../../store/state";
import { getPiece } from "@creature-chess/shared/player/pieceSelectors";
import { removeBenchPiece } from "@creature-chess/shared/player/bench/benchActions";
import { removeBoardPiece } from "@creature-chess/shared/board/actions/boardActions";

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
