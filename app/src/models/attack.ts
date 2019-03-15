import { PokemonPiece } from './pokemon-piece';

export const attack = (attacker: PokemonPiece, defender: PokemonPiece) => {
    const damage = Math.random() * 10;
    const newDefenderHealth = Math.max(defender.currentHealth - damage, 0);
    return { attacker, defender: { ...defender, currentHealth: newDefenderHealth } }
};
