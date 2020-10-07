import { PieceModel, TileCoordinates, IndexedPieces } from "@creature-chess/models";

export const REMOVE_BOARD_PIECE_COMMAND = "REMOVE_BOARD_PIECE_COMMAND";
export type REMOVE_BOARD_PIECE_COMMAND = typeof REMOVE_BOARD_PIECE_COMMAND;
export const REMOVE_BOARD_PIECES_COMMAND = "REMOVE_BOARD_PIECES_COMMAND";
export type REMOVE_BOARD_PIECES_COMMAND = typeof REMOVE_BOARD_PIECES_COMMAND;
export const ADD_BOARD_PIECE_COMMAND = "ADD_BOARD_PIECE_COMMAND";
export type ADD_BOARD_PIECE_COMMAND = typeof ADD_BOARD_PIECE_COMMAND;
export const INITIALISE_BOARD_COMMAND = "INITIALISE_BOARD_COMMAND";
export type INITIALISE_BOARD_COMMAND = typeof INITIALISE_BOARD_COMMAND;
export const UPDATE_BOARD_PIECE_COMMAND = "UPDATE_BOARD_PIECE_COMMAND";
export type UPDATE_BOARD_PIECE_COMMAND = typeof UPDATE_BOARD_PIECE_COMMAND;
export const UPDATE_BOARD_PIECES_COMMAND = "UPDATE_BOARD_PIECES_COMMAND";
export type UPDATE_BOARD_PIECES_COMMAND = typeof UPDATE_BOARD_PIECES_COMMAND;
export const MOVE_BOARD_PIECE_COMMAND = "MOVE_BOARD_PIECE_COMMAND";
export type MOVE_BOARD_PIECE_COMMAND = typeof MOVE_BOARD_PIECE_COMMAND;
export const LOCK_BOARD_COMMAND = "LOCK_BOARD_COMMAND";
export type LOCK_BOARD_COMMAND = typeof LOCK_BOARD_COMMAND;
export const UNLOCK_BOARD_COMMAND = "UNLOCK_BOARD_COMMAND";
export type UNLOCK_BOARD_COMMAND = typeof UNLOCK_BOARD_COMMAND;

export type InitialiseBoardCommand = ({ type: INITIALISE_BOARD_COMMAND, payload: { pieces: IndexedPieces } });
type AddBoardPieceCommand = ({ type: ADD_BOARD_PIECE_COMMAND, payload: { piece: PieceModel, x: number, y: number } });
type RemoveBoardPieceCommand = ({ type: REMOVE_BOARD_PIECE_COMMAND, payload: { pieceId: string } });
type RemoveBoardPiecesCommand = ({ type: REMOVE_BOARD_PIECES_COMMAND, payload: { pieceIds: string[] } });
export type UpdateBoardPieceCommand = ({ type: UPDATE_BOARD_PIECE_COMMAND, payload: { piece: PieceModel } });
export type UpdateBoardPiecesCommand = ({ type: UPDATE_BOARD_PIECES_COMMAND, payload: { pieces: PieceModel[] } });
type MoveBoardPieceCommand = ({ type: MOVE_BOARD_PIECE_COMMAND, payload: { pieceId: string, from: TileCoordinates, to: TileCoordinates } });
type LockBoardCommand = ({ type: LOCK_BOARD_COMMAND });
type UnlockBoardCommand = ({ type: UNLOCK_BOARD_COMMAND });

export type BoardCommand =
    InitialiseBoardCommand
    | AddBoardPieceCommand
    | RemoveBoardPieceCommand
    | RemoveBoardPiecesCommand
    | UpdateBoardPieceCommand
    | UpdateBoardPiecesCommand
    | MoveBoardPieceCommand
    | LockBoardCommand
    | UnlockBoardCommand;

export const initialiseBoard = (pieces: IndexedPieces): InitialiseBoardCommand => ({
    type: INITIALISE_BOARD_COMMAND,
    payload: {
        pieces
    }
});

export const addBoardPiece = (piece: PieceModel, x: number, y: number): AddBoardPieceCommand => ({
    type: ADD_BOARD_PIECE_COMMAND,
    payload: {
        piece,
        x,
        y
    }
});

export const removeBoardPiece = (pieceId: string): RemoveBoardPieceCommand => ({
    type: REMOVE_BOARD_PIECE_COMMAND,
    payload: {
        pieceId
    }
});

export const removeBoardPieces = (pieceIds: string[]): RemoveBoardPiecesCommand => ({
    type: REMOVE_BOARD_PIECES_COMMAND,
    payload: {
        pieceIds
    }
});

export const updateBoardPiece = (piece: PieceModel): UpdateBoardPieceCommand => ({
    type: UPDATE_BOARD_PIECE_COMMAND,
    payload: {
        piece
    }
});

export const updateBoardPieces = (pieces: PieceModel[]): UpdateBoardPiecesCommand => ({
    type: UPDATE_BOARD_PIECES_COMMAND,
    payload: {
        pieces
    }
});

export const moveBoardPiece = (pieceId: string, from: TileCoordinates, to: TileCoordinates): MoveBoardPieceCommand => ({
    type: MOVE_BOARD_PIECE_COMMAND,
    payload: {
        pieceId,
        from,
        to
    }
});

export const lockBoard = (): LockBoardCommand => ({ type: LOCK_BOARD_COMMAND });

export const unlockBoard = (): UnlockBoardCommand => ({ type: UNLOCK_BOARD_COMMAND });
