import { createSelector } from "reselect";

import { PokemonPiece } from "@common/pokemon-piece";
import { AppState } from "../store/store";
import { TileCoordinates } from "@common/position";

const piecesSelector = (state: AppState) => state.pieces;
const positionSelector = (state: AppState, props: { position: TileCoordinates }) => props.position;
const piecePositionFilter = (position: TileCoordinates) => (p: PokemonPiece): boolean => p.position.x === position.x && p.position.y === position.y;

const unbenchedPiecesSelector = createSelector(
    piecesSelector,
    (pieces) => pieces.filter(p => !p.benched)
);

export const benchedPiecesSelector = createSelector(
    piecesSelector,
    (pieces) => pieces.filter(p => p.benched)
);

export const pieceSelector = createSelector(
    unbenchedPiecesSelector,
    positionSelector,
    (pieces, position) => pieces.filter(piecePositionFilter(position))
);
