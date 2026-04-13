import { AttackType } from "@creature-chess/models";
import { getDelta, PackedPosition } from "@creature-chess/board";

export const inAttackRange = (
	attacker: PackedPosition,
	target: PackedPosition,
	attackType: AttackType
) => {
	const { x: deltaX, y: deltaY } = getDelta(attacker, target);

	// Pieces cannot attack diagonally
	const result =
		Math.min(deltaX, deltaY) === 0 &&
		Math.max(deltaX, deltaY) <= attackType.range;
	return result;
};
