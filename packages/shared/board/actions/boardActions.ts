import { PieceModel } from "@creature-chess/models";
import {
    INITIALISE_BOARD,
    REMOVE_BOARD_PIECE,
    ADD_BOARD_PIECE,
    UPDATE_BOARD_PIECE,
    UPDATE_BOARD_PIECES,
    LOCK_BOARD,
    UNLOCK_BOARD,
    MOVE_BOARD_PIECE,
    REMOVE_BOARD_PIECES
} from "./boardActionTypes";
import { TileCoordinates } from "@creature-chess/models/src/position";
import { IndexedPieces } from "@creature-chess/models/src/piece";

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
