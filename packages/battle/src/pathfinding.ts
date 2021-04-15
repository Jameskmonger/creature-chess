import { astar, Graph } from "javascript-astar";
import { TileCoordinates, CreatureStats } from "@creature-chess/models";
import { BoardState } from "@creature-chess/board";
import { getTargetAttackPositions } from "./utils/getTargetAttackPositions";

const createEmptyWeightGrid = ({ width, height }: { width: number, height: number }) => {
    const grid: number[][] = [];

    // todo this is a weird way round
    for (let x = 0; x < width; x++) {
        const column = [];

        for (let y = 0; y < height; y++) {
            column.push(1);
        }

        grid.push(column);
    }

    return grid;
};

const createWeightGrid = (start: TileCoordinates, board: BoardState) => {
    const grid = createEmptyWeightGrid(board.size);

    Object.entries(board.piecePositions)
        .forEach(([position, pieceId]) => {
            const [x, y] = position.split(",");

            if (pieceId) {
                grid[x][y] = 0;
            }
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

export const getNextPiecePosition = (
    attackerPosition: TileCoordinates,
    attackerStats: CreatureStats,
    targetPosition: TileCoordinates,
    board: BoardState
): TileCoordinates => {
    const { attackType: { range: attackRange } } = attackerStats;

    const targetTiles = getTargetAttackPositions(board, targetPosition, attackRange);
    const paths = targetTiles.map(pos => findPath(board, attackerPosition, pos)).filter(path => path !== null);

    if (paths.length === 0) {
        return null;
    }

    paths.sort((a, b) => a.stepCount - b.stepCount);

    return paths[0].firstStep;
};
