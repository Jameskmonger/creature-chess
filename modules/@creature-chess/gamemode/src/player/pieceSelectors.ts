import { BoardSelectors, BoardState } from "@shoki/board";

import { PieceModel } from "@creature-chess/models";

import { PlayerState } from "../entities/player";

export const getPiece = (
	state: PlayerState,
	pieceId: string
): PieceModel | null =>
	BoardSelectors.getPiece(state.board, pieceId) ||
	BoardSelectors.getPiece(state.bench, pieceId) ||
	null;

type PieceFilter = (
	value: PieceModel,
	index: number,
	array: PieceModel[]
) => boolean;

export const getAllPieces = (
	state: PlayerState,
	filter?: PieceFilter
): PieceModel[] => {
	const allPieces = [
		...BoardSelectors.getAllPieces(state.board),
		...BoardSelectors.getAllPieces(state.bench),
	];

	return filter ? allPieces.filter(filter) : allPieces;
};

export const getPiecesForDefinition = (
	state: BoardState<PieceModel>,
	definitionId: number
) =>
	BoardSelectors.getAllPieces(state).filter(
		(p) => p.definitionId === definitionId
	);
