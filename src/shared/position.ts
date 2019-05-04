import { GRID_SIZE } from "./constants";
import { BoardPokemonPiece } from "./pokemon-piece";

export type TileCoordinates = { x: number, y: number };

export const createTileCoordinates = (x: number, y: number): TileCoordinates => ({ x, y });

export enum Direction {
    Up = "up",
    Right = "right",
    Down = "down",
    Left = "left",
    Unknown = "unknown"
}

const isInsideGrid = (position: TileCoordinates) => {
    const { x, y } = position;

    return x >= 0 && y >= 0 && x < GRID_SIZE && y < GRID_SIZE;
};

export const getAdjacentPositions = (piece: BoardPokemonPiece) => {
    const { x, y } = piece.position;

    const positions: TileCoordinates[] = [
        createTileCoordinates(x, y - 1),
        createTileCoordinates(x - 1, y),
        createTileCoordinates(x + 1, y),
        createTileCoordinates(x, y + 1)
    ];

    // filter out any that are outside the grid
    return positions.filter(isInsideGrid);
};

/**
 * Returns the relative direction of position b from the perspective of position a
 * @param from The position to find the direction relative from
 * @param to The position to find the direction relative to
 */
export const getRelativeDirection = (from: TileCoordinates, to: TileCoordinates) => {
    if (from.x < to.x) {
        return Direction.Right;
    }
    if (from.x > to.x) {
        return Direction.Left;
    }
    if (from.y < to.y) {
        return Direction.Down;
    }
    if (from.y > to.y) {
        return Direction.Up;
    }
    return Direction.Unknown;
};
