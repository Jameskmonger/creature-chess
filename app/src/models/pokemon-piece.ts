export type PiecePosition = [number, number];

export interface PokemonPiece {
    pokemonId: number;
    facingAway: boolean;
    friendly: boolean;

    position: PiecePosition;
    maxHealth: number;
    currentHealth: number;
}

export const isSamePiece = (a: PokemonPiece, b: PokemonPiece) =>
    a.pokemonId === b.pokemonId
    && a.facingAway === b.facingAway
    && a.friendly === b.friendly
    && a.position[0] === b.position[0]
    && a.position[1] === b.position[1];