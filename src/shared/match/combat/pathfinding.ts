import { astar, Graph } from "javascript-astar";
import { GRID_SIZE } from "../../models/constants";
import { getAdjacentPositions, XYLocation } from "../../models/position";
import { Piece } from "../../models";

const createEmptyWeightGrid = () => {
    const grid: number[][] = [];

    for (let y = 0; y < GRID_SIZE; y++) {
        const row = [];

        for (let x = 0; x < GRID_SIZE; x++) {
            row.push(1);
        }

        grid.push(row);
    }

    return grid;
};

const createWeightGrid = (start: XYLocation, pieces: Piece[]) => {
    const grid = createEmptyWeightGrid();

    pieces.forEach(piece => {
        const { x, y } = piece.position;

        grid[x][y] = 0;
    });

    grid[start.x][start.y] = 1;

    return grid;
};

const findPath = (
    pieces: Piece[],
    start: XYLocation,
    end: XYLocation
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

    const firstStep: XYLocation = firstPathNode;

    return {
        stepCount: path.length,
        firstStep
    };
};

export const getNextPiecePosition = (piece: Piece, target: Piece, pieces: Piece[]): XYLocation => {
    const targetTiles = getAdjacentPositions(target);
    const paths = targetTiles.map(pos => findPath(pieces, piece.position, pos)).filter(path => path !== null);

    if (paths.length === 0) {
        return null;
    }

    paths.sort((a, b) => a.stepCount - b.stepCount);

    return paths[0].firstStep;
};
