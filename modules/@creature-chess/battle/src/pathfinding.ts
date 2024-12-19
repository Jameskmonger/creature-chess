import { astar, Graph } from "javascript-astar";

import { BoardState } from "@shoki/board";

import { TileCoordinates, CreatureStats } from "@creature-chess/models";

import { getTargetAttackPositions } from "./utils/getTargetAttackPositions";

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

export type Path = { stepCount: number; firstStep: TileCoordinates };

const pathNotNull = (path: Path | null): path is Path => path !== null;

export const getNextPiecePosition = (
	pathfinder: Pathfinder,
	attackerPosition: TileCoordinates,
	/**
	 * Is the attacker looking up the board? (i.e. facing negative y)
	 */
	attackerFacingUp: boolean,
	attackerStats: CreatureStats,
	targetPosition: TileCoordinates,
	board: BoardState
): TileCoordinates | null => {
	const {
		attackType: { range: attackRange },
	} = attackerStats;

	const targetTiles = getTargetAttackPositions(
		board.size,
		targetPosition,
		attackRange
	);

	const paths = targetTiles
		.map((pos) => pathfinder.getFirstStep(board, attackerPosition, pos))
		.filter(pathNotNull);

	if (paths.length === 0) {
		return null;
	}

	sortPaths(paths, attackerPosition, attackerFacingUp);

	if (paths[0].firstStep.x < 0 || paths[0].firstStep.y < 0) {
		throw new Error("Invalid path");
	}

	return paths[0].firstStep;
};

export function sortPaths(
	paths: Path[],
	startPos: TileCoordinates,
	facingNorth: boolean
) {
	// Forward is negative y if facing upwards, otherwise positive y
	const forwardY = facingNorth ? -1 : 1;
	const directionPriority = [
		{ x: 0, y: forwardY }, // Forward
		{ x: forwardY, y: 0 }, // Right
		{ x: 0, y: -forwardY }, // Backward
		{ x: -forwardY, y: 0 }, // Left
	];

	// Function to calculate the priority index of a step
	const getPriority = (step: TileCoordinates) => {
		const dx = step.x - startPos.x;
		const dy = step.y - startPos.y;
		return directionPriority.findIndex((dir) => dir.x === dx && dir.y === dy);
	};

	paths.sort((a, b) => {
		if (a.stepCount !== b.stepCount) {
			return a.stepCount - b.stepCount;
		}
		return getPriority(a.firstStep) - getPriority(b.firstStep);
	});
}

export class Pathfinder {
	private graph: Graph;

	public constructor(private size: BoardState["size"]) {
		const weights = createEmptyWeightGrid(size);
		this.graph = new Graph(weights);
	}

	public getFirstStep(
		board: BoardState,
		start: TileCoordinates,
		end: TileCoordinates
	): Path | null {
		const path = this.getPath(board, start, end);

		if (!path) {
			return null;
		}

		return {
			stepCount: path.length,
			firstStep: path[0],
		};
	}

	public getPath(
		board: BoardState,
		start: TileCoordinates,
		end: TileCoordinates
	): TileCoordinates[] | null {
		this.setWeights(board);

		// mark the start as walkable
		this.graph.grid[start.x][start.y].weight = 1;

		const startGraphItem = this.graph.grid[start.x][start.y];
		const endGraphItem = this.graph.grid[end.x][end.y];

		if (!startGraphItem || !endGraphItem) {
			throw new Error("Invalid start or end");
		}

		const path = astar.search(this.graph, startGraphItem, endGraphItem);

		console.log(start, end, path);

		if (path.length === 0) {
			return null;
		}

		return path;
	}

	public getGraph() {
		return this.graph;
	}

	private setWeights(board: BoardState) {
		let x = 0;
		let y = 0;
		for (const [position, pieceId] of Object.entries(board.piecePositions)) {
			[x, y] = position.split(",").map((p) => parseInt(p, 10));

			if (pieceId) {
				this.graph.grid[x][y].weight = 0;
			}
		}
	}

	private resetWeights() {
		for (let x = 0; x < this.size.width; x++) {
			for (let y = 0; y < this.size.height; y++) {
				this.graph.grid[x][y].weight = 1;
			}
		}
	}
}
