import { PieceModel, TileCoordinates, getDelta } from "@creature-chess/models";

import { getStats } from "../../utils/getStats";
import { getLivingEnemies } from "../utils/getLivingEnemies";
import { getTargetAttackPositions } from "../utils/getTargetAttackPositions";
import { TargetProvider } from "./TargetProvider";
import { Board, Position } from "@creature-chess/board";
import { PieceRegistry } from "@creature-chess/utils";

type EnemyDelta = {
	enemy: PieceModel;
	enemyPosition: TileCoordinates;
	attackPosition: TileCoordinates;
	delta: TileCoordinates;
};

export class StandardTargetProvider implements TargetProvider {
	/**
	 * @inheritdoc
	 */
	public getTarget(
		board: Board,
		pieceRegistry: PieceRegistry,
		attackerId: string,
	): string | null {
		const piece = pieceRegistry.getPieceById(attackerId);

		if (!piece) {
			return null;
		}

		const attackRange = getStats(piece).attackType.range;

		const enemies = getLivingEnemies(piece, board, pieceRegistry);

		if (enemies.length === 0) {
			return null;
		}

		const attackerPos = board.getPiecePosition(piece.id);

		if (!attackerPos) {
			return null;
		}

		const enemyDeltas = this.getEnemiesInAttackRange(
			board,
			piece.id,
			enemies,
			attackerPos,
			attackRange
		);

		if (enemyDeltas.length === 0) {
			return null;
		}

		return this.chooseTarget(enemyDeltas, piece.facingAway).id;
	}

	private getEnemiesInAttackRange(
		board: Board,
		attackerId: string,
		enemies: PieceModel[],
		attackerPosition: Position,
		attackRange: number
	): EnemyDelta[] {
		const enemyDeltas: EnemyDelta[] = [];

		for (const enemy of enemies) {
			const enemyPosition = board.getPiecePosition(enemy.id);

			if (!enemyPosition) {
				continue;
			}

			// find all positions from which we can attack
			const attackPositions = getTargetAttackPositions(
				{ width: board.width, height: board.height },
				{ x: enemyPosition[0], y: enemyPosition[1] },
				attackRange
			);

			const emptyPositions = attackPositions.filter((position) => {
				const p = board.getPieceIdAtPosition(position.x, position.y);

				return p === null || p === attackerId;
			});

			if (emptyPositions.length === 0) {
				continue;
			}

			emptyPositions.sort((a, b) => {
				const ax = a.x - attackerPosition[0];
				const ay = a.y - attackerPosition[1];
				const bx = b.x - attackerPosition[0];
				const by = b.y - attackerPosition[1];

				return ax * ax + ay * ay - (bx * bx + by * by);
			});

			enemyDeltas.push({
				enemy,
				enemyPosition: { x: enemyPosition[0], y: enemyPosition[1] },
				attackPosition: emptyPositions[0],
				delta: getDelta(emptyPositions[0], { x: attackerPosition[0], y: attackerPosition[1] }),
			});
		}

		return enemyDeltas;
	}

	private chooseTarget(enemies: EnemyDelta[], facingNorth: boolean) {
		if (enemies.length === 0) {
			throw new Error("No enemies provided to chooseTarget");
		}

		const getSquaredDistance = (delta: TileCoordinates) =>
			delta.x * delta.x + delta.y * delta.y;
		const isInFacingDirection = (delta: EnemyDelta) =>
			facingNorth
				? delta.enemyPosition.y < delta.attackPosition.y
				: delta.enemyPosition.y > delta.attackPosition.y;

		enemies.sort((a, b) => {
			// 1. Primary sort: Distance (closest first)
			const distanceDiff =
				getSquaredDistance(a.delta) - getSquaredDistance(b.delta);
			if (distanceDiff !== 0) {
				return distanceDiff;
			}

			// 2. Secondary sort: Cost (highest first)
			const aCost = a.enemy.definition?.cost ?? 0;
			const bCost = b.enemy.definition?.cost ?? 0;
			const costDiff = bCost - aCost;
			if (costDiff !== 0) {
				return costDiff;
			}

			// 3. Tertiary sort: Facing direction preference
			const aFacing = isInFacingDirection(a);
			const bFacing = isInFacingDirection(b);
			if (aFacing !== bFacing) {
				return aFacing ? -1 : 1;
			}

			// 4. Final tiebreaker: ID (deterministic)
			return a.enemy.id < b.enemy.id ? -1 : 1;
		});

		return enemies[0].enemy;
	}
}
