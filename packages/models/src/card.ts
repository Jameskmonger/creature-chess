import { DefinitionClass } from "./creatureDefinition";
import { CreatureType } from "./creatureType";

export interface Card {
	id: string;
	definitionId: number;
	cost: number;
	name: string;
	type: CreatureType;
	class: DefinitionClass;
}
