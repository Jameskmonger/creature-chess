export interface Trait {
	id: TraitId;
	name: string;
	icon: string;
	tiers: {
		amount: number;
		description: string;
	}[];
}

/**
 * A map of trait IDs to their current piece count. Used for battle logic and game displays.
 */
export type TraitSet = Map<TraitId, number>;

export type TraitId =
	| "fire"
	| "water"
	| "earth"
	| "wood"
	| "metal"
	| "arcane"
	| "valiant"
	| "cunning";
