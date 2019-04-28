import { createPokemon } from "../../shared/pokemon-piece";

export const createBoard = (ownerId: string) => {
    return [
        createPokemon(ownerId, 25, [1, 3]),
        createPokemon(ownerId, 82, [2, 3]),
        createPokemon(ownerId, 101, [3, 3]),
        createPokemon(ownerId, 125, [4, 3]),
        createPokemon(ownerId, 41, [7, 0])
    ];
};
