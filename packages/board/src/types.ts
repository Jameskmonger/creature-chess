export type HasId = { id: string };

export type PiecesState<TPiece> = {
	[pieceId: string]: TPiece;
};

export type PiecePosition = { x: number, y: number };

export type PiecePositionsState = {
	[position: string]: string;
};

export type BoardState<TPiece = HasId> = {
	id: string;
	pieces: PiecesState<TPiece>;
	piecePositions: PiecePositionsState;
	locked: boolean;
	pieceLimit: number | null;
	size: {
		width: number,
		height: number
	};
};

export type SortPositionFn = (a: PiecePosition, b: PiecePosition) => -1 | 1;
