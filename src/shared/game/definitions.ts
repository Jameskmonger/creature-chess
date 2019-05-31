import { CreatureType } from "../models/creatureType";

export const definitions = [
    {
        id: 1,
        name: "Bish",
        cost: 3,
        type: CreatureType.Forest,
        stages: [
            {
                hp: 45,
                attack: 49,
                defense: 49,
                speed: 45
            },
            {
                hp: 60,
                attack: 62,
                defense: 63,
                speed: 60
            },
            {
                hp: 80,
                attack: 82,
                defense: 83,
                speed: 80
            }
        ]
    },
    {
        id: 2,
        name: "Tedi",
        cost: 3,
        type: CreatureType.Fire,
        stages: [
            {
                hp: 39,
                attack: 52,
                defense: 43,
                speed: 65
            },
            {
                hp: 58,
                attack: 64,
                defense: 58,
                speed: 80
            },
            {
                hp: 78,
                attack: 84,
                defense: 78,
                speed: 100
            }
        ]
    },
    {
        id: 3,
        name: "Ballboy",
        cost: 3,
        type: CreatureType.Water,
        stages: [
            {
                hp: 44,
                attack: 48,
                defense: 65,
                speed: 43
            },
            {
                hp: 59,
                attack: 63,
                defense: 80,
                speed: 58
            },
            {
                hp: 79,
                attack: 83,
                defense: 100,
                speed: 78
            }
        ]
    },
    {
        id: 4,
        name: "Pipsicle",
        cost: 1,
        type: CreatureType.Forest,
        stages: [
            {
                hp: 45,
                attack: 30,
                defense: 35,
                speed: 45
            },
            {
                hp: 50,
                attack: 20,
                defense: 55,
                speed: 30
            },
            {
                hp: 60,
                attack: 45,
                defense: 50,
                speed: 70
            }
        ]
    },
    {
        id: 5,
        name: "Shitdog",
        cost: 1,
        type: CreatureType.Forest,
        stages: [
            {
                hp: 40,
                attack: 35,
                defense: 30,
                speed: 50
            },
            {
                hp: 45,
                attack: 25,
                defense: 50,
                speed: 35
            },
            {
                hp: 65,
                attack: 90,
                defense: 40,
                speed: 75
            }
        ]
    },
    {
        id: 6,
        name: "Kindling",
        cost: 3,
        type: CreatureType.Fire,
        stages: [
            {
                hp: 37,
                attack: 53,
                defense: 42,
                speed: 68
            },
            {
                hp: 59,
                attack: 66,
                defense: 71,
                speed: 81
            },
            {
                hp: 81,
                attack: 87,
                defense: 79,
                speed: 120
            }
        ]
    },
    {
        id: 7,
        name: "Vermina",
        cost: 2,
        type: CreatureType.Forest,
        stages: [
            {
                hp: 55,
                attack: 47,
                defense: 52,
                speed: 41
            },
            {
                hp: 70,
                attack: 62,
                defense: 67,
                speed: 56
            },
            {
                hp: 90,
                attack: 92,
                defense: 87,
                speed: 76
            }
        ]
    },
    {
        id: 8,
        name: "Mouselet",
        cost: 2,
        type: CreatureType.Forest,
        stages: [
            {
                hp: 55,
                attack: 52,
                defense: 47,
                speed: 40
            },
            {
                hp: 70,
                attack: 67,
                defense: 62,
                speed: 55
            },
            {
                hp: 90,
                attack: 87,
                defense: 92,
                speed: 75
            }
        ]
    }
];
