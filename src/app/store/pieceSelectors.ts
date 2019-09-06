import { createSelector } from "reselect";

import { Models } from "@common";
import { AppState } from "./state";
import { TileCoordinates, TileType } from "@common/position";
import { localPlayerIdSelector } from "./gameSelector";

const piecesSelector = (state: AppState, props: { type: TileType }) =>
    props.type === TileType.BOARD ? state.board : state.bench;
const positionSelector = (state: AppState, props: { position: TileCoordinates }) => props.position;

const piecePositionFilter =
    (position: TileCoordinates) =>
        (p: Models.Piece) =>
            p.position.x === position.x && p.position.y === position.y;

export const tilePieceSelector = createSelector(
    piecesSelector,
    positionSelector,
    (pieces, position) => {
        const allPieces = pieces.filter(piecePositionFilter(position));

        if (allPieces.length === 0) {
            return null;
        }

        const livingPiece = allPieces.find(p => p.currentHealth > 0);

        if (livingPiece) {
            return livingPiece;
        }

        return allPieces[0] || null;
    }
);

export const ownedPieceSelector = (state: AppState) => {
    const playerId = localPlayerIdSelector(state);

    return state.board.filter(p => p.ownerId === playerId);
};
