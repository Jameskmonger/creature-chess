import { createSelector } from "reselect";

import { PiecePosition } from "@common/pokemon-piece";
import { AppState } from "../store/store";

const piecesSelector = (state: AppState) => state.pieces;
const positionSelector = (state: AppState, props: { position: PiecePosition }) => props.position;

export const pieceSelector = createSelector(
    piecesSelector,
    positionSelector,
    (pieces, position) => pieces.filter(p => p.position[0] === position[0] && p.position[1] === position[1])
);
