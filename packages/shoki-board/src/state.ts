import { createSlice, ActionCreatorWithPayload, ActionCreatorWithoutPayload, PayloadAction, Reducer } from "@reduxjs/toolkit";
import { BoardState, HasId, PiecePosition, PiecePositionsState, PiecesState } from "./types";
import { getPiecesWithoutIds, getPiecePositionsWithoutIds } from "./utils/filter";

const createInitialState = <TPiece>(id: string, size: { width: number; height: number } = {
	width: 7,
	height: 3
}): BoardState<TPiece> => ({
	id,
	pieces: {},
	piecePositions: {},
	locked: false,
	pieceLimit: null,
	size
});

export type BoardSlice<TPiece extends HasId = HasId> = {
	boardReducer: Reducer<BoardState<TPiece>>;
	commands: BoardSliceCommands<TPiece>;
};
export type BoardSliceCommands<TPiece extends HasId = HasId> = {
	setBoardSizeCommand: ActionCreatorWithPayload<{
		width: number;
		height: number;
	}>;
	lockBoardCommand: ActionCreatorWithoutPayload;
	unlockBoardCommand: ActionCreatorWithoutPayload;
	setPieceLimitCommand: ActionCreatorWithPayload<number | null>;
	setBoardPiecesCommand: ActionCreatorWithPayload<{
		pieces: PiecesState<TPiece>;
		piecePositions: PiecePositionsState;
		size?: {
			width: number;
			height: number;
		};
	}>;
	addBoardPieceCommand: ActionCreatorWithPayload<{
		x: number;
		y: number;
		piece: TPiece;
	}>;
	moveBoardPieceCommand: ActionCreatorWithPayload<{
		pieceId: string;
		from: PiecePosition;
		to: PiecePosition;
	}>;
	removeBoardPiecesCommand: ActionCreatorWithPayload<string[]>;
	updateBoardPiecesCommand: ActionCreatorWithPayload<TPiece[]>;
	swapPiecesCommand: ActionCreatorWithPayload<{ aId: string; bId: string }>;
};

export const createBoardSlice = <TPiece extends HasId>(id: string, size?: { width: number; height: number }): BoardSlice<TPiece> => {
	const {
		reducer,
		actions: {
			setBoardSizeCommand,
			lockBoardCommand,
			unlockBoardCommand,
			setPieceLimitCommand,
			setBoardPiecesCommand,
			addBoardPieceCommand,
			moveBoardPieceCommand,
			removeBoardPiecesCommand,
			updateBoardPiecesCommand,
			swapPiecesCommand
		}
	} = createSlice({
		name: `board-${id}`,
		initialState: createInitialState<TPiece>(id, size),
		reducers: {
			setBoardSizeCommand: (state, { payload: { width, height } }: PayloadAction<{ width: number; height: number }>) => {
				const differenceWidth = width - state.size.width;
				const differenceHeight = height - state.size.height;

				return {
					...state,
					size: { width, height },
					piecePositions: Object.entries(state.piecePositions).reduce<{ [position: string]: string }>(
						(newPiecePositions, [position, pieceId]) => {
							const [x, y] = position.split(",").map(val => parseInt(val, 10));

							const newX = x + differenceWidth;
							const newY = y + differenceHeight;

							return {
								...newPiecePositions,
								[`${newX},${newY}`]: pieceId
							};
						},
						{}
					)
				};
			},
			lockBoardCommand: state => ({ ...state, locked: true }),
			unlockBoardCommand: state => ({ ...state, locked: false }),
			setPieceLimitCommand: (state, { payload: limit }: PayloadAction<number | null>) => ({
				...state,
				pieceLimit: limit
			}),
			setBoardPiecesCommand: (
				state,
				{
					payload: {
						pieces,
						piecePositions,
						size: newSize
					}
				}: PayloadAction<{ pieces: PiecesState<TPiece>; piecePositions: PiecePositionsState; size?: { width: number; height: number } }>
			) => ({
				...state,
				pieces: { ...pieces },
				piecePositions: { ...piecePositions },
				...(newSize ? { size: { width: newSize.width, height: newSize.height } } : {})
			}),
			addBoardPieceCommand: (state, { payload: { x, y, piece } }: PayloadAction<{ x: number; y: number; piece: TPiece }>) => ({
				...state,
				pieces: {
					...(state.pieces as PiecesState<TPiece>),
					[piece.id]: piece
				},
				piecePositions: {
					...state.piecePositions,
					[`${x},${y}`]: piece.id
				}
			}),
			moveBoardPieceCommand: (
				state,
				{
					payload: { pieceId, from, to }
				}: PayloadAction<{ pieceId: string; from: PiecePosition; to: PiecePosition }>
			) => {
				const piece = state.pieces[pieceId];
				const fromString = `${from.x},${from.y}`;
				const pieceAtFrom = state.piecePositions[fromString];

				// safety catch
				if (!piece || piece.id !== pieceId || piece.id !== pieceAtFrom) {
					return state;
				}

				const toString = `${to.x},${to.y}`;

				const newState = {
					...state,
					piecePositions: {
						...state.piecePositions,
						[toString]: pieceId
					}
				};

				delete newState.piecePositions[fromString];

				return newState;
			},
			removeBoardPiecesCommand: (state, { payload: pieceIds }: PayloadAction<string[]>) => ({
				...state,
				pieces: getPiecesWithoutIds(state.pieces, pieceIds),
				piecePositions: getPiecePositionsWithoutIds(state.piecePositions, pieceIds)
			}),
			updateBoardPiecesCommand: (state, { payload: pieces }: PayloadAction<TPiece[]>) => {
				const newPieces: PiecesState<TPiece> = {
					...state.pieces
				} as PiecesState<TPiece>;

				for (const piece of pieces) {
					newPieces[piece.id] = piece;
				}

				return {
					...state,
					pieces: newPieces
				};
			},
			swapPiecesCommand: (state, { payload: { aId, bId } }: PayloadAction<{ aId: string; bId: string }>) => {
				if (!aId || !bId) {
					return state;
				}

				const a = state.pieces[aId];
				const b = state.pieces[bId];

				if (!a || !b) {
					return state;
				}

				const positions = Object.entries(state.piecePositions);

				const aPosition = positions.find(([pieceId]) => pieceId === aId);
				const bPosition = positions.find(([pieceId]) => pieceId === bId);

				if (!aPosition || !bPosition) {
					return state;
				}

				const [aX, aY] = aPosition;
				const [bX, bY] = bPosition;

				return {
					...state,
					piecePositions: {
						...state.piecePositions,
						[`${aX},${aY}`]: b.id,
						[`${bX},${bY}`]: a.id
					}
				};
			},
		}
	});

	return {
		boardReducer: reducer,
		commands: {
			setBoardSizeCommand,
			lockBoardCommand,
			unlockBoardCommand,
			setPieceLimitCommand,
			setBoardPiecesCommand,
			addBoardPieceCommand,
			moveBoardPieceCommand,
			removeBoardPiecesCommand,
			updateBoardPiecesCommand,
			swapPiecesCommand
		}
	};
};
