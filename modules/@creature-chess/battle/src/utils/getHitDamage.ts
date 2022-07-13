import { PieceModel } from "@creature-chess/models";

import { getStats } from "./getStats";
import { getTypeAttackBonus } from "./typeRelations";

export const getHitDamage = (
	attacker: PieceModel,
	defender: PieceModel
): number => {
	const attackerStats = getStats(attacker);
	const defenderStats = getStats(defender);

	const attackBonus = getTypeAttackBonus(
		attacker.definition.type,
		defender.definition.type
	);
	return (attackerStats.attack / defenderStats.defense) * attackBonus * 8; // todo tweak this
};
