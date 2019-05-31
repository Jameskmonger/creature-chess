import { takeEvery, select, put } from "@redux-saga/core/effects";
import { BenchActions, BenchActionTypes, BoardActions, getFirstEmptyBenchSlot } from "@common/board";
import { AppState } from "../../store/store";
import { PIECES_TO_EVOLVE } from "@common/constants";
import { Piece } from "@common/models";
import { DefinitionProvider } from "@common/game/definitionProvider";
import { createTileCoordinates } from "@common/position";

const definitionProvider = new DefinitionProvider();

export const evolution = function*() {
    yield takeEvery<BenchActions.BenchPieceAddedAction>(
        BenchActionTypes.BENCH_PIECE_ADDED,
        function*(action) {
            const piece = action.payload.piece;

            const state: AppState = yield select();

            const { stages } = definitionProvider.get(piece.definitionId);

            const nextStageIndex = piece.stage + 1;
            const nextStage = stages[nextStageIndex];

            if (!nextStage) {
                return;
            }

            const pieceIsMatching = (p: Piece) => p.id !== piece.id && p.definitionId === piece.definitionId;
            const getMatchingPieces = (pieces: Piece[]) => pieces.filter(pieceIsMatching);

            const matchingBoardPieces = getMatchingPieces(state.board);
            const matchingBenchPieces = getMatchingPieces(state.bench);

            const totalInstances = matchingBoardPieces.length + matchingBenchPieces.length + 1;

            if (totalInstances < PIECES_TO_EVOLVE) {
                return;
            }

            const newBoard = state.board.filter(p => p.id !== piece.id && p.definitionId !== piece.definitionId);
            const newBench = state.bench.filter(p => p.id !== piece.id && p.definitionId !== piece.definitionId);

            const slot = getFirstEmptyBenchSlot(newBench);

            const newPiece = {
                ...piece,
                stage: nextStageIndex,
                position: createTileCoordinates(slot, null)
            };

            yield put(BoardActions.piecesUpdated(newBoard));
            yield put(BenchActions.benchPiecesUpdated(newBench));
            yield put(BenchActions.benchPieceAdded(newPiece));
        }
    );
};
