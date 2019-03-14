export type PiecePosition = [number, number];

export interface PokemonPiece {
    pokemonId: number;
    facingAway: boolean;
    friendly: boolean;

    position: PiecePosition;
    maxHealth: number;
    currentHealth: number;
}
