import { TileCoordinates } from "@creature-chess/models";
import { BoardState } from "./state";

// todo add a position-for-id lookup to the board state to improve this
export const getPiecePosition = (state: BoardState, pieceId: string): TileCoordinates => {
    const entry = Object.entries(state.piecePositions)
        .find(([_, id]) => id === pieceId);

    if (!entry) {
        return null;
    }

    const [x, y] = entry[0].split(",")
        .map(x => parseInt(x, 10));

    return { x, y };
};
