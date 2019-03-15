import { PokemonType } from "./pokemon-type";

export const getPokemonStats = (pokemonId: number) => ({
    hp: 50,
    attack: Math.random() * 100,
    defense: Math.random() * 100,
    speed: Math.random() * 100,
    specialAttack: 120,
    specialDefense: 70,
    type: PokemonType.Normal
});
