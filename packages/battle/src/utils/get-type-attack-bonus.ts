import { CreatureType } from "@creature-chess/models";

// overcome / generated are Tuxemon language
export const typeInteractions = {
	[CreatureType.Earth]: {
		generatedBy: CreatureType.Fire,
		overcomeBy: CreatureType.Wood
	},
	[CreatureType.Metal]: {
		generatedBy: CreatureType.Earth,
		overcomeBy: CreatureType.Fire
	},
	[CreatureType.Water]: {
		generatedBy: CreatureType.Metal,
		overcomeBy: CreatureType.Earth
	},
	[CreatureType.Wood]: {
		generatedBy: CreatureType.Water,
		overcomeBy: CreatureType.Metal
	},
	[CreatureType.Fire]: {
		generatedBy: CreatureType.Wood,
		overcomeBy: CreatureType.Water
	}
};

export const isGeneratedBy = (defender: CreatureType, attacker: CreatureType): boolean => typeInteractions[defender].generatedBy === attacker;
export const isOvercomeBy = (defender: CreatureType, attacker: CreatureType): boolean => typeInteractions[defender].overcomeBy === attacker;

export const getTypeAttackBonus = (attackType: CreatureType, defenceType: CreatureType) => {
	// an attack is strong against the element it overcomes, and weak against things that overcome the attacker

	const defenderInteractions = typeInteractions[defenceType];

	if (defenderInteractions.overcomeBy === attackType) {
		return 1.4;
	}

	const attackerInteractions = typeInteractions[defenceType];

	if (attackerInteractions.overcomeBy === defenceType) {
		return 0.7;
	}

	return 1;
};
