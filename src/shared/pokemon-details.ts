import { pokemonStats } from "./pokemon-stats";

export const getPokemonDefinition = (pokemonId: number) => pokemonStats.find(p => p.id === pokemonId);

export const getPokemonStats = (pokemonId: number) => getPokemonDefinition(pokemonId).stats;

export const getPokemonName = (pokemonId: number) => getPokemonDefinition(pokemonId).name;

export const getRequiredQuantityToEvolve = (pokemonId: number) => 3;
