import { PokemonPiece } from "./pokemon-piece";

const isAdjacent = (a: PokemonPiece) => {
    return (b: PokemonPiece) => {
        const deltaX = Math.abs(a.position[0] - b.position[0]);
        const deltaY = Math.abs(a.position[1] - b.position[1]);

        return (deltaX + deltaY === 1);
    };
};

export const getAttackableEnemy = (piece: PokemonPiece, others: PokemonPiece[]) => {
    const enemies = others.filter(other => other.friendly !== piece.friendly && other.currentHealth > 0);

    return enemies.find(isAdjacent(piece)) || null;
};
