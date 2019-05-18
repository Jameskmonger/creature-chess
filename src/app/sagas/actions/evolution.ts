import { takeEvery, select, put } from "@redux-saga/core/effects";
import { BenchActions, BenchActionTypes, BoardActions, getFirstEmptyBenchSlot } from "@common/board";
import { AppState } from "../../store/store";
import { getPokemonDefinition, getRequiredQuantityToEvolve } from "@common";
import { createPiece } from "@common/piece-utils";

export const evolution = function*() {
    yield takeEvery<BenchActions.BenchPieceAddedAction>(
        BenchActionTypes.BENCH_PIECE_ADDED,
        function*(action) {
            const piece = action.payload.piece;

            const state: AppState = yield select();

            const { evolvedFormId } = getPokemonDefinition(piece.pokemonId);

            if (!evolvedFormId) {
                return;
            }

            const localBoard = state.board.filter(p => p.ownerId === state.localPlayer.id);

            const benchOthers = state.bench.filter(p => p.pokemonId !== piece.pokemonId);
            const boardOthers = localBoard.filter(p => p.pokemonId !== piece.pokemonId);

            const totalInstances = (state.bench.length - benchOthers.length) + (localBoard.length - boardOthers.length);

            if (totalInstances < getRequiredQuantityToEvolve(piece.pokemonId)) {
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
