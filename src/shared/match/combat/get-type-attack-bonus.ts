import { CreatureType } from "../../models/creatureType";

export const getTypeAttackBonus = (attackType: CreatureType, defenceType: CreatureType) => {
    if (attackType === CreatureType.Fire) {
        if (
            defenceType === CreatureType.Fire
            || defenceType === CreatureType.Water
            || defenceType === CreatureType.Stone
        ) {
            return 0.5;
        }

        if (
            defenceType === CreatureType.Forest
        ) {
            return 2;
        }
    }

    if (attackType === CreatureType.Water) {
        if (
            defenceType === CreatureType.Water
            || defenceType === CreatureType.Forest
        ) {
            return 0.5;
        }

        if (
            defenceType === CreatureType.Fire
            || defenceType === CreatureType.Stone
        ) {
            return 2;
        }
    }

    if (attackType === CreatureType.Forest) {
        if (
            defenceType === CreatureType.Fire
            || defenceType === CreatureType.Forest
        ) {
            return 0.5;
        }

        if (
            defenceType === CreatureType.Water
            || defenceType === CreatureType.Stone
        ) {
            return 2;
        }
    }
    if (attackType === CreatureType.Stone) {
        if (defenceType === CreatureType.Fire) {
            return 2;
        }
    }

    return 1;
};
