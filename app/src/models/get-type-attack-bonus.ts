import { PokemonType } from "./pokemon-type";

export const getTypeAttackBonus = (attackType: PokemonType, defenceType: PokemonType) => {
    if (attackType === PokemonType.Normal) {
        if (defenceType === PokemonType.Rock) {
            return 0.5;
        }

        if (defenceType === PokemonType.Ghost) {
            return 0;
        }
    }

    if (attackType === PokemonType.Fire) {
        if (
            defenceType === PokemonType.Fire
            || defenceType === PokemonType.Water
            || defenceType === PokemonType.Rock
        ) {
            return 0.5;
        }

        if (
            defenceType === PokemonType.Grass
            || defenceType === PokemonType.Bug
        ) {
            return 2;
        }
    }

    if (attackType === PokemonType.Water) {
        if (
            defenceType === PokemonType.Water
            || defenceType === PokemonType.Grass
        ) {
            return 0.5;
        }

        if (
            defenceType === PokemonType.Fire
            || defenceType === PokemonType.Ground
            || defenceType === PokemonType.Rock
        ) {
            return 2;
        }
    }

    if (attackType === PokemonType.Electric) {
        if (
            defenceType === PokemonType.Electric
            || defenceType === PokemonType.Grass
        ) {
            return 0.5;
        }

        if (
            defenceType === PokemonType.Water
            || defenceType === PokemonType.Flying
        ) {
            return 2;
        }

        if (defenceType === PokemonType.Ground) {
            return 0;
        }
    }

    if (attackType === PokemonType.Grass) {
        if (
            defenceType === PokemonType.Fire
            || defenceType === PokemonType.Grass
            || defenceType === PokemonType.Poison
            || defenceType === PokemonType.Flying
            || defenceType === PokemonType.Bug
        ) {
            return 0.5;
        }

        if (
            defenceType === PokemonType.Water
            || defenceType === PokemonType.Ground
            || defenceType === PokemonType.Rock
        ) {
            return 2;
        }
    }

    if (attackType === PokemonType.Fighting) {
        if (
            defenceType === PokemonType.Poison
            || defenceType === PokemonType.Flying
            || defenceType === PokemonType.Psychic
            || defenceType === PokemonType.Bug
        ) {
            return 0.5;
        }

        if (
            defenceType === PokemonType.Normal
            || defenceType === PokemonType.Rock
        ) {
            return 2;
        }
    }

    if (attackType === PokemonType.Poison) {
        if (
            defenceType === PokemonType.Poison
            || defenceType === PokemonType.Ground
            || defenceType === PokemonType.Rock
            || defenceType === PokemonType.Ghost
        ) {
            return 0.5;
        }

        if (
            defenceType === PokemonType.Grass
            || defenceType === PokemonType.Bug
        ) {
            return 2;
        }
    }

    if (attackType === PokemonType.Ground) {
        if (
            defenceType === PokemonType.Grass
            || defenceType === PokemonType.Bug
        ) {
            return 0.5;
        }

        if (
            defenceType === PokemonType.Fire
            || defenceType === PokemonType.Electric
            || defenceType === PokemonType.Poison
            || defenceType === PokemonType.Rock
        ) {
            return 2;
        }

        if (defenceType === PokemonType.Flying) {
            return 0;
        }
    }

    if (attackType === PokemonType.Flying) {
        if (
            defenceType === PokemonType.Electric
            || defenceType === PokemonType.Rock
        ) {
            return 0.5;
        }

        if (
            defenceType === PokemonType.Grass
            || defenceType === PokemonType.Fighting
            || defenceType === PokemonType.Bug
        ) {
            return 2;
        }
    }

    if (attackType === PokemonType.Psychic) {
        if (defenceType === PokemonType.Electric) {
            return 0.5;
        }

        if (
            defenceType === PokemonType.Fighting
            || defenceType === PokemonType.Poison
        ) {
            return 2;
        }
    }

    if (attackType === PokemonType.Bug) {
        if (
            defenceType === PokemonType.Fire
            || defenceType === PokemonType.Fighting
            || defenceType === PokemonType.Flying
            || defenceType === PokemonType.Ghost
        ) {
            return 0.5;
        }

        if (
            defenceType === PokemonType.Grass
            || defenceType === PokemonType.Poison
            || defenceType === PokemonType.Psychic
        ) {
            return 2;
        }
    }

    if (attackType === PokemonType.Rock) {
        if (
            defenceType === PokemonType.Fighting
            || defenceType === PokemonType.Ground
        ) {
            return 0.5;
        }

        if (
            defenceType === PokemonType.Fire
            || defenceType === PokemonType.Flying
            || defenceType === PokemonType.Bug
        ) {
            return 2;
        }
    }

    if (attackType === PokemonType.Ghost) {
        if (
            defenceType === PokemonType.Normal
            || defenceType === PokemonType.Psychic
        ) {
            return 0;
        }

        if (defenceType === PokemonType.Ghost) {
            return 2;
        }
    }

    return 1;
};
