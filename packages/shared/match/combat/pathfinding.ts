import { astar, Graph } from "javascript-astar";
import { PieceModel } from "@creature-chess/models";
import { GRID_SIZE } from "@creature-chess/models/constants";
import { getAdjacentPositions, TileCoordinates } from "@creature-chess/models/src/position";
import { BoardState } from "../../board";

const createEmptyWeightGrid = () => {
    const grid: number[][] = [];

    // todo this is a weird way round
    for (let x = 0; x < GRID_SIZE.width; x++) {
        const column = [];

        for (let y = 0; y < GRID_SIZE.height; y++) {
            column.push(1);
        }

        grid.push(column);
    }

    return grid;
};

const createWeightGrid = (start: TileCoordinates, board: BoardState) => {
    const grid = createEmptyWeightGrid();

    Object.entries(board.piecePositions)
        .forEach(([ position, pieceId ]) => {
            const [ x, y ] = position.split(",");

            grid[x][y] = 0;
        });

    grid[start.x][start.y] = 1;

    return grid;
};

const findPath = (
    board: BoardState,
    start: TileCoordinates,
    end: TileCoordinates
) => {
    const weights = createWeightGrid(start, board);
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

export const getNextPiecePosition = (piece: PieceModel, target: PieceModel, board: BoardState): TileCoordinates => {
    const targetTiles = getAdjacentPositions(target);
    const paths = targetTiles.map(pos => findPath(board, piece.position, pos)).filter(path => path !== null);

    if (paths.length === 0) {
        return null;
    }

    paths.sort((a, b) => a.stepCount - b.stepCount);

    return paths[0].firstStep;
};
