import { CreatureType } from "../models/creatureType";
import { CreatureDefinition, attackTypes } from "../models/creatureDefinition";

export const definitions: CreatureDefinition[] = [
    {
        id: 1,
        name: "Rockat",
        cost: 2,
        type: CreatureType.Earth,
        stages: [
            {
                hp: 20,
                attack: 15,
                defense: 30,
                speed: 20,
                attackType: attackTypes.basic
            },
            {
                hp: 30,
                attack: 22,
                defense: 33,
                speed: 30,
                attackType: attackTypes.basic
            },
            {
                hp: 35,
                attack: 28,
                defense: 35,
                speed: 36,
                attackType: attackTypes.basic
            }
        ]
    },
    {
        id: 2,
        name: "Grintrock",
        cost: 4,
        type: CreatureType.Earth,
        stages: [
            {
                hp: 30,
                attack: 12,
                defense: 35,
                speed: 10,
                attackType: attackTypes.basic
            },
            {
                hp: 40,
                attack: 18,
                defense: 38,
                speed: 20,
                attackType: attackTypes.basic
            },
            {
                hp: 55,
                attack: 32,
                defense: 45,
                speed: 24,
                attackType: attackTypes.basic
            }
        ]
    },
    {
        id: 3,
        name: "Heronquak",
        cost: 3,
        type: CreatureType.Water,
        stages: [
            {
                hp: 20,
                attack: 15,
                defense: 10,
                speed: 35,
                attackType: attackTypes.basic
            },
            {
                hp: 30,
                attack: 21,
                defense: 14,
                speed: 45,
                attackType: attackTypes.basic
            },
            {
                hp: 55,
                attack: 33,
                defense: 20,
                speed: 30,
                attackType: attackTypes.basic
            }
        ]
    },
    {
        id: 4,
        name: "Bigfin",
        cost: 4,
        type: CreatureType.Water,
        stages: [
            {
                hp: 30,
                attack: 25,
                defense: 20,
                speed: 20,
                attackType: attackTypes.basic
            },
            {
                hp: 40,
                attack: 32,
                defense: 24,
                speed: 24,
                attackType: attackTypes.basic
            },
            {
                hp: 40,
                attack: 52,
                defense: 26,
                speed: 30,
                attackType: attackTypes.basic
            }
        ]
    },
    {
        id: 5,
        name: "Bamboon",
        cost: 2,
        type: CreatureType.Wood,
        stages: [
            {
                hp: 12,
                attack: 16,
                defense: 10,
                speed: 28,
                attackType: attackTypes.basic
            },
            {
                hp: 18,
                attack: 22,
                defense: 16,
                speed: 34,
                attackType: attackTypes.basic
            },
            {
                hp: 24,
                attack: 25,
                defense: 22,
                speed: 38,
                attackType: attackTypes.basic
            }
        ]
    },
    {
        id: 6,
        name: "Gectile",
        cost: 4,
        type: CreatureType.Wood,
        stages: [
            {
                hp: 20,
                attack: 15,
                defense: 10,
                speed: 35,
                attackType: attackTypes.basic
            },
            {
                hp: 30,
                attack: 21,
                defense: 14,
                speed: 45,
                attackType: attackTypes.basic
            },
            {
                hp: 55,
                attack: 33,
                defense: 20,
                speed: 30,
                attackType: attackTypes.basic
            }
        ]
    },
    {
        id: 7,
        name: "Arthrobolt",
        cost: 2,
        type: CreatureType.Metal,
        stages: [
            {
                hp: 20,
                attack: 10,
                defense: 16,
                speed: 14,
                attackType: attackTypes.basic
            },
            {
                hp: 26,
                attack: 16,
                defense: 22,
                speed: 17,
                attackType: attackTypes.basic
            },
            {
                hp: 35,
                attack: 25,
                defense: 20,
                speed: 25,
                attackType: attackTypes.basic
            }
        ]
    },
    {
        id: 8,
        name: "Bugnin",
        cost: 4,
        type: CreatureType.Metal,
        stages: [
            {
                hp: 20,
                attack: 9,
                defense: 30,
                speed: 20,
                attackType: attackTypes.basic
            },
            {
                hp: 30,
                attack: 12,
                defense: 33,
                speed: 30,
                attackType: attackTypes.basic
            },
            {
                hp: 35,
                attack: 38,
                defense: 35,
                speed: 36,
                attackType: attackTypes.basic
            }
        ]
    },
    {
        id: 9,
        name: "Cardinale",
        cost: 2,
        type: CreatureType.Fire,
        stages: [
            {
                hp: 12,
                attack: 16,
                defense: 10,
                speed: 28,
                attackType: attackTypes.basic
            },
            {
                hp: 18,
                attack: 22,
                defense: 16,
                speed: 34,
                attackType: attackTypes.basic
            },
            {
                hp: 24,
                attack: 25,
                defense: 20,
                speed: 38,
                attackType: attackTypes.basic
            }
        ]
    },
    {
        id: 10,
        name: "Agnidon",
        cost: 4,
        type: CreatureType.Fire,
        stages: [
            {
                hp: 20,
                attack: 15,
                defense: 10,
                speed: 35,
                attackType: attackTypes.basic
            },
            {
                hp: 30,
                attack: 21,
                defense: 14,
                speed: 45,
                attackType: attackTypes.basic
            },
            {
                hp: 55,
                attack: 33,
                defense: 20,
                speed: 30,
                attackType: attackTypes.basic
            }
        ]
    },
    {
        id: 11,
        name: "Viviteel",
        cost: 5,
        type: CreatureType.Metal,
        stages: [
            {
                hp: 30,
                attack: 27,
                defense: 25,
                speed: 35,
                attackType: attackTypes.basic
            },
            {
                hp: 36,
                attack: 35,
                defense: 32,
                speed: 41,
                attackType: attackTypes.basic
            },
            {
                hp: 42,
                attack: 42,
                defense: 39,
                speed: 47,
                attackType: attackTypes.basic
            }
        ]
    }
];
