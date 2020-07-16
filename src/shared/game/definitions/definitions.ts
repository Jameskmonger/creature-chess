import { CreatureType } from "../../models/creatureType";
import { CreatureDefinition } from "../../models/creatureDefinition";
import { getStages, DefinitionClass } from "./definitionClass";

export const definitions: CreatureDefinition[] = [
    {
        id: 1,
        name: "Budaye",
        cost: 1,
        type: CreatureType.Wood,
        stages: getStages(DefinitionClass.VALIANT, 1)
    },
    {
        id: 2,
        name: "Anoleaf",
        cost: 1,
        type: CreatureType.Wood,
        stages: getStages(DefinitionClass.CUNNING, 1)
    },
    {
        id: 3,
        name: "Rockitten",
        cost: 1,
        type: CreatureType.Earth,
        stages: getStages(DefinitionClass.VALIANT, 1)
    },
    {
        id: 4,
        name: "Aardorn",
        cost: 1,
        type: CreatureType.Earth,
        stages: getStages(DefinitionClass.CUNNING, 1)
    },
    {
        id: 5,
        name: "Nut",
        cost: 1,
        type: CreatureType.Metal,
        stages: getStages(DefinitionClass.VALIANT, 1)
    },
    {
        id: 6,
        name: "Puparmor",
        cost: 1,
        type: CreatureType.Metal,
        stages: getStages(DefinitionClass.VALIANT, 1)
    },
    {
        id: 7,
        name: "Embra",
        cost: 1,
        type: CreatureType.Fire,
        stages: getStages(DefinitionClass.ARCANE, 1)
    },
    {
        id: 8,
        name: "Tweesher",
        cost: 1,
        type: CreatureType.Water,
        stages: getStages(DefinitionClass.ARCANE, 1)
    },
    {
        id: 9,
        name: "Bamboon",
        cost: 2,
        type: CreatureType.Wood,
        stages: getStages(DefinitionClass.VALIANT, 2)
    },
    {
        id: 10,
        name: "Chenipode",
        cost: 2,
        type: CreatureType.Earth,
        stages: getStages(DefinitionClass.CUNNING, 2)
    },
    {
        id: 11,
        name: "Bolt",
        cost: 2,
        type: CreatureType.Metal,
        stages: getStages(DefinitionClass.VALIANT, 2)
    },
    {
        id: 12,
        name: "Weavifly",
        cost: 2,
        type: CreatureType.Metal,
        stages: getStages(DefinitionClass.ARCANE, 2)
    },
    {
        id: 13,
        name: "Cardiling",
        cost: 2,
        type: CreatureType.Fire,
        stages: getStages(DefinitionClass.CUNNING, 2)
    },
    {
        id: 14,
        name: "Agnite",
        cost: 2,
        type: CreatureType.Fire,
        stages: getStages(DefinitionClass.VALIANT, 2)
    },
    {
        id: 15,
        name: "Elowind",
        cost: 2,
        type: CreatureType.Water,
        stages: getStages(DefinitionClass.ARCANE, 2)
    },
    {
        id: 16,
        name: "Incandesfin",
        cost: 2,
        type: CreatureType.Water,
        stages: getStages(DefinitionClass.VALIANT, 2)
    },
    {
        id: 17,
        name: "Velocitile",
        cost: 3,
        type: CreatureType.Wood,
        stages: getStages(DefinitionClass.CUNNING, 3)
    },
    {
        id: 18,
        name: "Sapsnap",
        cost: 3,
        type: CreatureType.Wood,
        stages: getStages(DefinitionClass.VALIANT, 3)
    },
    {
        id: 19,
        name: "Rockat",
        cost: 3,
        type: CreatureType.Earth,
        stages: getStages(DefinitionClass.CUNNING, 3)
    },
    {
        id: 20,
        name: "Grintot",
        cost: 3,
        type: CreatureType.Earth,
        stages: getStages(DefinitionClass.VALIANT, 3)
    },
    {
        id: 21,
        name: "Propellorcat",
        cost: 3,
        type: CreatureType.Metal,
        stages: getStages(DefinitionClass.CUNNING, 3)
    },
    {
        id: 22,
        name: "Sumchon",
        cost: 3,
        type: CreatureType.Metal,
        stages: getStages(DefinitionClass.VALIANT, 3)
    },
    {
        id: 23,
        name: "Ignibus",
        cost: 3,
        type: CreatureType.Fire,
        stages: getStages(DefinitionClass.VALIANT, 3)
    },
    {
        id: 24,
        name: "Ruption",
        cost: 3,
        type: CreatureType.Fire,
        stages: getStages(DefinitionClass.ARCANE, 3)
    },
    {
        id: 25,
        name: "Noctalo",
        cost: 3,
        type: CreatureType.Water,
        stages: getStages(DefinitionClass.CUNNING, 3)
    },
    {
        id: 26,
        name: "Lightmare",
        cost: 3,
        type: CreatureType.Water,
        stages: getStages(DefinitionClass.VALIANT, 3)
    },
    {
        id: 27,
        name: "Narcileaf",
        cost: 4,
        type: CreatureType.Wood,
        stages: getStages(DefinitionClass.ARCANE, 4)
    },
    {
        id: 28,
        name: "Coleorus",
        cost: 4,
        type: CreatureType.Wood,
        stages: getStages(DefinitionClass.CUNNING, 4)
    },
    {
        id: 29,
        name: "Aardart",
        cost: 4,
        type: CreatureType.Earth,
        stages: getStages(DefinitionClass.CUNNING, 4)
    },
    {
        id: 30,
        name: "Bursa",
        cost: 4,
        type: CreatureType.Earth,
        stages: getStages(DefinitionClass.ARCANE, 4)
    },
    {
        id: 31,
        name: "Sampsack",
        cost: 4,
        type: CreatureType.Metal,
        stages: getStages(DefinitionClass.VALIANT, 4)
    },
    {
        id: 32,
        name: "Cairfrey",
        cost: 4,
        type: CreatureType.Metal,
        stages: getStages(DefinitionClass.ARCANE, 4)
    },
    {
        id: 33,
        name: "Prophetoise",
        cost: 4,
        type: CreatureType.Fire,
        stages: getStages(DefinitionClass.ARCANE, 4)
    },
    {
        id: 34,
        name: "Tikorch",
        cost: 4,
        type: CreatureType.Fire,
        stages: getStages(DefinitionClass.CUNNING, 4)
    },
    {
        id: 35,
        name: "Nudimind",
        cost: 4,
        type: CreatureType.Water,
        stages: getStages(DefinitionClass.ARCANE, 4)
    },
    {
        id: 36,
        name: "Dollfin",
        cost: 4,
        type: CreatureType.Water,
        stages: getStages(DefinitionClass.VALIANT, 4)
    },
    {
        id: 37,
        name: "Arbelder",
        cost: 5,
        type: CreatureType.Wood,
        stages: getStages(DefinitionClass.VALIANT, 5)
    },
    {
        id: 38,
        name: "Viviphyta",
        cost: 5,
        type: CreatureType.Wood,
        stages: getStages(DefinitionClass.CUNNING, 5)
    },
    {
        id: 39,
        name: "Grintrock",
        cost: 5,
        type: CreatureType.Earth,
        stages: getStages(DefinitionClass.VALIANT, 5)
    },
    {
        id: 40,
        name: "Jemuar",
        cost: 5,
        type: CreatureType.Earth,
        stages: getStages(DefinitionClass.CUNNING, 5)
    },
    {
        id: 41,
        name: "Pyraminx",
        cost: 5,
        type: CreatureType.Metal,
        stages: getStages(DefinitionClass.VALIANT, 5)
    },
    {
        id: 42,
        name: "AV8R",
        cost: 5,
        type: CreatureType.Metal,
        stages: getStages(DefinitionClass.CUNNING, 5)
    },
    {
        id: 43,
        name: "Agnigon",
        cost: 5,
        type: CreatureType.Fire,
        stages: getStages(DefinitionClass.VALIANT, 5)
    },
    {
        id: 44,
        name: "Cardinale",
        cost: 5,
        type: CreatureType.Fire,
        stages: getStages(DefinitionClass.CUNNING, 5)
    },
    {
        id: 45,
        name: "Nudikill",
        cost: 5,
        type: CreatureType.Water,
        stages: getStages(DefinitionClass.VALIANT, 5)
    },
    {
        id: 46,
        name: "Eaglace",
        cost: 5,
        type: CreatureType.Water,
        stages: getStages(DefinitionClass.CUNNING, 5)
    }
];
