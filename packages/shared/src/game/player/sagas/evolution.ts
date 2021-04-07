import { takeLatest, select, take, delay, put } from "@redux-saga/core/effects";
import { PieceModel, PIECES_TO_EVOLVE } from "@creature-chess/models";
import { BoardState } from "../../../board";
import { DefinitionProvider } from "../../definitions/definitionProvider";
import { BoardSelectors } from "../../../board";
import * as pieceSelectors from "../pieceSelectors";
import { BoardSlice } from "../../../board";

const definitionProvider = new DefinitionProvider();

interface State {
    bench: BoardState;
    board: BoardState;
}

const pieceCanEvolve = (piece: PieceModel) => {
    const { stages } = definitionProvider.get(piece.definitionId);

    return piece.stage < stages.length - 1;
};

export const evolutionSagaFactory = <TState extends State>({ boardSlice, benchSlice }: { boardSlice: BoardSlice, benchSlice: BoardSlice }) => {
    return function*() {
        yield takeLatest<
            ReturnType<typeof boardSlice.commands.addBoardPieceCommand>
            | ReturnType<typeof benchSlice.commands.addBoardPieceCommand>
        >(
            // need to check when bench/board pieces are added (could have come from shop)
            // or when board piece is updated (could be due to a previous evolution)
            [boardSlice.commands.addBoardPieceCommand, benchSlice.commands.addBoardPieceCommand],
            function*({ payload: { piece } }) {
                if (!pieceCanEvolve(piece)) {
                    return;
                }

                const boardLocked: boolean = yield select((s: TState) => s.board.locked);

                // if evolution is locked, wait for it to be unlocked
                if (boardLocked) {
                    // todo check if we have 3 evolvable pieces on the bench and evolve those? maybe

                    yield take(boardSlice.commands.unlockBoardCommand);
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

                    const piecePosition = yield select((s: TState) => BoardSelectors.getPiecePosition(s.board, pieceToReplace.id));

                    // remove any remaining board pieces
                    const boardPieceIds = [...matchingBoardPieces, pieceToReplace].map(p => p.id);
                    yield put(boardSlice.commands.removeBoardPiecesCommand(boardPieceIds));

                    const benchPieceIds = matchingBenchPieces.map(p => p.id);
                    yield put(benchSlice.commands.removeBoardPiecesCommand([...benchPieceIds, piece.id]));

                    const newPiece = {
                        ...pieceToReplace,
                        stage: targetStage + 1
                    };

                    const {x, y} = piecePosition;

                    yield put(boardSlice.commands.addBoardPieceCommand({ x, y, piece: newPiece }));
                } else {
                    // otherwise replace the just-added bench piece
                    const benchPieceIds = matchingBenchPieces.map(p => p.id);

                    const newPiece = {
                        ...piece,
                        stage: targetStage + 1
                    };

                    const { x, y } = BoardSelectors.getPiecePosition(state.bench, piece.id);

                    yield put(benchSlice.commands.removeBoardPiecesCommand([...benchPieceIds, piece.id]));
                    yield put(benchSlice.commands.addBoardPieceCommand({ x, y, piece: newPiece }));
                }
            }
        );
    };

};
