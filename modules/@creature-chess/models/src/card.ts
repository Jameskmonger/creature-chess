import { TraitId } from "../gamemode/traits";

export interface Card {
	id: string;
	definitionId: number;
	cost: number;
	name: string;

	traits: TraitId[];
}
