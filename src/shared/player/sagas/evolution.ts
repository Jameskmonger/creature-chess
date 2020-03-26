import { BenchState } from "../bench";
import { BoardState, BoardActions } from "@common/board";
import { takeLatest, all, select, take, delay, put } from "@redux-saga/core/effects";
import { AddBenchPieceAction, addBenchPiece, removeBenchPiece } from "../bench/benchActions";
import { ADD_BENCH_PIECE, UNLOCK_BENCH } from "../bench/benchActionTypes";
import { DefinitionProvider } from "@common/game/definitionProvider";
import { Piece } from "@common/models";
import { PIECES_TO_EVOLVE } from "@common/models/constants";
import { UNLOCK_BOARD } from "@common/board/actions/boardActionTypes";
import * as pieceSelectors from "../pieceSelectors";
import { removeBoardPiece } from "@common/board/actions/boardActions";

const definitionProvider = new DefinitionProvider();

interface State {
    bench: BenchState;
    board: BoardState;
}

export const evolutionSagaFactory = <TState extends State>() => {
    return function*() {
        yield all([
            yield takeLatest<AddBenchPieceAction>(
                ADD_BENCH_PIECE,
                function*({ payload: { piece } }) {
                    const { stages } = definitionProvider.get(piece.definitionId);

                    const nextStageIndex = piece.stage + 1;
                    const nextStage = stages[nextStageIndex];

                    if (!nextStage) {
                        return;
                    }

                    const boardLocked: boolean = yield select((s: TState) => s.board.locked);

                    // if evolution is locked, wait for it to be unlocked
                    if (boardLocked) {
                        yield take(UNLOCK_BOARD);
                        yield delay(500);
                    }

                    const getCombinablePieces = (pieces: Piece[]) => pieces.filter(p => p.id !== piece.id && p.stage === piece.stage);

                    const state: TState = yield select();

                    const matchingBoardPieces = getCombinablePieces(
                        pieceSelectors.getBoardPiecesForDefinition(state, piece.definitionId)
                    );
                    const matchingBenchPieces = getCombinablePieces(
                        pieceSelectors.getBenchPiecesForDefinition(state, piece.definitionId)
                    );

                    const totalInstances = matchingBoardPieces.length + matchingBenchPieces.length + 1;

                    if (totalInstances < PIECES_TO_EVOLVE) {
                        return;
                    }

                    const boardPieceIds = matchingBoardPieces.map(p => p.id);
                    const benchPieceIds = matchingBenchPieces.map(p => p.id);

                    for (const pieceId of boardPieceIds) {
                        // make a single action here removeBoardPieces(boardPieceIds)
                        yield put(removeBoardPiece(pieceId));
                    }

                    for (const pieceId of benchPieceIds) {
                        // make a single action here removeBenchPiece(benchPieceIds)
                        yield put(removeBenchPiece(pieceId));
                    }

                    const newPiece = {
                        ...piece,
                        stage: nextStageIndex
                    };

                    // todo make updateBenchPiece action
                    yield put(removeBenchPiece(piece.id));
                    yield put(addBenchPiece(newPiece, null));
                }
            )
        ]);
    };

};
