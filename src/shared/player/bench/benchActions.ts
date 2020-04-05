import { Piece } from "@common/models";
import { INITIALISE_BENCH, REMOVE_BENCH_PIECE, REMOVE_BENCH_PIECES, ADD_BENCH_PIECE, LOCK_BENCH, UNLOCK_BENCH, MOVE_BENCH_PIECE } from "./benchActionTypes";
import { BenchState } from "./state";
import { SlotLocation } from "@common/models/position";

type InitialiseBenchAction = ({ type: INITIALISE_BENCH, payload: { state: BenchState } });
export type AddBenchPieceAction = ({ type: ADD_BENCH_PIECE, payload: { piece: Piece, slot: number | null } });
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

export const addBenchPiece = (piece: Piece, slot: number | null): AddBenchPieceAction => ({
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
