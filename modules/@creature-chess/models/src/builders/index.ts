import { Card } from "../card";
import { CreatureDefinition, DefinitionClass } from "../creatureDefinition";
import { CreatureType } from "../creatureType";
import { PieceModel } from "../piece";

export const buildDefinition = (
	definition: Partial<CreatureDefinition> = {}
): CreatureDefinition => ({
	id: 1,
	name: "Creature",
	type: CreatureType.Earth,
	class: DefinitionClass.ARCANE,
	cost: 1,
	stages: [],
	...definition,
});

export const buildPieceModel = (
	piece: Partial<PieceModel> = {}
): PieceModel => ({
	id: "123",
	ownerId: "abc",
	definitionId: 1,
	definition: buildDefinition(),
	facingAway: false,
	maxHealth: 100,
	currentHealth: 100,
	stage: 0,
	lastBattleStats: null,
	...piece,
});

export const buildCard = (card: Partial<Card> = {}): Card => ({
	id: "123",
	name: "Card",
	definitionId: 1,
	type: CreatureType.Metal,
	class: DefinitionClass.ARCANE,
	cost: 1,
	...card,
});
