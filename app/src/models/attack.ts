import { PokemonPiece } from "./pokemon-piece";
import { getPokemonStats } from "./get-pokemon-stats";
import { getTypeAttackBonus } from "./get-type-attack-bonus";

export const attack = (attacker: PokemonPiece, defender: PokemonPiece) => {
    const attackerStats = getPokemonStats(attacker.pokemonId);
    const defenderStats = getPokemonStats(defender.pokemonId);
    const attackBonus = getTypeAttackBonus(attackerStats.type, defenderStats.type);
    const damage = (attackerStats.attack / defenderStats.defense) * attackBonus;
    const newDefenderHealth = Math.max(defender.currentHealth - damage, 0);
    return { attacker, defender: { ...defender, currentHealth: newDefenderHealth } };
};
