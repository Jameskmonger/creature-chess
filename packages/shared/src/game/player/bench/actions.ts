import { PieceModel, SlotLocation } from "@creature-chess/models";
import { BenchState } from "./state";

export const REMOVE_BENCH_PIECE = "REMOVE_BENCH_PIECE";
export type REMOVE_BENCH_PIECE = typeof REMOVE_BENCH_PIECE;
export const REMOVE_BENCH_PIECES = "REMOVE_BENCH_PIECES";
export type REMOVE_BENCH_PIECES = typeof REMOVE_BENCH_PIECES;
export const ADD_BENCH_PIECE = "ADD_BENCH_PIECE";
export type ADD_BENCH_PIECE = typeof ADD_BENCH_PIECE;
export const INITIALISE_BENCH = "INITIALISE_BENCH";
export type INITIALISE_BENCH = typeof INITIALISE_BENCH;
export const LOCK_BENCH = "LOCK_BENCH";
export type LOCK_BENCH = typeof LOCK_BENCH;
export const UNLOCK_BENCH = "UNLOCK_BENCH";
export type UNLOCK_BENCH = typeof UNLOCK_BENCH;
export const MOVE_BENCH_PIECE = "MOVE_BENCH_PIECE";
export type MOVE_BENCH_PIECE = typeof MOVE_BENCH_PIECE;

type InitialiseBenchAction = ({ type: INITIALISE_BENCH, payload: { state: BenchState } });
export type AddBenchPieceAction = ({ type: ADD_BENCH_PIECE, payload: { piece: PieceModel, slot: number | null } });
type RemoveBenchPieceAction = ({ type: REMOVE_BENCH_PIECE, payload: { pieceId: string } });
type RemoveBenchPiecesAction = ({ type: REMOVE_BENCH_PIECES, payload: { pieceIds: string[] } });
type MoveBenchPieceAction = ({ type: MOVE_BENCH_PIECE, payload: { pieceId: string, from: SlotLocation, to: SlotLocation }});
type LockBenchAction = { type: LOCK_BENCH };
type UnlockBenchAction = { type: UNLOCK_BENCH };

export type BenchAction =
    InitialiseBenchAction
    | AddBenchPieceAction
    | RemoveBenchPieceAction
    | RemoveBenchPiecesAction
    | MoveBenchPieceAction
    | LockBenchAction
    | UnlockBenchAction;

export const initialiseBench = (state: BenchState): InitialiseBenchAction => ({
    type: INITIALISE_BENCH,
    payload: {
        state
    }
});

export const addBenchPiece = (piece: PieceModel, slot: number | null): AddBenchPieceAction => ({
    type: ADD_BENCH_PIECE,
    payload: {
        piece,
        slot
    }
});

export const removeBenchPiece = (pieceId: string): RemoveBenchPieceAction => ({
    type: REMOVE_BENCH_PIECE,
    payload: {
        pieceId
    }
});

export const removeBenchPieces = (pieceIds: string[]): RemoveBenchPiecesAction => ({
    type: REMOVE_BENCH_PIECES,
    payload: {
        pieceIds
    }
});

export const moveBenchPiece = (pieceId: string, from: SlotLocation, to: SlotLocation): MoveBenchPieceAction => ({
    type: MOVE_BENCH_PIECE,
    payload: {
        pieceId,
        from,
        to
    }
});

export const lockBench = (): LockBenchAction => ({ type: LOCK_BENCH });
export const unlockBench = (): UnlockBenchAction => ({ type: UNLOCK_BENCH });
