import { PieceModel } from "@creature-chess/models";

import { getStats } from "./getStats";
import { getTypeAttackBonus } from "./typeRelations";

export const getHitDamage = (
	attacker: PieceModel,
	defender: PieceModel
): number => {
	const attackerStats = getStats(attacker);
	const defenderStats = getStats(defender);

	const attackBonus = getTypeAttackBonus(attacker.traits, defender.traits);

	return Math.ceil(
		(attackerStats.attack / defenderStats.defense) * attackBonus * 8
	);
};
