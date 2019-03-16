import { GRID_SIZE } from "./constants";
import { PokemonPiece } from "./pokemon-piece";

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
