import { PokemonPiece } from "@common/pokemon-piece";
import { PIECE_MOVED_TO_BOARD, PIECES_UPDATED, PIECE_MOVED_TO_BENCH, SELL_PIECE } from "../actiontypes/pieceActionTypes";
import { TileCoordinates, TileType } from "@common/position";
import { GamePhaseUpdateAction } from "./gameActions";

export type PiecesAction =
    ({ type: PIECES_UPDATED, payload: { pieces: PokemonPiece[] } })
    | ({ type: PIECE_MOVED_TO_BOARD, payload: { piece: PokemonPiece, position: TileCoordinates } })
    | ({ type: PIECE_MOVED_TO_BENCH, payload: { piece: PokemonPiece, slot: number } })
    | ({ type: SELL_PIECE, payload: { pieceId: string } })
    | GamePhaseUpdateAction;

export const pieceMoved = (piece: PokemonPiece, position: TileCoordinates, tileType: TileType) => {
    if (tileType === TileType.BOARD) {
        return {
            type: PIECE_MOVED_TO_BOARD,
            payload: {
                piece,
                position
            }
        };
    }

    return {
        type: PIECE_MOVED_TO_BENCH,
        payload: {
            piece,
            slot: position.x
        }
    };
};

export const piecesUpdated = (pieces: PokemonPiece[]) => ({
    type: PIECES_UPDATED,
    payload: {
        pieces
    }
});

export const sellPiece = (pieceId: string) => ({
    type: SELL_PIECE,
    payload: {
        pieceId
    }
});
