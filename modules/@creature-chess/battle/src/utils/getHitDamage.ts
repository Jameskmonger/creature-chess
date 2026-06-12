import { CreatureLookup, PieceModel } from "@creature-chess/models";

import { getStats } from "./getStats";
import { getTypeAttackBonus } from "./typeRelations";

export const getHitDamage = (
	attacker: PieceModel,
	defender: PieceModel,
	creatures: CreatureLookup
): number => {
	const attackerStats = getStats(attacker, creatures);
	const defenderStats = getStats(defender, creatures);

	const attackBonus = getTypeAttackBonus(attacker.traits, defender.traits);

	return Math.ceil(
		(attackerStats.attack / defenderStats.defense) * attackBonus * 4
	);
};
