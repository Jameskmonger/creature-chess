import { pokemonStats } from "./pokemon-stats";

export const getPokemonStats = (pokemonId: number) => pokemonStats.find(p => p.id === pokemonId).stats;
