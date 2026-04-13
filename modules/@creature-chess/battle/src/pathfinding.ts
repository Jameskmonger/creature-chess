/// <reference path="../types/javascript-astar.d.ts" />
import { astar, Graph } from "javascript-astar";

import { Board, BoardSize, PackedPosition, packPosition, unpackX, unpackY } from "@creature-chess/board";
import { CreatureStats } from "@creature-chess/models";

import { getTargetAttackPositions } from "./targeting/utils/getTargetAttackPositions";

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

export type Path = { stepCount: number; firstStep: PackedPosition };

const pathNotNull = (path: Path | null): path is Path => path !== null;

export const getNextPiecePosition = (
	pathfinder: Pathfinder,
	attackerPosition: PackedPosition,
	/**
	 * Is the attacker looking up the board? (i.e. facing negative y)
	 */
	attackerFacingUp: boolean,
	attackerStats: CreatureStats,
	targetPosition: PackedPosition,
	board: Board
): PackedPosition | null => {
	const {
		attackType: { range: attackRange },
	} = attackerStats;

	const targetTiles = getTargetAttackPositions(
		{ width: board.width, height: board.height },
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

	if (unpackX(paths[0].firstStep) < 0 || unpackY(paths[0].firstStep) < 0) {
		throw new Error("Invalid path");
	}

	return paths[0].firstStep;
};

export function sortPaths(
	paths: Path[],
	startPos: PackedPosition,
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

	const getPriority = (step: PackedPosition) => {
		const dx = unpackX(step) - unpackX(startPos);
		const dy = unpackY(step) - unpackY(startPos);
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

	public constructor(private size: BoardSize) {
		const weights = createEmptyWeightGrid(size);
		this.graph = new Graph(weights);
	}

	public getFirstStep(
		board: Board,
		start: PackedPosition,
		end: PackedPosition
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
		board: Board,
		start: PackedPosition,
		end: PackedPosition
	): PackedPosition[] | null {
		this.setWeights(board);

		// mark the start as walkable
		this.graph.grid[unpackX(start)][unpackY(start)].weight = 1;

		const startGraphItem = this.graph.grid[unpackX(start)][unpackY(start)];
		const endGraphItem = this.graph.grid[unpackX(end)][unpackY(end)];

		if (!startGraphItem || !endGraphItem) {
			throw new Error("Invalid start or end");
		}

		const path = astar.search(this.graph, startGraphItem, endGraphItem);

		if (path.length === 0) {
			return null;
		}

		return path.map((node) => packPosition(node.x, node.y));
	}

	public getGraph() {
		return this.graph;
	}

	private setWeights(board: Board) {
		for (let x = 0; x < this.size.width; x++) {
			for (let y = 0; y < this.size.height; y++) {
				this.graph.grid[x][y].weight =
					board.getPieceIdAtPosition(x, y) !== null ? 0 : 1;
			}
		}
	}
}
