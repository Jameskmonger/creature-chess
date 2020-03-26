import { createSelector } from "reselect";

import { AppState } from "./state";
import { localPlayerIdSelector } from "./gameSelector";

export const benchTilePieceSelector = createSelector(
    (state: AppState) => state.bench,
    (state: AppState, props: { x: number }) => ({ x: props.x }),
    ({ pieces }, { x }) => {
        return pieces[x] || null;
    }
);

export const boardTilePieceSelector = createSelector(
    (state: AppState) => state.board.pieces,
    (state: AppState) => state.board.piecePositions,
    (state: AppState, props: { x: number, y: number }) => ({ x: props.x, y: props.y }),
    (pieces, piecePositions, { x, y }) => {
        const positionString = `${x},${y}`;
        const pieceId = piecePositions[positionString];

        if (!pieceId) {
            return null;
        }

        return pieces[pieceId] || null;
    }
);

export const ownedPieceSelector = (state: AppState) => {
    const playerId = localPlayerIdSelector(state);

    return Object.values(state.board.pieces).filter(p => p.ownerId === playerId);
};
