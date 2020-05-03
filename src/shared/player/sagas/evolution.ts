import { BenchState } from "../bench";
import { BoardState } from "@common/board";
import { takeLatest, all, select, take, delay, put } from "@redux-saga/core/effects";
import { AddBenchPieceAction, addBenchPiece, removeBenchPiece, removeBenchPieces } from "../bench/benchActions";
import { ADD_BENCH_PIECE } from "../bench/benchActionTypes";
import { DefinitionProvider } from "@common/game/definitionProvider";
import { PieceModel } from "@common/models";
import { PIECES_TO_EVOLVE } from "@common/models/constants";
import { UNLOCK_BOARD } from "@common/board/actions/boardActionTypes";
import * as pieceSelectors from "../pieceSelectors";
import { removeBoardPieces, updateBoardPiece } from "@common/board/actions/boardActions";

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

                    const getCombinablePieces = (pieces: PieceModel[]) => pieces.filter(p => p.id !== piece.id && p.stage === piece.stage);

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

                    if (matchingBoardPieces.length > 0) {
                        // replace a board piece if it exists
                        const pieceToReplace = matchingBoardPieces.pop();

                        // remove any remaining board pieces
                        const boardPieceIds = matchingBoardPieces.map(p => p.id);
                        yield put(removeBoardPieces(boardPieceIds));

                        const benchPieceIds = matchingBenchPieces.map(p => p.id);
                        yield put(removeBenchPieces([ ...benchPieceIds, piece.id ]));

                        const newPiece = {
                            ...pieceToReplace,
                            stage: nextStageIndex
                        };

                        yield put(updateBoardPiece(newPiece));
                    } else {
                        // otherwise replace the just-added bench piece
                        const benchPieceIds = matchingBenchPieces.map(p => p.id);
                        yield put(removeBenchPieces(benchPieceIds));

                        const newPiece = {
                            ...piece,
                            stage: nextStageIndex
                        };

                        // todo make updateBenchPiece action
                        yield put(removeBenchPiece(piece.id));
                        yield put(addBenchPiece(newPiece, null));
                    }
                }
            )
        ]);
    };

};
