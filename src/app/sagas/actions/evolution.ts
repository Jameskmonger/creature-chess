import { takeEvery, select, put } from "@redux-saga/core/effects";
import { BenchActions, BenchActionTypes, BoardActions, getFirstEmptyBenchSlot } from "@common/board";
import { AppState } from "../../store/store";
import { getDefinition, getRequiredQuantityToEvolve } from "@common/models/creatureDefinition";
import { createPiece } from "@common/piece-utils";

export const evolution = function*() {
    yield takeEvery<BenchActions.BenchPieceAddedAction>(
        BenchActionTypes.BENCH_PIECE_ADDED,
        function*(action) {
            const piece = action.payload.piece;

            const state: AppState = yield select();

            const { evolvedFormId } = getDefinition(piece.definitionId);

            if (!evolvedFormId) {
                return;
            }

            const localBoard = state.board.filter(p => p.ownerId === state.localPlayer.id);

            const benchOthers = state.bench.filter(p => p.definitionId !== piece.definitionId);
            const boardOthers = localBoard.filter(p => p.definitionId !== piece.definitionId);

            const totalInstances = (state.bench.length - benchOthers.length) + (localBoard.length - boardOthers.length);

            if (totalInstances < getRequiredQuantityToEvolve(piece.definitionId)) {
                return;
            }

            yield put(BoardActions.piecesUpdated(boardOthers));
            yield put(BenchActions.benchPiecesUpdated(benchOthers));

            const slot = getFirstEmptyBenchSlot(benchOthers);

            const newPiece = createPiece(state.localPlayer.id, evolvedFormId, [slot, null], piece.id);
            yield put(BenchActions.benchPieceAdded(newPiece));
        }
    );
};
