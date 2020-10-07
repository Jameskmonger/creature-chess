import { takeEvery, select, put } from "@redux-saga/core/effects";
import { PieceModel } from "@creature-chess/models";
import { getPiece } from "../pieceSelectors";
import { getPiecesForStage } from "../../../utils";
import { PlayerState } from "../store";
import { PlayerSellPieceAction, PLAYER_SELL_PIECE } from "../actions";
import { moneyUpdateAction } from "../playerInfo/actions";
import { removeBenchPiece } from "../bench/actions";
import { BoardActions } from "../../../board";
import { afterSellPiece } from "../actions";

export const sellPiece = function*() {
  yield takeEvery<PlayerSellPieceAction>(
    PLAYER_SELL_PIECE,
    function*({ payload: { pieceId } }) {
      const piece: PieceModel = yield select((state: PlayerState) => getPiece(state, pieceId));

      if (!piece) {
        console.log(`Attempted to sell piece with id ${pieceId} but did not own it`);
        return;
      }

      // todo add money here also, remove immediate update packets from the server
      const piecesUsed = getPiecesForStage(piece.stage);
      const pieceCost = piece.definition.cost;
      const currentMoney: number = yield select((state: PlayerState) => state.playerInfo.money);

      yield put(moneyUpdateAction(currentMoney + (pieceCost * piecesUsed)));

      if (piece.position.y === null) {
        yield put(removeBenchPiece(pieceId));
      } else {
        yield put(BoardActions.removeBoardPiece(pieceId));
      }

      yield put(afterSellPiece(piece));
    }
  );
};