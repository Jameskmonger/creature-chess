import { createAction } from "@reduxjs/toolkit";
import { PackedPosition } from "@creature-chess/board";

// === board

export const addBoardPieceCommand = createAction<{
	pieceId: string;
	position: PackedPosition;
}>("board/addPiece");

export const removeBoardPieceCommand = createAction<{
	pieceId: string;
}>("board/removePiece");

export const removeBoardPiecesCommand = createAction<{
	pieceIds: string[];
}>("board/removePieces");

export const swapBoardPiecesCommand = createAction<{
	pieceIdA: string;
	pieceIdB: string;
}>("board/swapPieces");

export const moveBoardPieceCommand = createAction<{
	pieceId: string;
	from: PackedPosition;
	to: PackedPosition;
}>("board/movePiece");

export const clearBoardCommand = createAction("board/clearBoard");

// === bench

export const addBenchPieceCommand = createAction<{
	pieceId: string;
	position: { x: number; }
}>("bench/addPiece");

export const removeBenchPieceCommand = createAction<{
	pieceId: string;
}>("bench/removePiece");

export const removeBenchPiecesCommand = createAction<{
	pieceIds: string[];
}>("bench/removePieces");

export const swapBenchPiecesCommand = createAction<{
	pieceIdA: string;
	pieceIdB: string;
}>("bench/swapPieces");

export const moveBenchPieceCommand = createAction<{
	pieceId: string;
	from: { x: number; };
	to: { x: number; };
}>("bench/movePiece");

export const clearBenchCommand = createAction("bench/clearBench");
