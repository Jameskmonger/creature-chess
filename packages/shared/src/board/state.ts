import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { createTileCoordinates, IndexedPieces, PieceModel, TileCoordinates } from "@creature-chess/models";
import { getPiecesWithoutIds, getPiecePositionsWithoutIds } from "./utils/filter";

type PiecePositionsState = {
    [position: string]: string;
};

export type BoardState = {
    pieces: IndexedPieces,
    piecePositions: PiecePositionsState,
    locked: boolean,
    pieceLimit: number | null
};

const initialState: BoardState = {
    pieces: {},
    piecePositions: {},
    locked: false,
    pieceLimit: null
}

export const {
    reducer,
    actions: {
        lockBoardCommand,
        unlockBoardCommand,
        setPieceLimitCommand,
        setBoardPiecesCommand,
        addBoardPieceCommand,
        moveBoardPieceCommand,
        removeBoardPiecesCommand,
        updateBoardPiecesCommand
    }
} = createSlice({
    name: "board",
    initialState,
    reducers: {
        lockBoardCommand: state => ({ ...state, locked: true }),
        unlockBoardCommand: state => ({ ...state, locked: false }),
        setPieceLimitCommand: (state, { payload: limit }: PayloadAction<number | null>) => ({
            ...state,
            pieceLimit: limit
        }),
        setBoardPiecesCommand: (state, { payload: { pieces, piecePositions } }: PayloadAction<{ pieces: IndexedPieces, piecePositions: PiecePositionsState }>) => ({
            ...state,
            pieces: { ...pieces },
            piecePositions: { ...piecePositions }
        }),
        addBoardPieceCommand: (state, { payload: { x, y, piece } }: PayloadAction<{ x: number, y: number, piece: PieceModel }>) => {
            return {
                ...state,
                pieces: {
                    ...state.pieces,
                    [piece.id]: {
                        ...piece,
                        facingAway: true
                    }
                },
                piecePositions: {
                    ...state.piecePositions,
                    [`${x},${y}`]: piece.id
                }
            };
        },
        moveBoardPieceCommand: (state, { payload: { pieceId, from, to } }: PayloadAction<{ pieceId: string, from: TileCoordinates, to: TileCoordinates }>) => {
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
        removeBoardPiecesCommand: (state, { payload: pieceIds }: PayloadAction<string[]>) => {
            return {
                ...state,
                pieces: getPiecesWithoutIds(state.pieces, pieceIds),
                piecePositions: getPiecePositionsWithoutIds(state.piecePositions, pieceIds)
            };
        },
        updateBoardPiecesCommand: (state, { payload: pieces }: PayloadAction<PieceModel[]>) => {
            const newState: BoardState = {
                ...state,
                pieces: {
                    ...state.pieces
                }
            }

            for (const piece of pieces) {
                newState.pieces[piece.id] = piece;
            }

            return newState;
        }
    }
});
