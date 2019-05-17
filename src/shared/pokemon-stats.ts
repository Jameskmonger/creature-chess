import { PokemonType } from "./pokemon-type";

export interface PokemonDefinition {
    id: number;
    name: string;
    stats: PokemonStats;
    cost?: number;
    evolvedFormId?: number;
}

export interface PokemonStats {
    hp: number;
    attack: number;
    defense: number;
    speed: number;
    specialAttack: number;
    specialDefense: number;
    type: PokemonType;
}

const pokemonMap = new Map<number, PokemonDefinition>();

const mapPokemon = (pokemonDefinition: PokemonDefinition[]) => {
    pokemonDefinition.forEach(p => {
        pokemonMap.set(p.id, p);
    });
};

mapPokemon([
    {
        id: 1,
        name: "Bish",
        stats: {
            hp: 45,
            attack: 49,
            defense: 49,
            speed: 45,
            specialAttack: 65,
            specialDefense: 65,
            type: PokemonType.Grass
        },
        cost: 3,
        evolvedFormId: 2
    },
    {
        id: 2,
        name: "Bash",
        stats: {
            hp: 60,
            attack: 62,
            defense: 63,
            speed: 60,
            specialAttack: 80,
            specialDefense: 80,
            type: PokemonType.Grass
        },
        evolvedFormId: 3
    },
    {
        id: 3,
        name: "Bosh",
        stats: {
            hp: 80,
            attack: 82,
            defense: 83,
            speed: 80,
            specialAttack: 100,
            specialDefense: 100,
            type: PokemonType.Grass
        }
    },
    {
        id: 4,
        name: "Tedi",
        stats: {
            hp: 39,
            attack: 52,
            defense: 43,
            speed: 65,
            specialAttack: 60,
            specialDefense: 50,
            type: PokemonType.Fire
        },
        cost: 3,
        evolvedFormId: 5
    },
    {
        id: 5,
        name: "Beari",
        stats: {
            hp: 58,
            attack: 64,
            defense: 58,
            speed: 80,
            specialAttack: 80,
            specialDefense: 65,
            type: PokemonType.Fire
        },
        evolvedFormId: 6
    },
    {
        id: 6,
        name: "Boombear",
        stats: {
            hp: 78,
            attack: 84,
            defense: 78,
            speed: 100,
            specialAttack: 109,
            specialDefense: 85,
            type: PokemonType.Fire
        }
    },
    {
        id: 7,
        name: "Ballboy",
        stats: {
            hp: 44,
            attack: 48,
            defense: 65,
            speed: 43,
            specialAttack: 50,
            specialDefense: 64,
            type: PokemonType.Water
        },
        cost: 3,
        evolvedFormId: 8
    },
    {
        id: 8,
        name: "Balla",
        stats: {
            hp: 59,
            attack: 63,
            defense: 80,
            speed: 58,
            specialAttack: 65,
            specialDefense: 80,
            type: PokemonType.Water
        },
        evolvedFormId: 9
    },
    {
        id: 9,
        name: "Bigball",
        stats: {
            hp: 79,
            attack: 83,
            defense: 100,
            speed: 78,
            specialAttack: 85,
            specialDefense: 105,
            type: PokemonType.Water
        }
    },
    {
        id: 10,
        name: "Pipsicle",
        stats: {
            hp: 45,
            attack: 30,
            defense: 35,
            speed: 45,
            specialAttack: 20,
            specialDefense: 20,
            type: PokemonType.Bug
        },
        cost: 1,
        evolvedFormId: 11
    },
    {
        id: 11,
        name: "Sappo",
        stats: {
            hp: 50,
            attack: 20,
            defense: 55,
            speed: 30,
            specialAttack: 25,
            specialDefense: 25,
            type: PokemonType.Bug
        },
        evolvedFormId: 12
    },
    {
        id: 12,
        name: "Treezor",
        stats: {
            hp: 60,
            attack: 45,
            defense: 50,
            speed: 70,
            specialAttack: 90,
            specialDefense: 80,
            type: PokemonType.Bug
        }
    }
]);

const pokemonArray = Array.from(pokemonMap.values());

export const getPokemonDefinition = (id: number) => pokemonMap.get(id);
export const getAllDefinitions = () => pokemonArray;
