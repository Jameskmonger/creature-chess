import { PieceModel, TileCoordinates, IndexedPieces } from "@creature-chess/models";

export const REMOVE_BOARD_PIECE = "REMOVE_BOARD_PIECE";
export type REMOVE_BOARD_PIECE = typeof REMOVE_BOARD_PIECE;
export const REMOVE_BOARD_PIECES = "REMOVE_BOARD_PIECES";
export type REMOVE_BOARD_PIECES = typeof REMOVE_BOARD_PIECES;
export const ADD_BOARD_PIECE = "ADD_BOARD_PIECE";
export type ADD_BOARD_PIECE = typeof ADD_BOARD_PIECE;
export const INITIALISE_BOARD = "INITIALISE_BOARD";
export type INITIALISE_BOARD = typeof INITIALISE_BOARD;
export const UPDATE_BOARD_PIECE = "UPDATE_BOARD_PIECE";
export type UPDATE_BOARD_PIECE = typeof UPDATE_BOARD_PIECE;
export const UPDATE_BOARD_PIECES = "UPDATE_BOARD_PIECES";
export type UPDATE_BOARD_PIECES = typeof UPDATE_BOARD_PIECES;
export const MOVE_BOARD_PIECE = "MOVE_BOARD_PIECE";
export type MOVE_BOARD_PIECE = typeof MOVE_BOARD_PIECE;
export const LOCK_BOARD = "LOCK_BOARD";
export type LOCK_BOARD = typeof LOCK_BOARD;
export const UNLOCK_BOARD = "UNLOCK_BOARD";
export type UNLOCK_BOARD = typeof UNLOCK_BOARD;

export type InitialiseBoardAction = ({ type: INITIALISE_BOARD, payload: { pieces: IndexedPieces } });
type AddBoardPieceAction = ({ type: ADD_BOARD_PIECE, payload: { piece: PieceModel, x: number, y: number } });
type RemoveBoardPieceAction = ({ type: REMOVE_BOARD_PIECE, payload: { pieceId: string } });
type RemoveBoardPiecesAction = ({ type: REMOVE_BOARD_PIECES, payload: { pieceIds: string[] } });
export type UpdateBoardPieceAction = ({ type: UPDATE_BOARD_PIECE, payload: { piece: PieceModel } });
export type UpdateBoardPiecesAction = ({ type: UPDATE_BOARD_PIECES, payload: { pieces: PieceModel[] } });
type MoveBoardPieceAction = ({ type: MOVE_BOARD_PIECE, payload: { pieceId: string, from: TileCoordinates, to: TileCoordinates } });
type LockBoardAction = ({ type: LOCK_BOARD });
type UnlockBoardAction = ({ type: UNLOCK_BOARD });

export type BoardAction =
    InitialiseBoardAction
    | AddBoardPieceAction
    | RemoveBoardPieceAction
    | RemoveBoardPiecesAction
    | UpdateBoardPieceAction
    | UpdateBoardPiecesAction
    | MoveBoardPieceAction
    | LockBoardAction
    | UnlockBoardAction;

export const initialiseBoard = (pieces: IndexedPieces): InitialiseBoardAction => ({
    type: INITIALISE_BOARD,
    payload: {
        pieces
    }
});

export const addBoardPiece = (piece: PieceModel, x: number, y: number): AddBoardPieceAction => ({
    type: ADD_BOARD_PIECE,
    payload: {
        piece,
        x,
        y
    }
});

export const removeBoardPiece = (pieceId: string): RemoveBoardPieceAction => ({
    type: REMOVE_BOARD_PIECE,
    payload: {
        pieceId
    }
});

export const removeBoardPieces = (pieceIds: string[]): RemoveBoardPiecesAction => ({
    type: REMOVE_BOARD_PIECES,
    payload: {
        pieceIds
    }
});

export const updateBoardPiece = (piece: PieceModel): UpdateBoardPieceAction => ({
    type: UPDATE_BOARD_PIECE,
    payload: {
        piece
    }
});

export const updateBoardPieces = (pieces: PieceModel[]): UpdateBoardPiecesAction => ({
    type: UPDATE_BOARD_PIECES,
    payload: {
        pieces
    }
});

export const moveBoardPiece = (pieceId: string, from: TileCoordinates, to: TileCoordinates): MoveBoardPieceAction => ({
    type: MOVE_BOARD_PIECE,
    payload: {
        pieceId,
        from,
        to
    }
});

export const lockBoard = (): LockBoardAction => ({ type: LOCK_BOARD });

export const unlockBoard = (): UnlockBoardAction => ({ type: UNLOCK_BOARD });
