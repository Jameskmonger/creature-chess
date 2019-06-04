import { CreatureType } from "../models/creatureType";

export const definitions = [
    {
        id: 1,
        name: "Bish",
        cost: 3,
        type: CreatureType.Forest,
        stages: [
            {
                hp: 30,
                attack: 50,
                defense: 50,
                speed: 30
            },
            {
                hp: 40,
                attack: 60,
                defense: 60,
                speed: 40
            },
            {
                hp: 50,
                attack: 70,
                defense: 70,
                speed: 50
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
                hp: 30,
                attack: 50,
                defense: 50,
                speed: 30
            },
            {
                hp: 40,
                attack: 60,
                defense: 60,
                speed: 40
            },
            {
                hp: 50,
                attack: 70,
                defense: 70,
                speed: 50
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
                hp: 30,
                attack: 50,
                defense: 50,
                speed: 30
            },
            {
                hp: 40,
                attack: 60,
                defense: 60,
                speed: 40
            },
            {
                hp: 50,
                attack: 70,
                defense: 70,
                speed: 50
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
                hp: 30,
                attack: 10,
                defense: 30,
                speed: 40
            },
            {
                hp: 40,
                attack: 25,
                defense: 40,
                speed: 55
            },
            {
                hp: 100,
                attack: 20,
                defense: 100,
                speed: 20
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
                hp: 20,
                attack: 30,
                defense: 25,
                speed: 30
            },
            {
                hp: 25,
                attack: 40,
                defense: 35,
                speed: 30
            },
            {
                hp: 40,
                attack: 70,
                defense: 40,
                speed: 80
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
                hp: 30,
                attack: 50,
                defense: 50,
                speed: 30
            },
            {
                hp: 40,
                attack: 60,
                defense: 60,
                speed: 40
            },
            {
                hp: 50,
                attack: 70,
                defense: 70,
                speed: 50
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
                hp: 20,
                attack: 40,
                defense: 20,
                speed: 40
            },
            {
                hp: 30,
                attack: 50,
                defense: 30,
                speed: 55
            },
            {
                hp: 40,
                attack: 90,
                defense: 30,
                speed: 90
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
                hp: 40,
                attack: 25,
                defense: 40,
                speed: 25
            },
            {
                hp: 55,
                attack: 35,
                defense: 55,
                speed: 35
            },
            {
                hp: 70,
                attack: 50,
                defense: 90,
                speed: 40
            }
        ]
    }
];
