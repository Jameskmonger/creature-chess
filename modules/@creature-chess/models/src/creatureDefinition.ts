import { TraitId } from "../gamemode/traits";

export type CreatureStats = {
	hp: number;
	attack: number;
	defense: number;
	speed: number;
};

export type CreatureDefinition = {
	id: number;
	name: string;
	cost: number;
	traits: TraitId[];
	attackRange: number;
	stages: CreatureStats[];
};
