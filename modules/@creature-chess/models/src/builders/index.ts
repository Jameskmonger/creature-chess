import { Card } from "../card";
import { CreatureDefinition } from "../creatureDefinition";
import { PieceModel } from "../piece";

export const buildDefinition = (
	definition: Partial<CreatureDefinition> = {}
): CreatureDefinition => ({
	id: 1,
	name: "Creature",
	traits: ["earth", "arcane"],
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
	traits: [],
	...piece,
});

export const buildCard = (card: Partial<Card> = {}): Card => ({
	id: "123",
	name: "Card",
	definitionId: 1,
	traits: ["metal", "arcane"],
	cost: 1,
	...card,
});
