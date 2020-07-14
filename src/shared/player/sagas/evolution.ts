import { BenchState } from "../bench";
import { BoardState } from "@common/board";
import { takeLatest, all, select, take, delay, put } from "@redux-saga/core/effects";
import { AddBenchPieceAction, addBenchPiece, removeBenchPiece, removeBenchPieces } from "../bench/benchActions";
import { ADD_BENCH_PIECE } from "../bench/benchActionTypes";
import { DefinitionProvider } from "@common/game/definitionProvider";
import { PieceModel } from "@common/models";
import { PIECES_TO_EVOLVE } from "@common/models/constants";
import { UNLOCK_BOARD, UPDATE_BOARD_PIECE } from "@common/board/actions/boardActionTypes";
import * as pieceSelectors from "../pieceSelectors";
import { removeBoardPieces, updateBoardPiece, UpdateBoardPieceAction } from "@common/board/actions/boardActions";

const definitionProvider = new DefinitionProvider();

interface State {
    bench: BenchState;
    board: BoardState;
}

const pieceCanEvolve = (piece: PieceModel) => {
    const { stages } = definitionProvider.get(piece.definitionId);

    return piece.stage < stages.length - 1;
};

export const evolutionSagaFactory = <TState extends State>() => {
    return function*() {
        yield takeLatest<AddBenchPieceAction | UpdateBoardPieceAction>(
            // need to check when bench pieces are added (could have come from shop)
            // or when board piece is updated (could be due to a previous evolution)
            [ADD_BENCH_PIECE, UPDATE_BOARD_PIECE],
            function*({ payload: { piece } }) {
                if (!pieceCanEvolve(piece)) {
                    return;
                }

                const boardLocked: boolean = yield select((s: TState) => s.board.locked);

                // if evolution is locked, wait for it to be unlocked
                if (boardLocked) {
                    // todo check if we have 3 evolvable pieces on the bench and evolve those? maybe

                    yield take(UNLOCK_BOARD);
                    yield delay(500);
                }

                const state: TState = yield select();

                const targetDefinitionId = piece.definitionId;
                const targetStage = piece.stage;

                const getCombinablePieces = (pieces: PieceModel[]) => pieces.filter(p => p.stage === targetStage);

                const matchingBoardPieces = getCombinablePieces(
                    pieceSelectors.getBoardPiecesForDefinition(state, targetDefinitionId)
                );
                const matchingBenchPieces = getCombinablePieces(
                    pieceSelectors.getBenchPiecesForDefinition(state, targetDefinitionId)
                );

                const totalInstances = matchingBoardPieces.length + matchingBenchPieces.length;

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
                    yield put(removeBenchPieces([...benchPieceIds, piece.id]));

                    const newPiece = {
                        ...pieceToReplace,
                        stage: targetStage + 1
                    };

                    yield put(updateBoardPiece(newPiece));
                } else {
                    // otherwise replace the just-added bench piece
                    const benchPieceIds = matchingBenchPieces.map(p => p.id);
                    yield put(removeBenchPieces(benchPieceIds));

                    const newPiece = {
                        ...piece,
                        stage: targetStage + 1
                    };

                    // todo make updateBenchPiece action
                    yield put(removeBenchPiece(piece.id));
                    yield put(addBenchPiece(newPiece, null));
                }
            }
        );
    };

};
