import { getTypeAttackBonus } from "./get-type-attack-bonus";
import { PokemonStats } from "./pokemon-stats";
import { getRelativeDirection } from "./position";
import { Piece } from "./models";
import { INITIAL_COOLDOWN } from "./constants";

export const attack = (attacker: Piece, attackerStats: PokemonStats, defender: Piece, defenderStats: PokemonStats) => {
    if (attacker.currentHealth === 0) {
        // Dead Pokémon don't attack
        return { attacker, defender };
    }

    const attackBonus = getTypeAttackBonus(attackerStats.type, defenderStats.type);
    const damage = (attackerStats.attack / defenderStats.defense) * attackBonus * 10;
    const newDefenderHealth = Math.max(defender.currentHealth - damage, 0);

    return {
        attacker: { ...attacker, coolDown: INITIAL_COOLDOWN, attacking: { direction: getRelativeDirection(attacker.position, defender.position), damage } },
        defender: { ...defender, currentHealth: newDefenderHealth, hit: { direction: getRelativeDirection(defender.position, attacker.position), damage } }
    };
};
