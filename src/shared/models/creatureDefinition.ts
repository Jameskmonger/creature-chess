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
        name: "Bish",
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
        name: "Bash",
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
        name: "Bosh",
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
        name: "Tedi",
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
        name: "Beari",
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
        name: "Boombear",
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
        name: "Ballboy",
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
        name: "Balla",
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
        name: "Bigball",
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
        name: "Pipsicle",
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
        name: "Sappo",
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
        name: "Treezor",
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
        name: "Shitdog",
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
        name: "Stripedog",
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
        name: "Gundog",
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
        name: "Kindling",
        stats: {
            hp: 37,
            attack: 53,
            defense: 42,
            speed: 68,
            specialAttack: 61,
            specialDefense: 49,
            type: CreatureType.Fire
        },
        cost: 3,
        evolvedFormId: 17
    },
    {
        id: 17,
        name: "Tinderlizard",
        stats: {
            hp: 59,
            attack: 66,
            defense: 71,
            speed: 81,
            specialAttack: 75,
            specialDefense: 60,
            type: CreatureType.Fire
        },
        evolvedFormId: 18
    },
    {
        id: 18,
        name: "Lightersaur",
        stats: {
            hp: 81,
            attack: 87,
            defense: 79,
            speed: 120,
            specialAttack: 101,
            specialDefense: 82,
            type: CreatureType.Fire
        }
    },
    {
        id: 19,
        name: "Vermina",
        stats: {
            hp: 55,
            attack: 47,
            defense: 52,
            speed: 41,
            specialAttack: 40,
            specialDefense: 40,
            type: CreatureType.Ground
        },
        cost: 2,
        evolvedFormId: 20
    },
    {
        id: 20,
        name: "Vermirat",
        stats: {
            hp: 70,
            attack: 62,
            defense: 67,
            speed: 56,
            specialAttack: 55,
            specialDefense: 55,
            type: CreatureType.Ground
        },
        evolvedFormId: 21
    },
    {
        id: 21,
        name: "Verminion",
        stats: {
            hp: 90,
            attack: 92,
            defense: 87,
            speed: 76,
            specialAttack: 75,
            specialDefense: 85,
            type: CreatureType.Ground
        }
    },
    {
        id: 22,
        name: "Mouselet",
        stats: {
            hp: 55,
            attack: 52,
            defense: 47,
            speed: 40,
            specialAttack: 40,
            specialDefense: 40,
            type: CreatureType.Ground
        },
        cost: 2,
        evolvedFormId: 23
    },
    {
        id: 23,
        name: "Mousio",
        stats: {
            hp: 70,
            attack: 67,
            defense: 62,
            speed: 55,
            specialAttack: 55,
            specialDefense: 55,
            type: CreatureType.Ground
        },
        evolvedFormId: 24
    },
    {
        id: 24,
        name: "Sirmouse",
        stats: {
            hp: 90,
            attack: 87,
            defense: 92,
            speed: 75,
            specialAttack: 75,
            specialDefense: 85,
            type: CreatureType.Ground
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
