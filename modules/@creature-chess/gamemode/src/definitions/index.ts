import { CreatureDefinition } from "@creature-chess/models";
import { TraitId } from "@creature-chess/models/gamemode/traits";

import { getStages } from "./definitionClass";

const createDefinition = (
	id: number,
	name: string,
	traits: TraitId[],
	cost: number
): CreatureDefinition => ({
	id,
	name,
	traits,
	cost,
	stages: getStages(traits, cost),
});

const definitionsArray: CreatureDefinition[] = [
	createDefinition(1, "Budaye", ["wood", "valiant"], 1),
	createDefinition(2, "Anoleaf", ["wood", "cunning"], 1),
	createDefinition(3, "Rockitten", ["earth", "valiant"], 1),
	createDefinition(4, "Aardorn", ["earth", "cunning"], 1),
	createDefinition(5, "Nut", ["metal", "valiant"], 1),
	createDefinition(6, "Puparmor", ["metal", "valiant"], 1),
	createDefinition(7, "Embra", ["fire", "arcane"], 1),
	createDefinition(8, "Tweesher", ["water", "arcane"], 1),
	createDefinition(9, "Bamboon", ["wood", "valiant"], 2),
	createDefinition(10, "Chenipode", ["earth", "cunning"], 2),
	createDefinition(11, "Bolt", ["metal", "valiant"], 2),
	createDefinition(12, "Weavifly", ["metal", "arcane"], 1),
	createDefinition(13, "Cardiling", ["fire", "cunning"], 2),
	createDefinition(14, "Agnite", ["fire", "valiant"], 2),
	createDefinition(15, "Elowind", ["water", "arcane"], 2),
	createDefinition(16, "Fluttaflap", ["water", "valiant"], 2),
	createDefinition(17, "Velocitile", ["wood", "cunning"], 3),
	createDefinition(18, "Sapsnap", ["wood", "valiant"], 3),
	createDefinition(19, "Rockat", ["earth", "cunning"], 3),
	createDefinition(20, "Grintot", ["earth", "valiant"], 3),
	createDefinition(21, "Propellorcat", ["metal", "cunning"], 3),
	createDefinition(22, "Sumchon", ["metal", "valiant"], 3),
	createDefinition(23, "Ignibus", ["fire", "valiant"], 3),
	createDefinition(24, "Ruption", ["fire", "arcane"], 3),
	createDefinition(25, "Noctalo", ["water", "cunning"], 3),
	createDefinition(26, "Lightmare", ["water", "valiant"], 3),
	createDefinition(27, "Narcileaf", ["wood", "arcane"], 4),
	createDefinition(28, "Coleorus", ["wood", "cunning"], 4),
	createDefinition(29, "Aardart", ["earth", "cunning"], 4),
	createDefinition(30, "Hubursa", ["earth", "arcane"], 4),
	createDefinition(31, "Sampsack", ["metal", "valiant"], 4),
	createDefinition(32, "Cairfrey", ["metal", "arcane"], 3),
	createDefinition(33, "Prophetoise", ["fire", "arcane"], 4),
	createDefinition(34, "Tikorch", ["fire", "cunning"], 4),
	createDefinition(35, "Nudimind", ["water", "arcane"], 4),
	createDefinition(36, "Dollfin", ["water", "valiant"], 4),
	createDefinition(37, "Arbelder", ["wood", "valiant"], 5),
	createDefinition(38, "Viviphyta", ["wood", "cunning"], 5),
	createDefinition(39, "Grintrock", ["earth", "valiant"], 5),
	createDefinition(40, "Jemuar", ["earth", "cunning"], 5),
	createDefinition(41, "Pyraminx", ["metal", "valiant"], 5),
	createDefinition(42, "AV8R", ["metal", "cunning"], 5),
	createDefinition(43, "Agnigon", ["fire", "valiant"], 5),
	createDefinition(44, "Cardinale", ["fire", "cunning"], 5),
	createDefinition(45, "Nudikill", ["water", "valiant"], 5),
	createDefinition(46, "Eaglace", ["water", "cunning"], 5),
	createDefinition(47, "Kirkanon", ["metal", "arcane"], 5),
];

const definitionMap = new Map<number, CreatureDefinition>();

definitionsArray.forEach((d) => {
	definitionMap.set(d.id, d);
});

export const getDefinitionById = (id: number) => definitionMap.get(id);
export const getAllDefinitions = () => [...definitionsArray];
