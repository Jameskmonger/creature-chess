import { Piece } from "@common/models";
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
import { BoardState } from "../../board/state";
import { XYLocation } from "@common/models/position";

type InitialiseBoardAction = ({ type: INITIALISE_BOARD, payload: { pieces: { [key: string]: Piece } } });
type AddBoardPieceAction = ({ type: ADD_BOARD_PIECE, payload: { piece: Piece, x: number, y: number } });
type RemoveBoardPieceAction = ({ type: REMOVE_BOARD_PIECE, payload: { pieceId: string } });
type RemoveBoardPiecesAction = ({ type: REMOVE_BOARD_PIECES, payload: { pieceIds: string[] } });
type UpdateBoardPieceAction = ({ type: UPDATE_BOARD_PIECE, payload: { piece: Piece } });
type UpdateBoardPiecesAction = ({ type: UPDATE_BOARD_PIECES, payload: { pieces: Piece[] } });
type MoveBoardPieceAction = ({ type: MOVE_BOARD_PIECE, payload: { pieceId: string, from: XYLocation, to: XYLocation } });
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

export const initialiseBoard = (pieces: { [key: string]: Piece }): InitialiseBoardAction => ({
    type: INITIALISE_BOARD,
    payload: {
        pieces
    }
});

export const addBoardPiece = (piece: Piece, x: number, y: number): AddBoardPieceAction => ({
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

export const updateBoardPiece = (piece: Piece): UpdateBoardPieceAction => ({
    type: UPDATE_BOARD_PIECE,
    payload: {
        piece
    }
});

export const updateBoardPieces = (pieces: Piece[]): UpdateBoardPiecesAction => ({
    type: UPDATE_BOARD_PIECES,
    payload: {
        pieces
    }
});

export const moveBoardPiece = (pieceId: string, from: XYLocation, to: XYLocation): MoveBoardPieceAction => ({
    type: MOVE_BOARD_PIECE,
    payload: {
        pieceId,
        from,
        to
    }
});

export const lockBoard = (): LockBoardAction => ({ type: LOCK_BOARD });

export const unlockBoard = (): UnlockBoardAction => ({ type: UNLOCK_BOARD });
