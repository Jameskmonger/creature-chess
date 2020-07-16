import { GRID_SIZE } from "./constants";
import { PieceModel } from "./piece";

export type TileCoordinates = { x: number, y: number };

export const createTileCoordinates = (x: number, y: number): TileCoordinates => ({ x, y });
export const arePositionsEqual = (a: TileCoordinates, b: TileCoordinates) => a && b && a.x === b.x && a.y === b.y;
export const subtract = (a: TileCoordinates, b: TileCoordinates) => ({ x: a.x - b.x, y: a.y - b.y });

export const Directions = {
    UP: { x: 0, y: -1 },
    RIGHT: { x: 1, y: 0 },
    DOWN: { x: 0, y: 1 },
    LEFT: { x: -1, y: 0 }
};

const isInsideGrid = (position: TileCoordinates) => {
    const { x, y } = position;

    return x >= 0 && y >= 0 && x < GRID_SIZE && y < GRID_SIZE;
};

export const getAdjacentPositions = (piece: PieceModel) => {
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
        return Directions.RIGHT;
    }
    if (from.x > to.x) {
        return Directions.LEFT;
    }
    if (from.y < to.y) {
        return Directions.DOWN;
    }
    if (from.y > to.y) {
        return Directions.UP;
    }
    return { x: 0, y: 0 };
};

export enum TileType {
    BOARD,
    BENCH
}

export enum TileStyle {
    DEFAULT,
    JAMES
}

export const inBench = ({ y }: TileCoordinates) => y === null;
// TODO: Make this use Constants.GRID_SIZE
export const inFriendlyBoard = ({ y }: TileCoordinates) => y > 3;
