import { takeEvery, select, put } from "@redux-saga/core/effects";
import { PieceModel } from "@creature-chess/models";
import { getPiece } from "../../pieceSelectors";
import { PlayerState } from "../../store";
import { PlayerSellPieceAction, PLAYER_SELL_PIECE_ACTION } from "../../actions";
import { updateMoneyCommand } from "../../playerInfo/commands";
import { BoardSlice } from "@creature-chess/board";
import { afterSellPieceEvent } from "../../events";

export const PIECES_FOR_STAGE = [1, 3, 9];

export const sellPiecePlayerActionSagaFactory = <TState extends PlayerState>(
  { boardSlice, benchSlice }: { boardSlice: BoardSlice, benchSlice: BoardSlice }
) => {
  return function*() {
    yield takeEvery<PlayerSellPieceAction>(
      PLAYER_SELL_PIECE_ACTION,
      function*({ payload: { pieceId } }) {
        const piece: PieceModel = yield select((state: TState) => getPiece(state, pieceId));

        if (!piece) {
          // console.log(`Attempted to sell piece with id ${pieceId} but did not own it`);
          return;
        }

        const piecesUsed = PIECES_FOR_STAGE[piece.stage];
        const pieceCost = piece.definition.cost;
        const currentMoney: number = yield select((state: TState) => state.playerInfo.money);

        yield put(updateMoneyCommand(currentMoney + (pieceCost * piecesUsed)));

        yield put(benchSlice.commands.removeBoardPiecesCommand([pieceId]));
        yield put(boardSlice.commands.removeBoardPiecesCommand([pieceId]));

        yield put(afterSellPieceEvent(piece));
      }
    );
  };
};
