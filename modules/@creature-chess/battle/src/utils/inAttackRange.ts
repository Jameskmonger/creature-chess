import { getDelta, PackedPosition } from "@creature-chess/board";

export const inAttackRange = (
	attacker: PackedPosition,
	target: PackedPosition,
	attackRange: number
) => {
	const { x: deltaX, y: deltaY } = getDelta(attacker, target);

	// Pieces cannot attack diagonally
	const result =
		Math.min(deltaX, deltaY) === 0 && Math.max(deltaX, deltaY) <= attackRange;
	return result;
};
