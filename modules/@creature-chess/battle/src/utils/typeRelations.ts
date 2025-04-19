import { TraitId } from "@creature-chess/models/gamemode/traits";

// overcome / generated are Tuxemon language
export const typeInteractions: Partial<
	Record<TraitId, { generatedBy: TraitId; overcomeBy: TraitId }>
> = {
	["earth"]: {
		generatedBy: "fire",
		overcomeBy: "wood",
	},
	["metal"]: {
		generatedBy: "earth",
		overcomeBy: "fire",
	},
	["water"]: {
		generatedBy: "metal",
		overcomeBy: "earth",
	},
	["wood"]: {
		generatedBy: "water",
		overcomeBy: "metal",
	},
	["fire"]: {
		generatedBy: "wood",
		overcomeBy: "water",
	},
};

export const isGeneratedBy = (defender: TraitId, attacker: TraitId): boolean =>
	typeInteractions[defender]?.generatedBy === attacker;
export const isOvercomeBy = (defender: TraitId, attacker: TraitId): boolean =>
	typeInteractions[defender]?.overcomeBy === attacker;

const STRONG_ATTACK_MODIFIER = 1.7;
const WEAK_ATTACK_MODIFIER = 0.3;

export const getTypeAttackBonus = (
	attackerTraits: TraitId[],
	defenderTraits: TraitId[]
) => {
	// are any of the defenders traits overcome by the attackers traits?
	const defenderOvercome = defenderTraits.some((defenceType) =>
		attackerTraits.some((attackType) => isOvercomeBy(defenceType, attackType))
	);

	if (defenderOvercome) {
		return STRONG_ATTACK_MODIFIER;
	}

	// are any of the attackers traits overcome by the defenders traits?
	const attackerOvercome = attackerTraits.some((attackType) =>
		defenderTraits.some((defenceType) => isOvercomeBy(defenceType, attackType))
	);
	if (attackerOvercome) {
		return WEAK_ATTACK_MODIFIER;
	}

	return 1;
};
