import { astar, Graph } from "javascript-astar";
import { PokemonPiece } from "./pokemon-piece";
import { GRID_SIZE } from "./constants";
import { getAdjacentPositions } from "./position";

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

const createWeightGrid = (start: [ number, number ], pieces: PokemonPiece[]) => {
    const grid = createEmptyWeightGrid();

    pieces.forEach(piece => {
        const [x, y] = piece.position;

        grid[x][y] = 0;
    });

    const [ startX, startY ] = start;

    grid[startX][startY] = 1;

    return grid;
};

const findPath = (
    pieces: PokemonPiece[],
    start: [ number, number ],
    end: [ number, number ]
) => {
    const weights = createWeightGrid(start, pieces);
    const graph = new Graph(weights);

    const [ startX, startY ] = start;
    const [ endX, endY ] = end;

    const startGraphItem = graph.grid[startX][startY];
    const endGraphItem = graph.grid[endX][endY];

    const path = astar.search(graph, startGraphItem, endGraphItem);
    const firstPathNode = path[0];

    if (!firstPathNode) {
        return null;
    }

    const firstStep: [ number, number ] = [ firstPathNode.x, firstPathNode.y ];

    return {
        stepCount: path.length,
        firstStep
    };
};

export const getNextPiecePosition = (piece: PokemonPiece, target: PokemonPiece, pieces: PokemonPiece[]): [ number, number ] => {
    const targetTiles = getAdjacentPositions(target);
    const paths = targetTiles.map(pos => findPath(pieces, piece.position, pos)).filter(path => path !== null);

    if (paths.length === 0) {
        return null;
    }

    paths.sort((a, b) => a.stepCount - b.stepCount);

    return paths[0].firstStep;
};
