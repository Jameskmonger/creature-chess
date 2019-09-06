import { BEGIN_DRAG_BENCH_PIECE, BEGIN_DRAG_BOARD_PIECE, SELECT_PIECE } from '../actiontypes/boardActionTypes';
import { Models } from '@common';

export type BeginDragBenchPieceAction = ({ type: BEGIN_DRAG_BENCH_PIECE });
export type BeginDragBoardPieceAction = ({ type: BEGIN_DRAG_BOARD_PIECE });
export type BeginDragPieceAction = BeginDragBenchPieceAction | BeginDragBoardPieceAction;

export type SelectPieceAction = ({ type: SELECT_PIECE, payload: { piece: Models.Piece } });

export const beginDragBenchPiece = (): BeginDragBenchPieceAction => ({ type: BEGIN_DRAG_BENCH_PIECE });
export const beginDragBoardPiece = (): BeginDragBoardPieceAction => ({ type: BEGIN_DRAG_BOARD_PIECE });
export const selectPiece = (piece: Models.Piece): SelectPieceAction => ({
    type: SELECT_PIECE,
    payload: {
        piece
    }
});