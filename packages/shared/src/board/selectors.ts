import { TileCoordinates } from "@creature-chess/models";
import { BoardState } from "./state";

// todo add a position-for-id lookup to the board state to improve this
export const getPiecePosition = (state: BoardState, pieceId: string): TileCoordinates => {
    const [x, y] = Object.entries(state.piecePositions)
        .find(([_, id]) => id === pieceId)[0]
        .split(",")
        .map(x => parseInt(x, 10));

    return { x, y };
};
