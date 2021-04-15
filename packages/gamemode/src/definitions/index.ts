import { CreatureType, CreatureDefinition, DefinitionClass } from "@creature-chess/models";
import { getStages } from "./definitionClass";

const createDefinition = (id: number, name: string, type: CreatureType, definitionClass: DefinitionClass, cost: number): CreatureDefinition => ({
    id,
    name,
    type,
    class: definitionClass,
    cost,
    stages: getStages(definitionClass, cost)
});

const definitionsArray: CreatureDefinition[] = [
    createDefinition(1, "Budaye", CreatureType.Wood, DefinitionClass.VALIANT, 1),
    createDefinition(2, "Anoleaf", CreatureType.Wood, DefinitionClass.CUNNING, 1),
    createDefinition(3, "Rockitten", CreatureType.Earth, DefinitionClass.VALIANT, 1),
    createDefinition(4, "Aardorn", CreatureType.Earth, DefinitionClass.CUNNING, 1),
    createDefinition(5, "Nut", CreatureType.Metal, DefinitionClass.VALIANT, 1),
    createDefinition(6, "Puparmor", CreatureType.Metal, DefinitionClass.VALIANT, 1),
    createDefinition(7, "Embra", CreatureType.Fire, DefinitionClass.ARCANE, 1),
    createDefinition(8, "Tweesher", CreatureType.Water, DefinitionClass.ARCANE, 1),
    createDefinition(9, "Bamboon", CreatureType.Wood, DefinitionClass.VALIANT, 2),
    createDefinition(10, "Chenipode", CreatureType.Earth, DefinitionClass.CUNNING, 2),
    createDefinition(11, "Bolt", CreatureType.Metal, DefinitionClass.VALIANT, 2),
    createDefinition(12, "Weavifly", CreatureType.Metal, DefinitionClass.ARCANE, 1),
    createDefinition(13, "Cardiling", CreatureType.Fire, DefinitionClass.CUNNING, 2),
    createDefinition(14, "Agnite", CreatureType.Fire, DefinitionClass.VALIANT, 2),
    createDefinition(15, "Elowind", CreatureType.Water, DefinitionClass.ARCANE, 2),
    createDefinition(16, "Fluttaflap", CreatureType.Water, DefinitionClass.VALIANT, 2),
    createDefinition(17, "Velocitile", CreatureType.Wood, DefinitionClass.CUNNING, 3),
    createDefinition(18, "Sapsnap", CreatureType.Wood, DefinitionClass.VALIANT, 3),
    createDefinition(19, "Rockat", CreatureType.Earth, DefinitionClass.CUNNING, 3),
    createDefinition(20, "Grintot", CreatureType.Earth, DefinitionClass.VALIANT, 3),
    createDefinition(21, "Propellorcat", CreatureType.Metal, DefinitionClass.CUNNING, 3),
    createDefinition(22, "Sumchon", CreatureType.Metal, DefinitionClass.VALIANT, 3),
    createDefinition(23, "Ignibus", CreatureType.Fire, DefinitionClass.VALIANT, 3),
    createDefinition(24, "Ruption", CreatureType.Fire, DefinitionClass.ARCANE, 3),
    createDefinition(25, "Noctalo", CreatureType.Water, DefinitionClass.CUNNING, 3),
    createDefinition(26, "Lightmare", CreatureType.Water, DefinitionClass.VALIANT, 3),
    createDefinition(27, "Narcileaf", CreatureType.Wood, DefinitionClass.ARCANE, 4),
    createDefinition(28, "Coleorus", CreatureType.Wood, DefinitionClass.CUNNING, 4),
    createDefinition(29, "Aardart", CreatureType.Earth, DefinitionClass.CUNNING, 4),
    createDefinition(30, "Hubursa", CreatureType.Earth, DefinitionClass.ARCANE, 4),
    createDefinition(31, "Sampsack", CreatureType.Metal, DefinitionClass.VALIANT, 4),
    createDefinition(32, "Cairfrey", CreatureType.Metal, DefinitionClass.ARCANE, 3),
    createDefinition(33, "Prophetoise", CreatureType.Fire, DefinitionClass.ARCANE, 4),
    createDefinition(34, "Tikorch", CreatureType.Fire, DefinitionClass.CUNNING, 4),
    createDefinition(35, "Nudimind", CreatureType.Water, DefinitionClass.ARCANE, 4),
    createDefinition(36, "Dollfin", CreatureType.Water, DefinitionClass.VALIANT, 4),
    createDefinition(37, "Arbelder", CreatureType.Wood, DefinitionClass.VALIANT, 5),
    createDefinition(38, "Viviphyta", CreatureType.Wood, DefinitionClass.CUNNING, 5),
    createDefinition(39, "Grintrock", CreatureType.Earth, DefinitionClass.VALIANT, 5),
    createDefinition(40, "Jemuar", CreatureType.Earth, DefinitionClass.CUNNING, 5),
    createDefinition(41, "Pyraminx", CreatureType.Metal, DefinitionClass.VALIANT, 5),
    createDefinition(42, "AV8R", CreatureType.Metal, DefinitionClass.CUNNING, 5),
    createDefinition(43, "Agnigon", CreatureType.Fire, DefinitionClass.VALIANT, 5),
    createDefinition(44, "Cardinale", CreatureType.Fire, DefinitionClass.CUNNING, 5),
    createDefinition(45, "Nudikill", CreatureType.Water, DefinitionClass.VALIANT, 5),
    createDefinition(46, "Eaglace", CreatureType.Water, DefinitionClass.CUNNING, 5),
    createDefinition(47, "Kirkanon", CreatureType.Metal, DefinitionClass.ARCANE, 5)
];

const definitionMap = new Map<number, CreatureDefinition>();

definitionsArray.forEach(d => {
    definitionMap.set(d.id, d);
});

export const getDefinitionById = (id: number) => definitionMap.get(id);
export const getAllDefinitions = () => [...definitionsArray];
