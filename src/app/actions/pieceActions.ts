import { PokemonPiece } from "@common/pokemon-piece";
import { PIECE_MOVED_TO_BOARD, PIECES_UPDATED, PIECE_MOVED_TO_BENCH } from "../actiontypes/pieceActionTypes";
import { TileCoordinates, TileType } from "@common/position";

export type PiecesAction =
    ({ type: PIECES_UPDATED, payload: PokemonPiece[] })
    | ({ type: PIECE_MOVED_TO_BOARD, payload: { piece: PokemonPiece, position: TileCoordinates } })
    | ({ type: PIECE_MOVED_TO_BENCH, payload: { piece: PokemonPiece, slot: number } });

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

export const piecesUpdated = (payload: PokemonPiece[]) => ({
    type: PIECES_UPDATED,
    payload
});
