import { takeLatest, select, take, delay, put } from "@redux-saga/core/effects";
import { PieceModel, PIECES_TO_EVOLVE } from "@creature-chess/models";
import { BenchState } from "../bench";
import { BoardState } from "../../../board";
import { AddBenchPieceCommand, addBenchPieceCommand, removeBenchPieceCommand, removeBenchPiecesCommand, ADD_BENCH_PIECE_COMMAND } from "../bench/commands";
import { DefinitionProvider } from "../../definitions/definitionProvider";
import { BoardCommands } from "../../../board";
import * as pieceSelectors from "../pieceSelectors";
import { removeBoardPieces, updateBoardPiece, UpdateBoardPieceCommand } from "../../../board/commands";

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
        yield takeLatest<AddBenchPieceCommand | UpdateBoardPieceCommand>(
            // need to check when bench/board pieces are added (could have come from shop)
            // or when board piece is updated (could be due to a previous evolution)
            [ADD_BENCH_PIECE_COMMAND, BoardCommands.ADD_BOARD_PIECE_COMMAND, BoardCommands.UPDATE_BOARD_PIECE_COMMAND],
            function*({ payload: { piece } }) {
                if (!pieceCanEvolve(piece)) {
                    return;
                }

                const boardLocked: boolean = yield select((s: TState) => s.board.locked);

                // if evolution is locked, wait for it to be unlocked
                if (boardLocked) {
                    // todo check if we have 3 evolvable pieces on the bench and evolve those? maybe

                    yield take(BoardCommands.UNLOCK_BOARD_COMMAND);
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
                    yield put(removeBenchPiecesCommand([...benchPieceIds, piece.id]));

                    const newPiece = {
                        ...pieceToReplace,
                        stage: targetStage + 1
                    };

                    yield put(updateBoardPiece(newPiece));
                } else {
                    // otherwise replace the just-added bench piece
                    const benchPieceIds = matchingBenchPieces.map(p => p.id);
                    yield put(removeBenchPiecesCommand(benchPieceIds));

                    const newPiece = {
                        ...piece,
                        stage: targetStage + 1
                    };

                    // todo make updateBenchPiece action
                    yield put(removeBenchPieceCommand(piece.id));
                    yield put(addBenchPieceCommand(newPiece, null));
                }
            }
        );
    };

};
