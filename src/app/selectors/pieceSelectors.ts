import { createSelector } from "reselect";

import { PiecePosition, PokemonPiece } from "@common/pokemon-piece";
import { AppState } from "../store/store";

const piecesSelector = (state: AppState) => state.pieces;
const positionSelector = (state: AppState, props: { position: PiecePosition }) => props.position;
const piecePositionFilter = (position: PiecePosition) => (p: PokemonPiece): boolean => p.position[0] === position[0] && p.position[1] === position[1];

const benchedPiecesSelector = createSelector(
    piecesSelector,
    (pieces) => pieces.filter(p => p.benched)
);

const unBenchedPiecesSelector = createSelector(
    piecesSelector,
    (pieces) => pieces.filter(p => !p.benched)
);

export const pieceSelector = createSelector(
    unBenchedPiecesSelector,
    positionSelector,
    (pieces, position) => pieces.filter(piecePositionFilter(position))
);

export const benchPieceSelector = createSelector(
    benchedPiecesSelector,
    positionSelector,
    (pieces, position) => pieces.filter(piecePositionFilter(position))
);
