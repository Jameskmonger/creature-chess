import { BoardState } from "@shoki/board";

import { TileCoordinates, CreatureStats } from "@creature-chess/models";

import { getTargetAttackPositions } from "./utils/getTargetAttackPositions";

// no typings so this needs a standard require
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { astar, Graph } = require("javascript-astar");

const createEmptyWeightGrid = ({
	width,
	height,
}: {
	width: number;
	height: number;
}) => {
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

	Object.entries(board.piecePositions).forEach(([position, pieceId]) => {
		const [x, y] = position.split(",").map((p) => parseInt(p, 10));

		if (pieceId) {
			grid[x][y] = 0;
		}
	});

	grid[start.x][start.y] = 1;

	return grid;
};

type Path = { stepCount: number; firstStep: TileCoordinates };

const findPath = (
	board: BoardState,
	start: TileCoordinates,
	end: TileCoordinates
): Path | null => {
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
		firstStep,
	};
};

const pathNotNull = (path: Path | null): path is Path => path !== null;

export const getNextPiecePosition = (
	attackerPosition: TileCoordinates,
	attackerStats: CreatureStats,
	targetPosition: TileCoordinates,
	board: BoardState
): TileCoordinates | null => {
	const {
		attackType: { range: attackRange },
	} = attackerStats;

	const targetTiles = getTargetAttackPositions(
		board,
		targetPosition,
		attackRange
	);
	const paths = targetTiles
		.map((pos) => findPath(board, attackerPosition, pos))
		.filter(pathNotNull);

	if (paths.length === 0) {
		return null;
	}

	paths.sort((a, b) => a.stepCount - b.stepCount);

	return paths[0].firstStep;
};
