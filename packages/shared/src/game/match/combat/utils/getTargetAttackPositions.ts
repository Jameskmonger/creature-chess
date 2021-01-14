import { createTileCoordinates, GRID_SIZE, PieceModel, TileCoordinates } from "@creature-chess/models";

const isInsideGrid = (position: TileCoordinates) => {
    const { x, y } = position;

    return x >= 0 && y >= 0 && x < GRID_SIZE.width && y < GRID_SIZE.height;
};

export const getTargetAttackPositions = (target: { position: TileCoordinates }, range = 1) => {
    const { x, y } = target.position;
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
    return positions.filter(isInsideGrid);
};
