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
        setBoardPiecesCommand: (state, { payload: pieces }: PayloadAction<IndexedPieces>) => ({
            ...state,
            pieces: { ...pieces },
            piecePositions: Object.entries(pieces)
                .reduce<PiecePositionsState>(
                    (acc, [pieceId, piece]) => {
                        acc[`${piece.position.x},${piece.position.y}`] = pieceId;

                        return acc;
                    },
                    {}
                )
        }),
        addBoardPieceCommand: (state, { payload: { x, y, piece } }: PayloadAction<{ x: number, y: number, piece: PieceModel }>) => {
            return {
                ...state,
                pieces: {
                    ...state.pieces,
                    [piece.id]: {
                        ...piece,
                        position: createTileCoordinates(x, y),
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

            // safety catch
            if (!piece || !piece.position || piece.id !== pieceId || piece.position.x !== from.x || piece.position.y !== from.y) {
                return state;
            }

            const fromString = `${from.x},${from.y}`;
            const toString = `${to.x},${to.y}`;

            return {
                ...state,
                pieces: {
                    ...state.pieces,
                    [piece.id]: {
                        ...piece,
                        position: {
                            x: to.x,
                            y: to.y
                        }
                    }
                },
                piecePositions: {
                    ...state.piecePositions,
                    [fromString]: null,
                    [toString]: pieceId
                }
            };
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
                },
                piecePositions: getPiecePositionsWithoutIds(state.piecePositions, pieces.map(p => p.id))
            }

            for (const piece of pieces) {
                newState.pieces[piece.id] = piece;
                newState[`${piece.position.x},${piece.position.y}`] = piece.id;
            }

            return newState;
        }
    }
});
