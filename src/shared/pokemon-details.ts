import { getDefinition } from "./models/creatureDefinition";

export const getPokemonStats = (pokemonId: number) => getDefinition(pokemonId).stats;

export const getPokemonName = (pokemonId: number) => getDefinition(pokemonId).name;

export const getRequiredQuantityToEvolve = (pokemonId: number) => 3;
