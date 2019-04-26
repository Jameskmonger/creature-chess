import { createPokemon } from "../../shared/pokemon-piece";

export const createBoard = (ownerId: string) => {
    return [
        createPokemon(ownerId, 77, [0, 0]),
        createPokemon(ownerId, 15, [1, 0]),
        createPokemon(ownerId, 123, [4, 0]),
        createPokemon(ownerId, 58, [5, 0]),
        createPokemon(ownerId, 6, [4, 3]),
        createPokemon(ownerId, 11, [3, 1])
    ];
};
