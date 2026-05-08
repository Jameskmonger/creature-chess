import {
	Board,
	getDelta,
	PackedPosition,
	packPosition,
	Position,
	unpackX,
	unpackY,
} from "@creature-chess/board";
import { getDefinitionById, PieceModel } from "@creature-chess/models";
import { ReadablePieceRegistry } from "@creature-chess/utils";

import { PieceCombatState, PieceInfoStore } from "../../state";
import { getAttackRange } from "../../utils/getStats";
import { getLivingEnemies } from "../utils/getLivingEnemies";
import { getTargetAttackPositions } from "../utils/getTargetAttackPositions";
import { TargetProvider } from "./TargetProvider";

type EnemyDelta = {
	enemy: PieceModel;
	enemyPosition: PackedPosition;
	attackPosition: PackedPosition;
	delta: { x: number; y: number };
};

export class StandardTargetProvider implements TargetProvider {
	/**
	 * @inheritdoc
	 */
	public getTarget(
		board: Board,
		pieceRegistry: ReadablePieceRegistry,
		combatStore: PieceInfoStore<PieceCombatState>,
		attackerId: string
	): string | null {
		const piece = pieceRegistry.getPieceById(attackerId);

		if (!piece) {
			return null;
		}

		const attackRange = getAttackRange(piece);

		const enemies = getLivingEnemies(piece, board, pieceRegistry, combatStore);

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

		return this.chooseTarget(
			enemyDeltas,
			combatStore.getPiece(piece.id).facingAway
		).id;
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
				packPosition(enemyPosition[0], enemyPosition[1]),
				attackRange
			);

			const emptyPositions = attackPositions.filter((position) => {
				const p = board.getPieceIdAtPosition(
					unpackX(position),
					unpackY(position)
				);

				return p === null || p === attackerId;
			});

			if (emptyPositions.length === 0) {
				continue;
			}

			emptyPositions.sort((a, b) => {
				const ax = unpackX(a) - attackerPosition[0];
				const ay = unpackY(a) - attackerPosition[1];
				const bx = unpackX(b) - attackerPosition[0];
				const by = unpackY(b) - attackerPosition[1];

				return ax * ax + ay * ay - (bx * bx + by * by);
			});

			enemyDeltas.push({
				enemy,
				enemyPosition: packPosition(enemyPosition[0], enemyPosition[1]),
				attackPosition: emptyPositions[0],
				delta: getDelta(
					emptyPositions[0],
					packPosition(attackerPosition[0], attackerPosition[1])
				),
			});
		}

		return enemyDeltas;
	}

	private chooseTarget(enemies: EnemyDelta[], facingNorth: boolean) {
		if (enemies.length === 0) {
			throw new Error("No enemies provided to chooseTarget");
		}

		const getSquaredDistance = (delta: { x: number; y: number }) =>
			delta.x * delta.x + delta.y * delta.y;
		const isInFacingDirection = (delta: EnemyDelta) =>
			facingNorth
				? unpackY(delta.enemyPosition) < unpackY(delta.attackPosition)
				: unpackY(delta.enemyPosition) > unpackY(delta.attackPosition);

		const costs = new Map<string, number>();
		for (const { enemy } of enemies) {
			costs.set(enemy.id, getDefinitionById(enemy.definitionId)?.cost ?? 0);
		}

		enemies.sort((a, b) => {
			// 1. Primary sort: Distance (closest first)
			const distanceDiff =
				getSquaredDistance(a.delta) - getSquaredDistance(b.delta);
			if (distanceDiff !== 0) {
				return distanceDiff;
			}

			// 2. Secondary sort: Cost (highest first)
			const costDiff =
				(costs.get(b.enemy.id) ?? 0) - (costs.get(a.enemy.id) ?? 0);
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
