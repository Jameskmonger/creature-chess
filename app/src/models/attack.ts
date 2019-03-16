import { PokemonPiece, initialCoolDown } from "./pokemon-piece";
import { getPokemonStats } from "./get-pokemon-stats";
import { getTypeAttackBonus } from "./get-type-attack-bonus";

export const attack = (attacker: PokemonPiece, defender: PokemonPiece) => {
    if (attacker.currentHealth === 0) {
        // Dead Pokémon don't attack
        return { attacker, defender };
    }

    const attackerStats = getPokemonStats(attacker.pokemonId);
    if (attacker.coolDown > 0) {
        return { attacker: { ...attacker, coolDown: attacker.coolDown - attackerStats.speed }, defender };
    }

    const defenderStats = getPokemonStats(defender.pokemonId);
    const attackBonus = getTypeAttackBonus(attackerStats.type, defenderStats.type);
    const damage = (attackerStats.attack / defenderStats.defense) * attackBonus * 10;
    const newDefenderHealth = Math.max(defender.currentHealth - damage, 0);

    return { attacker: { ...attacker, coolDown: initialCoolDown }, defender: { ...defender, currentHealth: newDefenderHealth } };
};
