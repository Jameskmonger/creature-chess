import { PieceModel } from "@creature-chess/models";
import { BoardSelectors, BoardState } from "@shoki/board";
import { PlayerState } from "../entities/player";

export const getPiece = (state: PlayerState, pieceId: string): PieceModel | null =>
	BoardSelectors.getPiece(state.board, pieceId)
	|| BoardSelectors.getPiece(state.bench, pieceId)
	|| null;

export const getAllPieces = (state: PlayerState): PieceModel[] => [
	...BoardSelectors.getAllPieces(state.board),
	...BoardSelectors.getAllPieces(state.bench)
];

export const getPiecesForDefinition = (state: BoardState<PieceModel>, definitionId: number) =>
	BoardSelectors.getAllPieces(state).filter(p => p.definitionId === definitionId);

export const getPiecesForStage = (state: BoardState<PieceModel>, stage: number) =>
	BoardSelectors.getAllPieces(state).filter(p => p.stage === stage);
export const getPiecesExceptStage = (state: BoardState<PieceModel>, stage: number) =>
	BoardSelectors.getAllPieces(state).filter(p => p.stage !== stage);
