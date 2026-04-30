import {
	Board,
	BoardSize,
	PackedPosition,
	packPosition,
	unpackX,
	unpackY,
} from "@creature-chess/board";

import { getTargetAttackPositions } from "./targeting/utils/getTargetAttackPositions";

export type Path = { stepCount: number; firstStep: PackedPosition };

const findPathFirstStep = (
	board: Board,
	size: BoardSize,
	start: PackedPosition,
	goals: ReadonlySet<PackedPosition>,
	facingNorth: boolean
): Path | null => {
	if (goals.size === 0) {
		return null;
	}

	const forwardY = facingNorth ? -1 : 1;

	/**
	 * Forward, right, backward, left relative to the attacker's facing.
	 */
	const dx = [0, forwardY, 0, -forwardY];
	const dy = [forwardY, 0, -forwardY, 0];

	const width = size.width;
	const height = size.height;
	const visited = new Uint8Array(width * height);

	const startX = unpackX(start);
	const startY = unpackY(start);
	visited[startY * width + startX] = 1;

	/**
	 * Parallel arrays for the BFS queue - cheaper than an array of objects.
	 */
	const queuePos: number[] = [];
	const queueFirst: number[] = [];
	const queueDist: number[] = [];

	// Seed queue with start's neighbors. Each becomes its own firstStep.
	for (let i = 0; i < 4; i += 1) {
		const nx = startX + dx[i];
		const ny = startY + dy[i];
		if (nx < 0 || nx >= width || ny < 0 || ny >= height) {
			continue;
		}

		const cellIdx = ny * width + nx;
		if (visited[cellIdx]) {
			continue;
		}

		if (board.getPieceIdAtPosition(nx, ny) !== null) {
			continue;
		}

		visited[cellIdx] = 1;

		const packed = packPosition(nx, ny);
		if (goals.has(packed)) {
			return { stepCount: 1, firstStep: packed };
		}

		queuePos.push(packed);
		queueFirst.push(packed);
		queueDist.push(1);
	}

	let head = 0;
	while (head < queuePos.length) {
		const curPacked = queuePos[head];
		const curFirst = queueFirst[head];
		const curDist = queueDist[head];
		head += 1;

		const cx = unpackX(curPacked as PackedPosition);
		const cy = unpackY(curPacked as PackedPosition);

		for (let i = 0; i < 4; i += 1) {
			const nx = cx + dx[i];
			const ny = cy + dy[i];
			if (nx < 0 || nx >= width || ny < 0 || ny >= height) {
				continue;
			}
			const cellIdx = ny * width + nx;
			if (visited[cellIdx]) {
				continue;
			}
			if (board.getPieceIdAtPosition(nx, ny) !== null) {
				continue;
			}
			visited[cellIdx] = 1;
			const packed = packPosition(nx, ny);
			if (goals.has(packed)) {
				return {
					stepCount: curDist + 1,
					firstStep: curFirst as PackedPosition,
				};
			}
			queuePos.push(packed);
			queueFirst.push(curFirst);
			queueDist.push(curDist + 1);
		}
	}

	return null;
};

export const getNextPiecePosition = (
	pathfinder: Pathfinder,
	attackerPosition: PackedPosition,
	/**
	 * Is the attacker looking up the board? (i.e. facing negative y)
	 */
	attackerFacingUp: boolean,
	attackRange: number,
	targetPosition: PackedPosition,
	board: Board
): PackedPosition | null => {
	const size = pathfinder.getSize();

	const goalList = getTargetAttackPositions(size, targetPosition, attackRange);
	const goals = new Set<PackedPosition>(goalList);

	const result = findPathFirstStep(
		board,
		size,
		attackerPosition,
		goals,
		attackerFacingUp
	);

	if (!result) {
		return null;
	}

	if (unpackX(result.firstStep) < 0 || unpackY(result.firstStep) < 0) {
		throw new Error("Invalid path");
	}

	return result.firstStep;
};

/**
 * @note preserved for API compatibility.
 */
export class Pathfinder {
	public constructor(private readonly size: BoardSize) {}

	public getSize(): BoardSize {
		return this.size;
	}

	public getFirstStep(
		board: Board,
		start: PackedPosition,
		end: PackedPosition
	): Path | null {
		const goals = new Set<PackedPosition>([end]);
		return findPathFirstStep(board, this.size, start, goals, true);
	}
}
