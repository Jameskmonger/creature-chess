import { GRID_SIZE } from "./constants";
import { Piece } from "./models";

export type TileCoordinates = { x: number, y: number };

export const createTileCoordinates = (x: number, y: number): TileCoordinates => ({ x, y });
export const arePositionsEqual = (a: TileCoordinates, b: TileCoordinates) => a && b && a.x === b.x && a.y === b.y;

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

export const getAdjacentPositions = (piece: Piece) => {
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

export enum TileType {
    BOARD,
    BENCH
}

export const inBench = ({ y }: TileCoordinates) => y === null;
// TODO: Make this use Constants.GRID_SIZE
export const inFriendlyBoard = ({ y }: TileCoordinates) => y > 3;