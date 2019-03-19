import { GRID_SIZE } from "./constants";
import { PokemonPiece, PiecePosition } from "./pokemon-piece";

export enum Direction {
    Up = "up",
    Right = "right",
    Down = "down",
    Left = "left",
    Unknown = "unknown"
}

const isInsideGrid = (position: [ number, number ]) => {
    const [ x, y ] = position;

    return x >= 0 && y >= 0 && x < GRID_SIZE && y < GRID_SIZE;
};

export const getAdjacentPositions = (piece: PokemonPiece) => {
    const [ pieceX, pieceY ] = piece.position;

    const positions: [ number, number ][] = [
        [ pieceX, pieceY - 1 ],
        [ pieceX - 1, pieceY ],
        [ pieceX + 1, pieceY ],
        [ pieceX, pieceY + 1 ]
    ];

    // filter out any that are outside the grid
    return positions.filter(isInsideGrid);
};

/**
 * Returns the relative direction of position b from the perspective of position a
 * @param from The position to find the direction relative from
 * @param to The position to find the direction relative to
 */
export const getRelativeDirection = (from: PiecePosition, to: PiecePosition) => {
    if (from[0] < to[0]) {
        return Direction.Right;
    }
    if (from[0] > to[0]) {
        return Direction.Left;
    }
    if (from[1] < to[1]) {
        return Direction.Down;
    }
    if (from[1] > to[1]) {
        return Direction.Up;
    }
    return Direction.Unknown;
};
