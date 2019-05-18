import { CreatureType } from "./creatureType";

export interface CreatureDefinition {
    id: number;
    name: string;
    stats: CreatureStats;
    cost?: number;
    evolvedFormId?: number;
}

export interface CreatureStats {
    hp: number;
    attack: number;
    defense: number;
    speed: number;
    specialAttack: number;
    specialDefense: number;
    type: CreatureType;
}

const definitionMap = new Map<number, CreatureDefinition>();

const mapDefinitions = (definition: CreatureDefinition[]) => {
    definition.forEach(p => {
        definitionMap.set(p.id, p);
    });
};

mapDefinitions([
    {
        id: 1,
        name: "Bulbasaur",
        stats: {
            hp: 45,
            attack: 49,
            defense: 49,
            speed: 45,
            specialAttack: 65,
            specialDefense: 65,
            type: CreatureType.Grass
        },
        cost: 3,
        evolvedFormId: 2
    },
    {
        id: 2,
        name: "Ivysaur",
        stats: {
            hp: 60,
            attack: 62,
            defense: 63,
            speed: 60,
            specialAttack: 80,
            specialDefense: 80,
            type: CreatureType.Grass
        },
        evolvedFormId: 3
    },
    {
        id: 3,
        name: "Venusaur",
        stats: {
            hp: 80,
            attack: 82,
            defense: 83,
            speed: 80,
            specialAttack: 100,
            specialDefense: 100,
            type: CreatureType.Grass
        }
    },
    {
        id: 4,
        name: "Charmander",
        stats: {
            hp: 39,
            attack: 52,
            defense: 43,
            speed: 65,
            specialAttack: 60,
            specialDefense: 50,
            type: CreatureType.Fire
        },
        cost: 3,
        evolvedFormId: 5
    },
    {
        id: 5,
        name: "Charmeleon",
        stats: {
            hp: 58,
            attack: 64,
            defense: 58,
            speed: 80,
            specialAttack: 80,
            specialDefense: 65,
            type: CreatureType.Fire
        },
        evolvedFormId: 6
    },
    {
        id: 6,
        name: "Charizard",
        stats: {
            hp: 78,
            attack: 84,
            defense: 78,
            speed: 100,
            specialAttack: 109,
            specialDefense: 85,
            type: CreatureType.Fire
        }
    },
    {
        id: 7,
        name: "Squirtle",
        stats: {
            hp: 44,
            attack: 48,
            defense: 65,
            speed: 43,
            specialAttack: 50,
            specialDefense: 64,
            type: CreatureType.Water
        },
        cost: 3,
        evolvedFormId: 8
    },
    {
        id: 8,
        name: "Wartortle",
        stats: {
            hp: 59,
            attack: 63,
            defense: 80,
            speed: 58,
            specialAttack: 65,
            specialDefense: 80,
            type: CreatureType.Water
        },
        evolvedFormId: 9
    },
    {
        id: 9,
        name: "Blastoise",
        stats: {
            hp: 79,
            attack: 83,
            defense: 100,
            speed: 78,
            specialAttack: 85,
            specialDefense: 105,
            type: CreatureType.Water
        }
    },
    {
        id: 10,
        name: "Caterpie",
        stats: {
            hp: 45,
            attack: 30,
            defense: 35,
            speed: 45,
            specialAttack: 20,
            specialDefense: 20,
            type: CreatureType.Bug
        },
        cost: 1,
        evolvedFormId: 11
    },
    {
        id: 11,
        name: "Metapod",
        stats: {
            hp: 50,
            attack: 20,
            defense: 55,
            speed: 30,
            specialAttack: 25,
            specialDefense: 25,
            type: CreatureType.Bug
        },
        evolvedFormId: 12
    },
    {
        id: 12,
        name: "Butterfree",
        stats: {
            hp: 60,
            attack: 45,
            defense: 50,
            speed: 70,
            specialAttack: 90,
            specialDefense: 80,
            type: CreatureType.Bug
        }
    },
    {
        id: 13,
        name: "Weedle",
        stats: {
            hp: 40,
            attack: 35,
            defense: 30,
            speed: 50,
            specialAttack: 20,
            specialDefense: 20,
            type: CreatureType.Bug
        },
        cost: 1,
        evolvedFormId: 14
    },
    {
        id: 14,
        name: "Kakuna",
        stats: {
            hp: 45,
            attack: 25,
            defense: 50,
            speed: 35,
            specialAttack: 25,
            specialDefense: 25,
            type: CreatureType.Bug
        },
        evolvedFormId: 15
    },
    {
        id: 15,
        name: "Beedrill",
        stats: {
            hp: 65,
            attack: 90,
            defense: 40,
            speed: 75,
            specialAttack: 45,
            specialDefense: 80,
            type: CreatureType.Bug
        }
    },
    {
        id: 16,
        name: "Pidgey",
        stats: {
            hp: 40,
            attack: 45,
            defense: 40,
            speed: 56,
            specialAttack: 35,
            specialDefense: 35,
            type: CreatureType.Flying
        },
        cost: 2,
        evolvedFormId: 17
    },
    {
        id: 17,
        name: "Pidgeotto",
        stats: {
            hp: 63,
            attack: 60,
            defense: 55,
            speed: 71,
            specialAttack: 50,
            specialDefense: 50,
            type: CreatureType.Flying
        },
        evolvedFormId: 18
    },
    {
        id: 18,
        name: "Pidgeot",
        stats: {
            hp: 83,
            attack: 80,
            defense: 75,
            speed: 101,
            specialAttack: 70,
            specialDefense: 70,
            type: CreatureType.Flying
        }
    },
    {
        id: 19,
        name: "Rattata",
        stats: {
            hp: 30,
            attack: 56,
            defense: 35,
            speed: 72,
            specialAttack: 25,
            specialDefense: 35,
            type: CreatureType.Normal
        },
        evolvedFormId: 20
    },
    {
        id: 20,
        name: "Raticate",
        stats: {
            hp: 55,
            attack: 81,
            defense: 60,
            speed: 97,
            specialAttack: 50,
            specialDefense: 70,
            type: CreatureType.Normal
        }
    },
    {
        id: 21,
        name: "Spearow",
        stats: {
            hp: 40,
            attack: 60,
            defense: 30,
            speed: 70,
            specialAttack: 31,
            specialDefense: 31,
            type: CreatureType.Flying
        },
        cost: 2,
        evolvedFormId: 22
    },
    {
        id: 22,
        name: "Fearow",
        stats: {
            hp: 65,
            attack: 90,
            defense: 65,
            speed: 100,
            specialAttack: 61,
            specialDefense: 61,
            type: CreatureType.Flying
        }
    },
    {
        id: 23,
        name: "Ekans",
        stats: {
            hp: 35,
            attack: 60,
            defense: 44,
            speed: 55,
            specialAttack: 40,
            specialDefense: 54,
            type: CreatureType.Poison
        },
        evolvedFormId: 24
    },
    {
        id: 24,
        name: "Arbok",
        stats: {
            hp: 60,
            attack: 95,
            defense: 69,
            speed: 80,
            specialAttack: 65,
            specialDefense: 79,
            type: CreatureType.Poison
        }
    },
    {
        id: 25,
        name: "Pikachu",
        stats: {
            hp: 35,
            attack: 55,
            defense: 40,
            speed: 90,
            specialAttack: 50,
            specialDefense: 50,
            type: CreatureType.Electric
        },
        cost: 2,
        evolvedFormId: 26
    },
    {
        id: 26,
        name: "Raichu",
        stats: {
            hp: 60,
            attack: 90,
            defense: 55,
            speed: 110,
            specialAttack: 90,
            specialDefense: 80,
            type: CreatureType.Electric
        }
    },
    {
        id: 27,
        name: "Sandshrew",
        stats: {
            hp: 50,
            attack: 75,
            defense: 85,
            speed: 40,
            specialAttack: 20,
            specialDefense: 30,
            type: CreatureType.Ground
        },
        cost: 2,
        evolvedFormId: 28
    },
    {
        id: 28,
        name: "Sandslash",
        stats: {
            hp: 75,
            attack: 100,
            defense: 110,
            speed: 65,
            specialAttack: 45,
            specialDefense: 55,
            type: CreatureType.Ground
        }
    },
    {
        id: 29,
        name: "Nidoran♀",
        stats: {
            hp: 55,
            attack: 47,
            defense: 52,
            speed: 41,
            specialAttack: 40,
            specialDefense: 40,
            type: CreatureType.Poison
        },
        evolvedFormId: 30
    },
    {
        id: 30,
        name: "Nidorina",
        stats: {
            hp: 70,
            attack: 62,
            defense: 67,
            speed: 56,
            specialAttack: 55,
            specialDefense: 55,
            type: CreatureType.Poison
        },
        evolvedFormId: 31
    },
    {
        id: 31,
        name: "Nidoqueen",
        stats: {
            hp: 90,
            attack: 92,
            defense: 87,
            speed: 76,
            specialAttack: 75,
            specialDefense: 85,
            type: CreatureType.Poison
        }
    },
    {
        id: 32,
        name: "Nidoran♂",
        stats: {
            hp: 46,
            attack: 57,
            defense: 40,
            speed: 50,
            specialAttack: 40,
            specialDefense: 40,
            type: CreatureType.Poison
        },
        evolvedFormId: 33
    },
    {
        id: 33,
        name: "Nidorino",
        stats: {
            hp: 61,
            attack: 72,
            defense: 57,
            speed: 65,
            specialAttack: 55,
            specialDefense: 55,
            type: CreatureType.Poison
        },
        evolvedFormId: 34
    },
    {
        id: 34,
        name: "Nidoking",
        stats: {
            hp: 81,
            attack: 102,
            defense: 77,
            speed: 85,
            specialAttack: 85,
            specialDefense: 75,
            type: CreatureType.Poison
        }
    },
    {
        id: 35,
        name: "Clefairy",
        stats: {
            hp: 70,
            attack: 45,
            defense: 48,
            speed: 35,
            specialAttack: 60,
            specialDefense: 65,
            type: CreatureType.Normal
        },
        evolvedFormId: 36
    },
    {
        id: 36,
        name: "Clefable",
        stats: {
            hp: 95,
            attack: 70,
            defense: 73,
            speed: 60,
            specialAttack: 95,
            specialDefense: 90,
            type: CreatureType.Normal
        }
    },
    {
        id: 37,
        name: "Vulpix",
        stats: {
            hp: 38,
            attack: 41,
            defense: 40,
            speed: 65,
            specialAttack: 50,
            specialDefense: 65,
            type: CreatureType.Fire
        },
        cost: 4,
        evolvedFormId: 38
    },
    {
        id: 38,
        name: "Ninetales",
        stats: {
            hp: 73,
            attack: 76,
            defense: 75,
            speed: 100,
            specialAttack: 81,
            specialDefense: 100,
            type: CreatureType.Fire
        }
    },
    {
        id: 39,
        name: "Jigglypuff",
        stats: {
            hp: 115,
            attack: 45,
            defense: 20,
            speed: 20,
            specialAttack: 45,
            specialDefense: 25,
            type: CreatureType.Normal
        },
        cost: 4,
        evolvedFormId: 40
    },
    {
        id: 40,
        name: "Wigglytuff",
        stats: {
            hp: 140,
            attack: 70,
            defense: 45,
            speed: 45,
            specialAttack: 85,
            specialDefense: 50,
            type: CreatureType.Normal
        }
    },
    {
        id: 41,
        name: "Zubat",
        stats: {
            hp: 40,
            attack: 45,
            defense: 35,
            speed: 55,
            specialAttack: 30,
            specialDefense: 40,
            type: CreatureType.Flying
        },
        cost: 2,
        evolvedFormId: 42
    },
    {
        id: 42,
        name: "Golbat",
        stats: {
            hp: 75,
            attack: 80,
            defense: 70,
            speed: 90,
            specialAttack: 65,
            specialDefense: 75,
            type: CreatureType.Flying
        }
    },
    {
        id: 43,
        name: "Oddish",
        stats: {
            hp: 45,
            attack: 50,
            defense: 55,
            speed: 30,
            specialAttack: 75,
            specialDefense: 65,
            type: CreatureType.Grass
        },
        cost: 2,
        evolvedFormId: 44
    },
    {
        id: 44,
        name: "Gloom",
        stats: {
            hp: 60,
            attack: 65,
            defense: 70,
            speed: 40,
            specialAttack: 85,
            specialDefense: 75,
            type: CreatureType.Grass
        },
        evolvedFormId: 45
    },
    {
        id: 45,
        name: "Vileplume",
        stats: {
            hp: 75,
            attack: 80,
            defense: 85,
            speed: 50,
            specialAttack: 110,
            specialDefense: 90,
            type: CreatureType.Grass
        }
    },
    {
        id: 46,
        name: "Paras",
        stats: {
            hp: 35,
            attack: 70,
            defense: 55,
            speed: 25,
            specialAttack: 45,
            specialDefense: 55,
            type: CreatureType.Grass
        },
        evolvedFormId: 47
    },
    {
        id: 47,
        name: "Parasect",
        stats: {
            hp: 60,
            attack: 95,
            defense: 80,
            speed: 30,
            specialAttack: 60,
            specialDefense: 80,
            type: CreatureType.Grass
        }
    },
    {
        id: 48,
        name: "Venonat",
        stats: {
            hp: 60,
            attack: 55,
            defense: 50,
            speed: 45,
            specialAttack: 40,
            specialDefense: 55,
            type: CreatureType.Bug
        },
        evolvedFormId: 49
    },
    {
        id: 49,
        name: "Venomoth",
        stats: {
            hp: 70,
            attack: 65,
            defense: 60,
            speed: 90,
            specialAttack: 90,
            specialDefense: 75,
            type: CreatureType.Bug
        }
    },
    {
        id: 50,
        name: "Diglett",
        stats: {
            hp: 10,
            attack: 55,
            defense: 25,
            speed: 95,
            specialAttack: 35,
            specialDefense: 45,
            type: CreatureType.Ground
        },
        cost: 2,
        evolvedFormId: 51
    },
    {
        id: 51,
        name: "Dugtrio",
        stats: {
            hp: 35,
            attack: 100,
            defense: 50,
            speed: 120,
            specialAttack: 50,
            specialDefense: 70,
            type: CreatureType.Ground
        }
    },
    {
        id: 52,
        name: "Meowth",
        stats: {
            hp: 40,
            attack: 45,
            defense: 35,
            speed: 90,
            specialAttack: 40,
            specialDefense: 40,
            type: CreatureType.Normal
        },
        evolvedFormId: 53
    },
    {
        id: 53,
        name: "Persian",
        stats: {
            hp: 65,
            attack: 70,
            defense: 60,
            speed: 115,
            specialAttack: 65,
            specialDefense: 65,
            type: CreatureType.Normal
        }
    },
    {
        id: 54,
        name: "Psyduck",
        stats: {
            hp: 50,
            attack: 52,
            defense: 48,
            speed: 55,
            specialAttack: 65,
            specialDefense: 50,
            type: CreatureType.Psychic
        },
        evolvedFormId: 55
    },
    {
        id: 55,
        name: "Golduck",
        stats: {
            hp: 80,
            attack: 82,
            defense: 78,
            speed: 85,
            specialAttack: 95,
            specialDefense: 80,
            type: CreatureType.Psychic
        }
    },
    {
        id: 56,
        name: "Mankey",
        stats: {
            hp: 40,
            attack: 80,
            defense: 35,
            speed: 70,
            specialAttack: 35,
            specialDefense: 45,
            type: CreatureType.Fighting
        },
        evolvedFormId: 57
    },
    {
        id: 57,
        name: "Primeape",
        stats: {
            hp: 65,
            attack: 105,
            defense: 60,
            speed: 95,
            specialAttack: 60,
            specialDefense: 70,
            type: CreatureType.Fighting
        }
    },
    {
        id: 58,
        name: "Growlithe",
        stats: {
            hp: 55,
            attack: 70,
            defense: 45,
            speed: 60,
            specialAttack: 70,
            specialDefense: 50,
            type: CreatureType.Fire
        },
        evolvedFormId: 59
    },
    {
        id: 59,
        name: "Arcanine",
        stats: {
            hp: 90,
            attack: 110,
            defense: 80,
            speed: 95,
            specialAttack: 100,
            specialDefense: 80,
            type: CreatureType.Fire
        }
    },
    {
        id: 60,
        name: "Poliwag",
        stats: {
            hp: 40,
            attack: 50,
            defense: 40,
            speed: 90,
            specialAttack: 40,
            specialDefense: 40,
            type: CreatureType.Psychic
        },
        cost: 2,
        evolvedFormId: 61
    },
    {
        id: 61,
        name: "Poliwhirl",
        stats: {
            hp: 65,
            attack: 65,
            defense: 65,
            speed: 90,
            specialAttack: 50,
            specialDefense: 50,
            type: CreatureType.Psychic
        },
        evolvedFormId: 62
    },
    {
        id: 62,
        name: "Poliwrath",
        stats: {
            hp: 90,
            attack: 95,
            defense: 95,
            speed: 70,
            specialAttack: 70,
            specialDefense: 90,
            type: CreatureType.Psychic
        }
    },
    {
        id: 63,
        name: "Abra",
        stats: {
            hp: 25,
            attack: 20,
            defense: 15,
            speed: 90,
            specialAttack: 105,
            specialDefense: 55,
            type: CreatureType.Psychic
        },
        cost: 4,
        evolvedFormId: 64
    },
    {
        id: 64,
        name: "Kadabra",
        stats: {
            hp: 40,
            attack: 35,
            defense: 30,
            speed: 105,
            specialAttack: 120,
            specialDefense: 70,
            type: CreatureType.Psychic
        },
        evolvedFormId: 65
    },
    {
        id: 65,
        name: "Alakazam",
        stats: {
            hp: 55,
            attack: 50,
            defense: 45,
            speed: 120,
            specialAttack: 135,
            specialDefense: 95,
            type: CreatureType.Psychic
        }
    },
    {
        id: 66,
        name: "Machop",
        stats: {
            hp: 70,
            attack: 80,
            defense: 50,
            speed: 35,
            specialAttack: 35,
            specialDefense: 35,
            type: CreatureType.Fighting
        },
        cost: 3,
        evolvedFormId: 67
    },
    {
        id: 67,
        name: "Machoke",
        stats: {
            hp: 80,
            attack: 100,
            defense: 70,
            speed: 45,
            specialAttack: 50,
            specialDefense: 60,
            type: CreatureType.Fighting
        },
        evolvedFormId: 68
    },
    {
        id: 68,
        name: "Machamp",
        stats: {
            hp: 90,
            attack: 130,
            defense: 80,
            speed: 55,
            specialAttack: 65,
            specialDefense: 85,
            type: CreatureType.Fighting
        }
    },
    {
        id: 69,
        name: "Bellsprout",
        stats: {
            hp: 50,
            attack: 75,
            defense: 35,
            speed: 40,
            specialAttack: 70,
            specialDefense: 30,
            type: CreatureType.Grass
        },
        cost: 1,
        evolvedFormId: 70
    },
    {
        id: 70,
        name: "Weepinbell",
        stats: {
            hp: 65,
            attack: 90,
            defense: 50,
            speed: 55,
            specialAttack: 85,
            specialDefense: 45,
            type: CreatureType.Grass
        },
        evolvedFormId: 71
    },
    {
        id: 71,
        name: "Victreebel",
        stats: {
            hp: 80,
            attack: 105,
            defense: 65,
            speed: 70,
            specialAttack: 100,
            specialDefense: 70,
            type: CreatureType.Grass
        }
    },
    {
        id: 72,
        name: "Tentacool",
        stats: {
            hp: 40,
            attack: 40,
            defense: 35,
            speed: 70,
            specialAttack: 50,
            specialDefense: 100,
            type: CreatureType.Water
        },
        evolvedFormId: 72
    },
    {
        id: 73,
        name: "Tentacruel",
        stats: {
            hp: 80,
            attack: 70,
            defense: 65,
            speed: 100,
            specialAttack: 80,
            specialDefense: 120,
            type: CreatureType.Water
        }
    },
    {
        id: 74,
        name: "Geodude",
        stats: {
            hp: 40,
            attack: 80,
            defense: 100,
            speed: 20,
            specialAttack: 30,
            specialDefense: 30,
            type: CreatureType.Rock
        },
        cost: 1,
        evolvedFormId: 75
    },
    {
        id: 75,
        name: "Graveler",
        stats: {
            hp: 55,
            attack: 95,
            defense: 115,
            speed: 35,
            specialAttack: 45,
            specialDefense: 45,
            type: CreatureType.Rock
        },
        evolvedFormId: 76
    },
    {
        id: 76,
        name: "Golem",
        stats: {
            hp: 80,
            attack: 120,
            defense: 130,
            speed: 45,
            specialAttack: 55,
            specialDefense: 65,
            type: CreatureType.Rock
        }
    },
    {
        id: 77,
        name: "Ponyta",
        stats: {
            hp: 50,
            attack: 85,
            defense: 55,
            speed: 90,
            specialAttack: 65,
            specialDefense: 65,
            type: CreatureType.Fire
        },
        cost: 4,
        evolvedFormId: 78
    },
    {
        id: 78,
        name: "Rapidash",
        stats: {
            hp: 65,
            attack: 100,
            defense: 70,
            speed: 105,
            specialAttack: 80,
            specialDefense: 80,
            type: CreatureType.Fire
        }
    },
    {
        id: 79,
        name: "Slowpoke",
        stats: {
            hp: 90,
            attack: 65,
            defense: 65,
            speed: 15,
            specialAttack: 40,
            specialDefense: 40,
            type: CreatureType.Psychic
        },
        evolvedFormId: 80
    },
    {
        id: 80,
        name: "Slowbro",
        stats: {
            hp: 95,
            attack: 75,
            defense: 110,
            speed: 30,
            specialAttack: 100,
            specialDefense: 80,
            type: CreatureType.Psychic
        }
    },
    {
        id: 81,
        name: "Magnemite",
        stats: {
            hp: 25,
            attack: 35,
            defense: 70,
            speed: 45,
            specialAttack: 95,
            specialDefense: 55,
            type: CreatureType.Electric
        },
        cost: 1,
        evolvedFormId: 82
    },
    {
        id: 82,
        name: "Magneton",
        stats: {
            hp: 50,
            attack: 60,
            defense: 95,
            speed: 70,
            specialAttack: 120,
            specialDefense: 70,
            type: CreatureType.Electric
        }
    },
    {
        id: 83,
        name: "Farfetch'd",
        stats: {
            hp: 52,
            attack: 90,
            defense: 55,
            speed: 60,
            specialAttack: 58,
            specialDefense: 62,
            type: CreatureType.Flying
        }
    },
    {
        id: 84,
        name: "Doduo",
        stats: {
            hp: 35,
            attack: 85,
            defense: 45,
            speed: 75,
            specialAttack: 35,
            specialDefense: 35,
            type: CreatureType.Flying
        },
        evolvedFormId: 85
    },
    {
        id: 85,
        name: "Dodrio",
        stats: {
            hp: 60,
            attack: 110,
            defense: 70,
            speed: 110,
            specialAttack: 60,
            specialDefense: 60,
            type: CreatureType.Flying
        }
    },
    {
        id: 86,
        name: "Seel",
        stats: {
            hp: 65,
            attack: 45,
            defense: 55,
            speed: 45,
            specialAttack: 45,
            specialDefense: 70,
            type: CreatureType.Water
        },
        evolvedFormId: 87
    },
    {
        id: 87,
        name: "Dewgong",
        stats: {
            hp: 90,
            attack: 70,
            defense: 80,
            speed: 70,
            specialAttack: 70,
            specialDefense: 95,
            type: CreatureType.Water
        }
    },
    {
        id: 88,
        name: "Grimer",
        stats: {
            hp: 80,
            attack: 80,
            defense: 50,
            speed: 25,
            specialAttack: 40,
            specialDefense: 50,
            type: CreatureType.Poison
        },
        cost: 3,
        evolvedFormId: 89
    },
    {
        id: 89,
        name: "Muk",
        stats: {
            hp: 105,
            attack: 105,
            defense: 75,
            speed: 50,
            specialAttack: 65,
            specialDefense: 100,
            type: CreatureType.Poison
        }
    },
    {
        id: 90,
        name: "Shellder",
        stats: {
            hp: 30,
            attack: 65,
            defense: 100,
            speed: 40,
            specialAttack: 45,
            specialDefense: 25,
            type: CreatureType.Water
        },
        evolvedFormId: 91
    },
    {
        id: 91,
        name: "Cloyster",
        stats: {
            hp: 50,
            attack: 95,
            defense: 180,
            speed: 70,
            specialAttack: 85,
            specialDefense: 45,
            type: CreatureType.Water
        }
    },
    {
        id: 92,
        name: "Gastly",
        stats: {
            hp: 30,
            attack: 35,
            defense: 30,
            speed: 80,
            specialAttack: 100,
            specialDefense: 35,
            type: CreatureType.Ghost
        },
        evolvedFormId: 93
    },
    {
        id: 93,
        name: "Haunter",
        stats: {
            hp: 45,
            attack: 50,
            defense: 45,
            speed: 95,
            specialAttack: 115,
            specialDefense: 55,
            type: CreatureType.Ghost
        },
        evolvedFormId: 94
    },
    {
        id: 94,
        name: "Gengar",
        stats: {
            hp: 60,
            attack: 65,
            defense: 60,
            speed: 110,
            specialAttack: 130,
            specialDefense: 75,
            type: CreatureType.Ghost
        }
    },
    {
        id: 95,
        name: "Onix",
        stats: {
            hp: 35,
            attack: 45,
            defense: 160,
            speed: 70,
            specialAttack: 30,
            specialDefense: 45,
            type: CreatureType.Rock
        }
    },
    {
        id: 96,
        name: "Drowzee",
        stats: {
            hp: 60,
            attack: 48,
            defense: 45,
            speed: 42,
            specialAttack: 43,
            specialDefense: 90,
            type: CreatureType.Psychic
        },
        cost: 5,
        evolvedFormId: 97
    },
    {
        id: 97,
        name: "Hypno",
        stats: {
            hp: 85,
            attack: 73,
            defense: 70,
            speed: 67,
            specialAttack: 73,
            specialDefense: 115,
            type: CreatureType.Psychic
        }
    },
    {
        id: 98,
        name: "Krabby",
        stats: {
            hp: 30,
            attack: 105,
            defense: 90,
            speed: 50,
            specialAttack: 25,
            specialDefense: 25,
            type: CreatureType.Water
        },
        evolvedFormId: 99
    },
    {
        id: 99,
        name: "Kingler",
        stats: {
            hp: 55,
            attack: 130,
            defense: 115,
            speed: 75,
            specialAttack: 50,
            specialDefense: 50,
            type: CreatureType.Water
        }
    },
    {
        id: 100,
        name: "Voltorb",
        stats: {
            hp: 40,
            attack: 30,
            defense: 50,
            speed: 100,
            specialAttack: 55,
            specialDefense: 55,
            type: CreatureType.Electric
        },
        cost: 2,
        evolvedFormId: 101
    },
    {
        id: 101,
        name: "Electrode",
        stats: {
            hp: 60,
            attack: 50,
            defense: 70,
            speed: 150,
            specialAttack: 80,
            specialDefense: 80,
            type: CreatureType.Electric
        }
    },
    {
        id: 102,
        name: "Exeggcute",
        stats: {
            hp: 60,
            attack: 40,
            defense: 80,
            speed: 40,
            specialAttack: 60,
            specialDefense: 45,
            type: CreatureType.Psychic
        },
        evolvedFormId: 103
    },
    {
        id: 103,
        name: "Exeggutor",
        stats: {
            hp: 95,
            attack: 95,
            defense: 85,
            speed: 55,
            specialAttack: 125,
            specialDefense: 75,
            type: CreatureType.Psychic
        }
    },
    {
        id: 104,
        name: "Cubone",
        stats: {
            hp: 50,
            attack: 50,
            defense: 95,
            speed: 35,
            specialAttack: 40,
            specialDefense: 50,
            type: CreatureType.Ground
        },
        evolvedFormId: 105
    },
    {
        id: 105,
        name: "Marowak",
        stats: {
            hp: 60,
            attack: 80,
            defense: 110,
            speed: 45,
            specialAttack: 50,
            specialDefense: 80,
            type: CreatureType.Ground
        }
    },
    {
        id: 106,
        name: "Hitmonlee",
        stats: {
            hp: 50,
            attack: 120,
            defense: 53,
            speed: 87,
            specialAttack: 35,
            specialDefense: 110,
            type: CreatureType.Fighting
        },
        cost: 3
    },
    {
        id: 107,
        name: "Hitmonchan",
        stats: {
            hp: 50,
            attack: 105,
            defense: 79,
            speed: 76,
            specialAttack: 35,
            specialDefense: 110,
            type: CreatureType.Fighting
        },
        cost: 3
    },
    {
        id: 108,
        name: "Lickitung",
        stats: {
            hp: 90,
            attack: 55,
            defense: 75,
            speed: 30,
            specialAttack: 60,
            specialDefense: 75,
            type: CreatureType.Normal
        }
    },
    {
        id: 109,
        name: "Koffing",
        stats: {
            hp: 40,
            attack: 65,
            defense: 95,
            speed: 35,
            specialAttack: 60,
            specialDefense: 45,
            type: CreatureType.Poison
        },
        cost: 2,
        evolvedFormId: 110
    },
    {
        id: 110,
        name: "Weezing",
        stats: {
            hp: 65,
            attack: 90,
            defense: 120,
            speed: 60,
            specialAttack: 85,
            specialDefense: 70,
            type: CreatureType.Poison
        }
    },
    {
        id: 111,
        name: "Rhyhorn",
        stats: {
            hp: 80,
            attack: 85,
            defense: 95,
            speed: 25,
            specialAttack: 30,
            specialDefense: 30,
            type: CreatureType.Ground
        },
        evolvedFormId: 112
    },
    {
        id: 112,
        name: "Rhydon",
        stats: {
            hp: 105,
            attack: 130,
            defense: 120,
            speed: 40,
            specialAttack: 45,
            specialDefense: 45,
            type: CreatureType.Ground
        }
    },
    {
        id: 113,
        name: "Chansey",
        stats: {
            hp: 250,
            attack: 5,
            defense: 5,
            speed: 50,
            specialAttack: 35,
            specialDefense: 105,
            type: CreatureType.Normal
        }
    },
    {
        id: 114,
        name: "Tangela",
        stats: {
            hp: 65,
            attack: 55,
            defense: 115,
            speed: 60,
            specialAttack: 100,
            specialDefense: 40,
            type: CreatureType.Water
        }
    },
    {
        id: 115,
        name: "Kangaskhan",
        stats: {
            hp: 105,
            attack: 95,
            defense: 80,
            speed: 90,
            specialAttack: 40,
            specialDefense: 80,
            type: CreatureType.Normal
        }
    },
    {
        id: 116,
        name: "Horsea",
        stats: {
            hp: 30,
            attack: 40,
            defense: 70,
            speed: 60,
            specialAttack: 70,
            specialDefense: 25,
            type: CreatureType.Water
        },
        evolvedFormId: 117
    },
    {
        id: 117,
        name: "Seadra",
        stats: {
            hp: 55,
            attack: 65,
            defense: 95,
            speed: 85,
            specialAttack: 95,
            specialDefense: 45,
            type: CreatureType.Water
        }
    },
    {
        id: 118,
        name: "Goldeen",
        stats: {
            hp: 45,
            attack: 67,
            defense: 60,
            speed: 63,
            specialAttack: 35,
            specialDefense: 50,
            type: CreatureType.Water
        }
        ,
        evolvedFormId: 119
    },
    {
        id: 119,
        name: "Seaking",
        stats: {
            hp: 80,
            attack: 92,
            defense: 65,
            speed: 68,
            specialAttack: 65,
            specialDefense: 80,
            type: CreatureType.Water
        }
    },
    {
        id: 120,
        name: "Staryu",
        stats: {
            hp: 30,
            attack: 45,
            defense: 55,
            speed: 85,
            specialAttack: 70,
            specialDefense: 55,
            type: CreatureType.Water
        },
        evolvedFormId: 121
    },
    {
        id: 121,
        name: "Starmie",
        stats: {
            hp: 60,
            attack: 75,
            defense: 85,
            speed: 115,
            specialAttack: 100,
            specialDefense: 85,
            type: CreatureType.Water
        }
    },
    {
        id: 122,
        name: "Mr. Mime",
        stats: {
            hp: 40,
            attack: 45,
            defense: 65,
            speed: 90,
            specialAttack: 100,
            specialDefense: 120,
            type: CreatureType.Psychic
        }
    },
    {
        id: 123,
        name: "Scyther",
        stats: {
            hp: 70,
            attack: 110,
            defense: 80,
            speed: 105,
            specialAttack: 55,
            specialDefense: 80,
            type: CreatureType.Bug
        },
        cost: 4
    },
    {
        id: 124,
        name: "Jynx",
        stats: {
            hp: 65,
            attack: 50,
            defense: 35,
            speed: 95,
            specialAttack: 115,
            specialDefense: 95,
            type: CreatureType.Psychic
        }
    },
    {
        id: 125,
        name: "Electabuzz",
        stats: {
            hp: 65,
            attack: 83,
            defense: 57,
            speed: 105,
            specialAttack: 95,
            specialDefense: 85,
            type: CreatureType.Electric
        },
        cost: 2
    },
    {
        id: 126,
        name: "Magmar",
        stats: {
            hp: 65,
            attack: 95,
            defense: 57,
            speed: 93,
            specialAttack: 100,
            specialDefense: 85,
            type: CreatureType.Fire
        }
    },
    {
        id: 127,
        name: "Pinsir",
        stats: {
            hp: 65,
            attack: 125,
            defense: 100,
            speed: 85,
            specialAttack: 55,
            specialDefense: 70,
            type: CreatureType.Bug
        }
    },
    {
        id: 128,
        name: "Tauros",
        stats: {
            hp: 75,
            attack: 100,
            defense: 95,
            speed: 110,
            specialAttack: 40,
            specialDefense: 70,
            type: CreatureType.Normal
        }
    },
    {
        id: 129,
        name: "Magikarp",
        stats: {
            hp: 80,
            attack: 1,
            defense: 55,
            speed: 80,
            specialAttack: 15,
            specialDefense: 20,
            type: CreatureType.Water
        },
        cost: 4,
        evolvedFormId: 130
    },
    {
        id: 130,
        name: "Gyarados",
        stats: {
            hp: 95,
            attack: 125,
            defense: 79,
            speed: 81,
            specialAttack: 60,
            specialDefense: 100,
            type: CreatureType.Water
        }
    },
    {
        id: 131,
        name: "Lapras",
        stats: {
            hp: 130,
            attack: 85,
            defense: 80,
            speed: 60,
            specialAttack: 85,
            specialDefense: 95,
            type: CreatureType.Water
        }
    },
    {
        id: 132,
        name: "Ditto",
        stats: {
            hp: 48,
            attack: 48,
            defense: 48,
            speed: 48,
            specialAttack: 48,
            specialDefense: 48,
            type: CreatureType.Normal
        }
    },
    {
        id: 133,
        name: "Eevee",
        stats: {
            hp: 55,
            attack: 55,
            defense: 50,
            speed: 55,
            specialAttack: 45,
            specialDefense: 65,
            type: CreatureType.Normal
        },
        evolvedFormId: -1 // This will have to work differently
    },
    {
        id: 134,
        name: "Vaporeon",
        stats: {
            hp: 130,
            attack: 65,
            defense: 60,
            speed: 65,
            specialAttack: 110,
            specialDefense: 95,
            type: CreatureType.Water
        }
    },
    {
        id: 135,
        name: "Jolteon",
        stats: {
            hp: 65,
            attack: 65,
            defense: 60,
            speed: 130,
            specialAttack: 110,
            specialDefense: 95,
            type: CreatureType.Electric
        }
    },
    {
        id: 136,
        name: "Flareon",
        stats: {
            hp: 65,
            attack: 130,
            defense: 60,
            speed: 65,
            specialAttack: 95,
            specialDefense: 110,
            type: CreatureType.Fire
        }
    },
    {
        id: 137,
        name: "Porygon",
        stats: {
            hp: 65,
            attack: 60,
            defense: 70,
            speed: 40,
            specialAttack: 85,
            specialDefense: 75,
            type: CreatureType.Normal
        }
    },
    {
        id: 138,
        name: "Omanyte",
        stats: {
            hp: 35,
            attack: 40,
            defense: 100,
            speed: 35,
            specialAttack: 90,
            specialDefense: 55,
            type: CreatureType.Rock
        },
        evolvedFormId: 139
    },
    {
        id: 139,
        name: "Omastar",
        stats: {
            hp: 70,
            attack: 60,
            defense: 125,
            speed: 55,
            specialAttack: 115,
            specialDefense: 70,
            type: CreatureType.Rock
        }
    },
    {
        id: 140,
        name: "Kabuto",
        stats: {
            hp: 30,
            attack: 80,
            defense: 90,
            speed: 55,
            specialAttack: 55,
            specialDefense: 45,
            type: CreatureType.Rock
        },
        evolvedFormId: 141
    },
    {
        id: 141,
        name: "Kabutops",
        stats: {
            hp: 60,
            attack: 115,
            defense: 105,
            speed: 80,
            specialAttack: 65,
            specialDefense: 70,
            type: CreatureType.Rock
        }
    },
    {
        id: 142,
        name: "Aerodactyl",
        stats: {
            hp: 80,
            attack: 105,
            defense: 65,
            speed: 130,
            specialAttack: 60,
            specialDefense: 75,
            type: CreatureType.Flying
        },
        cost: 5
    },
    {
        id: 143,
        name: "Snorlax",
        stats: {
            hp: 160,
            attack: 110,
            defense: 65,
            speed: 30,
            specialAttack: 65,
            specialDefense: 110,
            type: CreatureType.Normal
        }
    },
    {
        id: 144,
        name: "Articuno",
        stats: {
            hp: 90,
            attack: 85,
            defense: 100,
            speed: 85,
            specialAttack: 95,
            specialDefense: 125,
            type: CreatureType.Flying
        }
    },
    {
        id: 145,
        name: "Zapdos",
        stats: {
            hp: 90,
            attack: 90,
            defense: 85,
            speed: 100,
            specialAttack: 125,
            specialDefense: 90,
            type: CreatureType.Electric
        }
    },
    {
        id: 146,
        name: "Moltres",
        stats: {
            hp: 90,
            attack: 100,
            defense: 90,
            speed: 90,
            specialAttack: 125,
            specialDefense: 85,
            type: CreatureType.Fire
        }
    },
    {
        id: 147,
        name: "Dratini",
        stats: {
            hp: 41,
            attack: 64,
            defense: 45,
            speed: 50,
            specialAttack: 50,
            specialDefense: 50,
            type: CreatureType.Normal
        },
        cost: 4,
        evolvedFormId: 148
    },
    {
        id: 148,
        name: "Dragonair",
        stats: {
            hp: 61,
            attack: 84,
            defense: 65,
            speed: 70,
            specialAttack: 70,
            specialDefense: 70,
            type: CreatureType.Normal
        },
        evolvedFormId: 149
    },
    {
        id: 149,
        name: "Dragonite",
        stats: {
            hp: 91,
            attack: 134,
            defense: 95,
            speed: 80,
            specialAttack: 100,
            specialDefense: 100,
            type: CreatureType.Normal
        }
    },
    {
        id: 150,
        name: "Mewtwo",
        stats: {
            hp: 106,
            attack: 110,
            defense: 90,
            speed: 130,
            specialAttack: 154,
            specialDefense: 90,
            type: CreatureType.Psychic
        }
    },
    {
        id: 151,
        name: "Mew",
        stats: {
            hp: 100,
            attack: 100,
            defense: 100,
            speed: 100,
            specialAttack: 100,
            specialDefense: 100,
            type: CreatureType.Psychic
        }
    }
]);

const definitionArray = Array.from(definitionMap.values());

export const getDefinition = (id: number) => definitionMap.get(id);
export const getAllDefinitions = () => definitionArray;

// When pieces are combined, non-basic pieces do not currently have a cost, so use  placeholder value of $6
export const getPieceCost = (id: number) => getDefinition(id).cost || 6;

export const getStats = (id: number) => getDefinition(id).stats;

export const getRequiredQuantityToEvolve = (id: number) => 3;
