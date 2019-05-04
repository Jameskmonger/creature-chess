import { BoardPokemonPiece, initialCoolDown } from "./pokemon-piece";
import { getTypeAttackBonus } from "./get-type-attack-bonus";
import { PokemonStats } from "./pokemon-stats";
import { getRelativeDirection } from "./position";

export const attack = (attacker: BoardPokemonPiece, attackerStats: PokemonStats, defender: BoardPokemonPiece, defenderStats: PokemonStats) => {
    if (attacker.currentHealth === 0) {
        // Dead Pokémon don't attack
        return { attacker, defender };
    }

    const attackBonus = getTypeAttackBonus(attackerStats.type, defenderStats.type);
    const damage = (attackerStats.attack / defenderStats.defense) * attackBonus * 10;
    const newDefenderHealth = Math.max(defender.currentHealth - damage, 0);

    return {
        attacker: { ...attacker, coolDown: initialCoolDown, attacking: { direction: getRelativeDirection(attacker.position, defender.position), damage } },
        defender: { ...defender, currentHealth: newDefenderHealth, hit: { direction: getRelativeDirection(defender.position, attacker.position), damage } }
    };
};
