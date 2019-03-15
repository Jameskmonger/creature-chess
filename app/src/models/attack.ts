import { PokemonPiece } from './pokemon-piece';

export const attack = (attacker: PokemonPiece, defender: PokemonPiece) => {
    const damage = Math.random() * 10;
    defender.currentHealth = Math.max(defender.currentHealth - damage, 0);
};
