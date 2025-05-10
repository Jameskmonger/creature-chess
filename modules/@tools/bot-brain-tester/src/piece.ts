import { getAllDefinitions } from "@creature-chess/gamemode";
import { Builders, Card } from "@creature-chess/models";

const definitions = getAllDefinitions();

export const makePiece = (
	id: string,
	ownerId: "A" | "B",
	definition: number,
	facingAway: boolean
) =>
	Builders.buildPieceModel({
		id,
		ownerId,
		definition: definitions[definition],
		definitionId: definitions[definition].id,
		facingAway,
	});

export const makeCard = (id: string, definitionId: number): Card => ({
	id,
	definitionId,
	cost: definitions[definitionId].cost,
	traits: definitions[definitionId].traits,
	name: definitions[definitionId].name,
});
