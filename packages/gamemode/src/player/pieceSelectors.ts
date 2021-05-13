import { PieceModel } from "@creature-chess/models";
import { BoardSelectors, BoardState } from "@creature-chess/board";

interface PlayerPiecesState {
	board: BoardState<PieceModel>;
	bench: BoardState<PieceModel>;
}

export const getPiece = (state: PlayerPiecesState, pieceId: string): PieceModel | null =>
	BoardSelectors.getPiece(state.board, pieceId)
	|| BoardSelectors.getPiece(state.bench, pieceId)
	|| null;

export const getAllPieces = (state: PlayerPiecesState): PieceModel[] => [
	...BoardSelectors.getAllPieces(state.board),
	...BoardSelectors.getAllPieces(state.bench)
];

export const getPiecesForDefinition = (state: BoardState<PieceModel>, definitionId: number) =>
	BoardSelectors.getAllPieces(state).filter(p => p.definitionId === definitionId);

export const getPiecesForStage = (state: BoardState<PieceModel>, stage: number) =>
	BoardSelectors.getAllPieces(state).filter(p => p.stage === stage);
export const getPiecesExceptStage = (state: BoardState<PieceModel>, stage: number) =>
	BoardSelectors.getAllPieces(state).filter(p => p.stage !== stage);
