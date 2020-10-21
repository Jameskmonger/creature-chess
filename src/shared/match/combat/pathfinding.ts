import { astar, Graph } from "javascript-astar";
import { PieceModel } from "@common/models";
import { GRID_SIZE } from "@common/models/constants";
import { getAdjacentPositions, TileCoordinates } from "@common/models/position";

const createEmptyWeightGrid = () => {
    const grid: number[][] = [];

    for (let y = 0; y < GRID_SIZE.height; y++) {
        const row = [];

        for (let x = 0; x < GRID_SIZE.width; x++) {
            row.push(1);
        }

        grid.push(row);
    }

    return grid;
};

const createWeightGrid = (start: TileCoordinates, pieces: PieceModel[]) => {
    const grid = createEmptyWeightGrid();

    pieces.forEach(piece => {
        const { x, y } = piece.position;

        grid[x][y] = 0;
    });

    grid[start.x][start.y] = 1;

    return grid;
};

const findPath = (
    pieces: PieceModel[],
    start: TileCoordinates,
    end: TileCoordinates
) => {
    const weights = createWeightGrid(start, pieces);
    const graph = new Graph(weights);

    const startGraphItem = graph.grid[start.x][start.y];
    const endGraphItem = graph.grid[end.x][end.y];

    const path = astar.search(graph, startGraphItem, endGraphItem);
    const firstPathNode = path[0];

    if (!firstPathNode) {
        return null;
    }

    const firstStep: TileCoordinates = firstPathNode;

    return {
        stepCount: path.length,
        firstStep
    };
};

export const getNextPiecePosition = (piece: PieceModel, target: PieceModel, pieces: PieceModel[]): TileCoordinates => {
    const targetTiles = getAdjacentPositions(target);
    const paths = targetTiles.map(pos => findPath(pieces, piece.position, pos)).filter(path => path !== null);

    if (paths.length === 0) {
        return null;
    }

    paths.sort((a, b) => a.stepCount - b.stepCount);

    return paths[0].firstStep;
};
