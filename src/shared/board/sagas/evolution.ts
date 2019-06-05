import { takeEvery, select, put, take } from "@redux-saga/core/effects";
import { getFirstEmptyBenchSlot } from "../get-first-empty-bench-slot";
import * as BoardActions from "../actions/boardActions";
import * as BenchActions from "../actions/benchActions";
import * as BenchActionTypes from "../actions/benchActionTypes";

import { PIECES_TO_EVOLVE } from "@common/constants";
import { Piece } from "@common/models";
import { DefinitionProvider } from "@common/game/definitionProvider";
import { createTileCoordinates } from "@common/position";
import { UNLOCK_EVOLUTIONS } from "../actions/evolutionLockedReducer";

const definitionProvider = new DefinitionProvider();

interface State {
    bench: Piece[];
    board: Piece[];
    evolutionLocked: boolean;
}

export const evolutionSagaFactory = <TState extends State>() => {
    return function*() {
        yield takeEvery<BenchActions.BenchPieceAddedAction>(
            BenchActionTypes.BENCH_PIECE_ADDED,
            function*(action) {
                const { evolutionLocked }: TState = yield select();

                // if evolution is locked, wait for it to be unlocked
                if (evolutionLocked) {
                    yield take(UNLOCK_EVOLUTIONS);
                }

                const piece = action.payload.piece;

                const { bench, board }: TState = yield select();

                const { stages } = definitionProvider.get(piece.definitionId);

                const nextStageIndex = piece.stage + 1;
                const nextStage = stages[nextStageIndex];

                if (!nextStage) {
                    return;
                }

                const pieceIsMatching = (p: Piece) => p.definitionId === piece.definitionId && p.stage === piece.stage;
                const getMatchingPieces = (pieces: Piece[]) => pieces.filter(p => p.id !== piece.id && pieceIsMatching(p));

                const matchingBoardPieces = getMatchingPieces(board);
                const matchingBenchPieces = getMatchingPieces(bench);

                const totalInstances = matchingBoardPieces.length + matchingBenchPieces.length + 1;

                if (totalInstances < PIECES_TO_EVOLVE) {
                    return;
                }

                const newBoard = board.filter(p => p.id !== piece.id && pieceIsMatching(p) === false);
                const newBench = bench.filter(p => p.id !== piece.id && pieceIsMatching(p) === false);

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

};
