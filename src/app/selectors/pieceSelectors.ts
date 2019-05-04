import { createSelector } from "reselect";

import { PokemonPiece } from "@common/pokemon-piece";
import { AppState } from "../store/store";
import { TileCoordinates, TileType } from "@common/position";

const piecesSelector = (state: AppState, props: { type: TileType }) =>
    props.type === TileType.BOARD ? state.pieces : state.benchPieces;
const positionSelector = (state: AppState, props: { position: TileCoordinates }) => props.position;

const piecePositionFilter =
    (position: TileCoordinates) =>
        (p: PokemonPiece) =>
            p.position.x === position.x && p.position.y === position.y;

export const tilePieceSelector = createSelector(
    piecesSelector,
    positionSelector,
    (pieces, position) => pieces.filter(piecePositionFilter(position))
);
