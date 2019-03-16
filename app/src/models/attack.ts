import { PokemonPiece, initialCoolDown } from "./pokemon-piece";
import { getTypeAttackBonus } from "./get-type-attack-bonus";
import { PokemonStats } from "./pokemon-stats";
import { Direction } from "./direction";

export interface AttackDetails {
    direction: Direction;
    damage: number;
}

export interface HitDetails {
    direction: Direction;
    damage: number;
}

export const attack = (attacker: PokemonPiece, attackerStats: PokemonStats, defender: PokemonPiece, defenderStats: PokemonStats) => {
    if (attacker.currentHealth === 0) {
        // Dead Pokémon don't attack
        return { attacker, defender };
    }

    const attackBonus = getTypeAttackBonus(attackerStats.type, defenderStats.type);
    const damage = (attackerStats.attack / defenderStats.defense) * attackBonus * 10;
    const newDefenderHealth = Math.max(defender.currentHealth - damage, 0);

    return {
        attacker: { ...attacker, coolDown: initialCoolDown, attacking: { direction: getRelativeDirection(attacker, defender), damage } },
        defender: { ...defender, currentHealth: newDefenderHealth, hit: { direction: getRelativeDirection(defender, attacker), damage } }
    };
};

/**
 * Returns the relative direction of piece b from the perspective of piece a
 * @param a The piece to find the direction relative from
 * @param b The piece to find the direction relative to
 */
const getRelativeDirection = (a: PokemonPiece, b: PokemonPiece) => {
    if (a.position[0] < b.position[0]) {
        return Direction.Right;
    }
    if (a.position[0] > b.position[0]) {
        return Direction.Left;
    }
    if (a.position[1] < b.position[1]) {
        return Direction.Down;
    }
    if (a.position[1] > b.position[1]) {
        return Direction.Up;
    }
    return Direction.Unknown;
};
