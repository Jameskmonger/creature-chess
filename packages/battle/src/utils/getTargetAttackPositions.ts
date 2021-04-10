import { createTileCoordinates, TileCoordinates } from "@creature-chess/models";
import { BoardState } from "@creature-chess/board";

const isInsideGrid = ({ width, height }: { width: number, height: number}) => (position: TileCoordinates) => {
    const { x, y } = position;

    return x >= 0 && y >= 0 && x < width && y < height;
};

export const getTargetAttackPositions = (board: BoardState, { x, y }: TileCoordinates, range = 1) => {
    const positions: TileCoordinates[] = [];

    for (let _x = x - range; _x <= x + range; _x++) {
        if (_x === x) {
            continue;
        }

        positions.push(createTileCoordinates(_x, y));
    }

    for (let _y = y - range; _y <= y + range; _y++) {
        if (_y === y) {
            continue;
        }

        positions.push(createTileCoordinates(x, _y));
    }

    // filter out any that are outside the grid
    return positions.filter(isInsideGrid(board.size));
};
