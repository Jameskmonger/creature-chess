import { getPokemonDefinition } from "./pokemon-stats";

export const getPokemonStats = (pokemonId: number) => getPokemonDefinition(pokemonId).stats;

export const getPokemonName = (pokemonId: number) => getPokemonDefinition(pokemonId).name;

export const getRequiredQuantityToEvolve = (pokemonId: number) => 3;
