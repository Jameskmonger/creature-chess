import { PieceModel, SlotLocation } from "@creature-chess/models";
import { BenchState } from "./state";

export const REMOVE_BENCH_PIECE_COMMAND = "REMOVE_BENCH_PIECE_COMMAND";
export type REMOVE_BENCH_PIECE_COMMAND = typeof REMOVE_BENCH_PIECE_COMMAND;
export const REMOVE_BENCH_PIECES_COMMAND = "REMOVE_BENCH_PIECES_COMMAND";
export type REMOVE_BENCH_PIECES_COMMAND = typeof REMOVE_BENCH_PIECES_COMMAND;
export const ADD_BENCH_PIECE_COMMAND = "ADD_BENCH_PIECE_COMMAND";
export type ADD_BENCH_PIECE_COMMAND = typeof ADD_BENCH_PIECE_COMMAND;
export const INITIALISE_BENCH_COMMAND = "INITIALISE_BENCH_COMMAND";
export type INITIALISE_BENCH_COMMAND = typeof INITIALISE_BENCH_COMMAND;
export const LOCK_BENCH_COMMAND = "LOCK_BENCH_COMMAND";
export type LOCK_BENCH_COMMAND = typeof LOCK_BENCH_COMMAND;
export const UNLOCK_BENCH_COMMAND = "UNLOCK_BENCH_COMMAND";
export type UNLOCK_BENCH_COMMAND = typeof UNLOCK_BENCH_COMMAND;
export const MOVE_BENCH_PIECE_COMMAND = "MOVE_BENCH_PIECE_COMMAND";
export type MOVE_BENCH_PIECE_COMMAND = typeof MOVE_BENCH_PIECE_COMMAND;

type InitialiseBenchCommand = ({ type: INITIALISE_BENCH_COMMAND, payload: { pieces: PieceModel[] } });
export type AddBenchPieceCommand = ({ type: ADD_BENCH_PIECE_COMMAND, payload: { piece: PieceModel, slot: number | null } });
type RemoveBenchPieceCommand = ({ type: REMOVE_BENCH_PIECE_COMMAND, payload: { pieceId: string } });
type RemoveBenchPiecesCommand = ({ type: REMOVE_BENCH_PIECES_COMMAND, payload: { pieceIds: string[] } });
type MoveBenchPieceCommand = ({ type: MOVE_BENCH_PIECE_COMMAND, payload: { pieceId: string, from: SlotLocation, to: SlotLocation }});
type LockBenchCommand = { type: LOCK_BENCH_COMMAND };
type UnlockBenchCommand = { type: UNLOCK_BENCH_COMMAND };

export type BenchCommand =
    InitialiseBenchCommand
    | AddBenchPieceCommand
    | RemoveBenchPieceCommand
    | RemoveBenchPiecesCommand
    | MoveBenchPieceCommand
    | LockBenchCommand
    | UnlockBenchCommand;

export const initialiseBenchCommand = (pieces: PieceModel[]): InitialiseBenchCommand => ({
    type: INITIALISE_BENCH_COMMAND,
    payload: {
        pieces
    }
});

export const addBenchPieceCommand = (piece: PieceModel, slot: number | null): AddBenchPieceCommand => ({
    type: ADD_BENCH_PIECE_COMMAND,
    payload: {
        piece,
        slot
    }
});

export const removeBenchPieceCommand = (pieceId: string): RemoveBenchPieceCommand => ({
    type: REMOVE_BENCH_PIECE_COMMAND,
    payload: {
        pieceId
    }
});

export const removeBenchPiecesCommand = (pieceIds: string[]): RemoveBenchPiecesCommand => ({
    type: REMOVE_BENCH_PIECES_COMMAND,
    payload: {
        pieceIds
    }
});

export const moveBenchPieceCommand = (pieceId: string, from: SlotLocation, to: SlotLocation): MoveBenchPieceCommand => ({
    type: MOVE_BENCH_PIECE_COMMAND,
    payload: {
        pieceId,
        from,
        to
    }
});

export const lockBenchCommand = (): LockBenchCommand => ({ type: LOCK_BENCH_COMMAND });
export const unlockBenchCommand = (): UnlockBenchCommand => ({ type: UNLOCK_BENCH_COMMAND });
