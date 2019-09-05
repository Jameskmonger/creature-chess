import { BEGIN_DRAG_BENCH_PIECE, BEGIN_DRAG_BOARD_PIECE } from '../actiontypes/boardActionTypes';

export type BeginDragBenchPieceAction = ({ type: BEGIN_DRAG_BENCH_PIECE });
export type BeginDragBoardPieceAction = ({ type: BEGIN_DRAG_BOARD_PIECE });
export type BeginDragPieceAction = BeginDragBenchPieceAction | BeginDragBoardPieceAction;

export const beginDragBenchPiece = (): BeginDragBenchPieceAction => ({ type: BEGIN_DRAG_BENCH_PIECE });
export const beginDragBoardPiece = (): BeginDragBoardPieceAction => ({ type: BEGIN_DRAG_BOARD_PIECE });