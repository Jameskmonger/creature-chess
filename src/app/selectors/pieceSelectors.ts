import { createSelector } from "reselect";

import { PokemonPiece } from "@common/pokemon-piece";
import { AppState } from "../store/store";
import { TileCoordinates, TileType } from "@common/position";
import { localPlayerIdSelector } from "./gameSelector";

const piecesSelector = (state: AppState, props: { type: TileType }) =>
    props.type === TileType.BOARD ? state.board : state.bench;
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

export const ownedPieceSelector = (state: AppState) => {
    const playerId = localPlayerIdSelector(state);

    return state.board.filter(p => p.ownerId === playerId);
};
