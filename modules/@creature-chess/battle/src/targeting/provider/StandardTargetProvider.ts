import { BoardSelectors, BoardState } from "@shoki/board";

import { PieceModel, TileCoordinates, getDelta } from "@creature-chess/models";

import { getStats } from "../../utils/getStats";
import { getLivingEnemies } from "../utils/getLivingEnemies";
import { getTargetAttackPositions } from "../utils/getTargetAttackPositions";
import { TargetProvider } from "./TargetProvider";

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
		piece: PieceModel,
		board: BoardState<PieceModel>
	): string | null {
		const attackRange = getStats(piece).attackType.range;

		const enemies = getLivingEnemies(piece, board);

		if (enemies.length === 0) {
			return null;
		}

		const attackerPos = BoardSelectors.getPiecePosition(board, piece.id);

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

		return this.chooseTarget(enemyDeltas, piece.facingAway).id;
	}

	private getEnemiesInAttackRange(
		board: BoardState,
		attackerId: string,
		enemies: PieceModel[],
		attackerPosition: TileCoordinates,
		attackRange: number
	): EnemyDelta[] {
		const enemyDeltas: EnemyDelta[] = [];

		for (const enemy of enemies) {
			const enemyPosition = BoardSelectors.getPiecePosition(board, enemy.id);

			if (!enemyPosition) {
				continue;
			}

			// find all positions from which we can attack
			const attackPositions = getTargetAttackPositions(
				board.size,
				enemyPosition,
				attackRange
			);

			const emptyPositions = attackPositions.filter((position) => {
				const key = `${position.x},${position.y}`;

				return (
					!board.piecePositions[key] || board.piecePositions[key] === attackerId
				);
			});

			emptyPositions.sort((a, b) => {
				const ax = a.x - attackerPosition.x;
				const ay = a.y - attackerPosition.y;
				const bx = b.x - attackerPosition.x;
				const by = b.y - attackerPosition.y;

				return ax * ax + ay * ay - (bx * bx + by * by);
			});

			enemyDeltas.push({
				enemy,
				enemyPosition,
				attackPosition: emptyPositions[0],
				delta: getDelta(emptyPositions[0], attackerPosition),
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
