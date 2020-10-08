import { takeEvery, select, put } from "@redux-saga/core/effects";
import { PieceModel } from "@creature-chess/models";
import { getPiece } from "../../pieceSelectors";
import { getPiecesForStage } from "../../../../utils";
import { PlayerState } from "../../store";
import { PlayerSellPieceAction, PLAYER_SELL_PIECE_ACTION } from "../../actions";
import { updateMoneyCommand } from "../../playerInfo/commands";
import { removeBenchPieceCommand } from "../../bench/commands";
import { BoardCommands } from "../../../../board";
import { afterSellPieceEvent } from "../../events";

export const sellPiecePlayerActionSagaFactory = <TState extends PlayerState>() => {
  return function*() {
    yield takeEvery<PlayerSellPieceAction>(
      PLAYER_SELL_PIECE_ACTION,
      function*({ payload: { pieceId } }) {
        const piece: PieceModel = yield select((state: TState) => getPiece(state, pieceId));

        if (!piece) {
          console.log(`Attempted to sell piece with id ${pieceId} but did not own it`);
          return;
        }

        // todo add money here also, remove immediate update packets from the server
        const piecesUsed = getPiecesForStage(piece.stage);
        const pieceCost = piece.definition.cost;
        const currentMoney: number = yield select((state: TState) => state.playerInfo.money);

        yield put(updateMoneyCommand(currentMoney + (pieceCost * piecesUsed)));

        if (piece.position.y === null) {
          yield put(removeBenchPieceCommand(pieceId));
        } else {
          yield put(BoardCommands.removeBoardPiece(pieceId));
        }

        yield put(afterSellPieceEvent(piece));
      }
    );
  };
};
