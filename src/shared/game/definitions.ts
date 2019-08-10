import { CreatureType } from "../models/creatureType";
import { CreatureDefinition } from "../models/creatureDefinition";

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
                speed: 20
            },
            {
                hp: 30,
                attack: 22,
                defense: 33,
                speed: 30
            },
            {
                hp: 35,
                attack: 28,
                defense: 35,
                speed: 36
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
                speed: 10
            },
            {
                hp: 40,
                attack: 18,
                defense: 38,
                speed: 20
            },
            {
                hp: 55,
                attack: 32,
                defense: 45,
                speed: 24
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
                speed: 35
            },
            {
                hp: 30,
                attack: 21,
                defense: 14,
                speed: 45
            },
            {
                hp: 55,
                attack: 33,
                defense: 20,
                speed: 30
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
                speed: 20
            },
            {
                hp: 40,
                attack: 32,
                defense: 24,
                speed: 24
            },
            {
                hp: 40,
                attack: 52,
                defense: 26,
                speed: 30
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
                speed: 28
            },
            {
                hp: 18,
                attack: 22,
                defense: 16,
                speed: 34
            },
            {
                hp: 24,
                attack: 25,
                defense: 22,
                speed: 38
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
                speed: 35
            },
            {
                hp: 30,
                attack: 21,
                defense: 14,
                speed: 45
            },
            {
                hp: 55,
                attack: 33,
                defense: 20,
                speed: 30
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
                speed: 14
            },
            {
                hp: 26,
                attack: 16,
                defense: 22,
                speed: 17
            },
            {
                hp: 35,
                attack: 25,
                defense: 20,
                speed: 25
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
                speed: 20
            },
            {
                hp: 30,
                attack: 12,
                defense: 33,
                speed: 30
            },
            {
                hp: 35,
                attack: 38,
                defense: 35,
                speed: 36
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
                speed: 28
            },
            {
                hp: 18,
                attack: 22,
                defense: 16,
                speed: 34
            },
            {
                hp: 24,
                attack: 25,
                defense: 20,
                speed: 38
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
                speed: 35
            },
            {
                hp: 30,
                attack: 21,
                defense: 14,
                speed: 45
            },
            {
                hp: 55,
                attack: 33,
                defense: 20,
                speed: 30
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
                speed: 35
            },
            {
                hp: 36,
                attack: 35,
                defense: 32,
                speed: 41
            },
            {
                hp: 42,
                attack: 42,
                defense: 39,
                speed: 47
            }
        ]
    }
];
