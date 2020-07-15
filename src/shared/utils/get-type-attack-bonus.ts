import { CreatureType } from "../models/creatureType";

// overcome / generated are Tuxemon language
const typeInteractions = {
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

export const getTypeAttackBonus = (attackType: CreatureType, defenceType: CreatureType) => {
    // an attack is weak against the element that it Generates and strong against the element that it Overcomes.
    const defenderInteractions = typeInteractions[defenceType];

    if (defenderInteractions.generatedBy === attackType) {
        return 0.7;
    }

    if (defenderInteractions.overcomeBy === attackType) {
        return 1.4;
    }

    return 1;
};
