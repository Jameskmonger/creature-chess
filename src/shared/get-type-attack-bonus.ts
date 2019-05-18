import { CreatureType } from "./models/creatureType";

export const getTypeAttackBonus = (attackType: CreatureType, defenceType: CreatureType) => {
    if (attackType === CreatureType.Normal) {
        if (defenceType === CreatureType.Rock) {
            return 0.5;
        }

        if (defenceType === CreatureType.Ghost) {
            return 0;
        }
    }

    if (attackType === CreatureType.Fire) {
        if (
            defenceType === CreatureType.Fire
            || defenceType === CreatureType.Water
            || defenceType === CreatureType.Rock
        ) {
            return 0.5;
        }

        if (
            defenceType === CreatureType.Grass
            || defenceType === CreatureType.Bug
        ) {
            return 2;
        }
    }

    if (attackType === CreatureType.Water) {
        if (
            defenceType === CreatureType.Water
            || defenceType === CreatureType.Grass
        ) {
            return 0.5;
        }

        if (
            defenceType === CreatureType.Fire
            || defenceType === CreatureType.Ground
            || defenceType === CreatureType.Rock
        ) {
            return 2;
        }
    }

    if (attackType === CreatureType.Electric) {
        if (
            defenceType === CreatureType.Electric
            || defenceType === CreatureType.Grass
        ) {
            return 0.5;
        }

        if (
            defenceType === CreatureType.Water
            || defenceType === CreatureType.Flying
        ) {
            return 2;
        }

        if (defenceType === CreatureType.Ground) {
            return 0;
        }
    }

    if (attackType === CreatureType.Grass) {
        if (
            defenceType === CreatureType.Fire
            || defenceType === CreatureType.Grass
            || defenceType === CreatureType.Poison
            || defenceType === CreatureType.Flying
            || defenceType === CreatureType.Bug
        ) {
            return 0.5;
        }

        if (
            defenceType === CreatureType.Water
            || defenceType === CreatureType.Ground
            || defenceType === CreatureType.Rock
        ) {
            return 2;
        }
    }

    if (attackType === CreatureType.Fighting) {
        if (
            defenceType === CreatureType.Poison
            || defenceType === CreatureType.Flying
            || defenceType === CreatureType.Psychic
            || defenceType === CreatureType.Bug
        ) {
            return 0.5;
        }

        if (
            defenceType === CreatureType.Normal
            || defenceType === CreatureType.Rock
        ) {
            return 2;
        }
    }

    if (attackType === CreatureType.Poison) {
        if (
            defenceType === CreatureType.Poison
            || defenceType === CreatureType.Ground
            || defenceType === CreatureType.Rock
            || defenceType === CreatureType.Ghost
        ) {
            return 0.5;
        }

        if (
            defenceType === CreatureType.Grass
            || defenceType === CreatureType.Bug
        ) {
            return 2;
        }
    }

    if (attackType === CreatureType.Ground) {
        if (
            defenceType === CreatureType.Grass
            || defenceType === CreatureType.Bug
        ) {
            return 0.5;
        }

        if (
            defenceType === CreatureType.Fire
            || defenceType === CreatureType.Electric
            || defenceType === CreatureType.Poison
            || defenceType === CreatureType.Rock
        ) {
            return 2;
        }

        if (defenceType === CreatureType.Flying) {
            return 0;
        }
    }

    if (attackType === CreatureType.Flying) {
        if (
            defenceType === CreatureType.Electric
            || defenceType === CreatureType.Rock
        ) {
            return 0.5;
        }

        if (
            defenceType === CreatureType.Grass
            || defenceType === CreatureType.Fighting
            || defenceType === CreatureType.Bug
        ) {
            return 2;
        }
    }

    if (attackType === CreatureType.Psychic) {
        if (defenceType === CreatureType.Electric) {
            return 0.5;
        }

        if (
            defenceType === CreatureType.Fighting
            || defenceType === CreatureType.Poison
        ) {
            return 2;
        }
    }

    if (attackType === CreatureType.Bug) {
        if (
            defenceType === CreatureType.Fire
            || defenceType === CreatureType.Fighting
            || defenceType === CreatureType.Flying
            || defenceType === CreatureType.Ghost
        ) {
            return 0.5;
        }

        if (
            defenceType === CreatureType.Grass
            || defenceType === CreatureType.Poison
            || defenceType === CreatureType.Psychic
        ) {
            return 2;
        }
    }

    if (attackType === CreatureType.Rock) {
        if (
            defenceType === CreatureType.Fighting
            || defenceType === CreatureType.Ground
        ) {
            return 0.5;
        }

        if (
            defenceType === CreatureType.Fire
            || defenceType === CreatureType.Flying
            || defenceType === CreatureType.Bug
        ) {
            return 2;
        }
    }

    if (attackType === CreatureType.Ghost) {
        if (
            defenceType === CreatureType.Normal
            || defenceType === CreatureType.Psychic
        ) {
            return 0;
        }

        if (defenceType === CreatureType.Ghost) {
            return 2;
        }
    }

    return 1;
};
