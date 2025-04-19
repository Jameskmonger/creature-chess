import { CreatureStats, AttackType, attackTypes } from "@creature-chess/models";
import { TraitId } from "@creature-chess/models/gamemode/traits";

// each trait has points to assign
// these are then used, along with piece cost and stage, to get stats
// the decimals here indicate how the points are assigned for each trait
const traitBuilds: Partial<Record<TraitId, ReturnType<typeof getBaseStats>>> = {
	["valiant"]: {
		hp: 0.4,
		attack: 0.2,
		defense: 0.3,
		speed: 0.2,
	},
	["arcane"]: {
		hp: 0.2,
		attack: 0.4,
		defense: 0.2,
		speed: 0.3,
	},
	["cunning"]: {
		hp: 0.1,
		attack: 0.4,
		defense: 0.1,
		speed: 0.45,
	},
};

const getBaseStats = (): Omit<CreatureStats, "attackType"> => ({
	hp: 10,
	attack: 10,
	defense: 10,
	speed: 10,
});

const getPoints = (cost: number, stage: number): number => {
	const COST_MODIFIER = 1.5;

	if (stage === 0) {
		return cost * COST_MODIFIER * 20;
	}

	if (stage === 1) {
		return cost * COST_MODIFIER * 80;
	}

	if (stage === 2) {
		return cost * COST_MODIFIER * 210;
	}

	return 0;
};

const getStat = (
	baseStat: number,
	buildStat: number,
	availablePoints: number
) => baseStat + Math.ceil(buildStat * availablePoints);

const getStats = (
	traits: TraitId[],
	cost: number,
	stage: number
): CreatureStats => {
	const baseStats = getBaseStats();
	const availablePoints = getPoints(cost, stage);

	// TODO: currently pieces have 2 traits and the 2nd one is used to determine build
	const combatTrait = traits[1];

	const build = traitBuilds[combatTrait] ?? {
		hp: 0.01,
		attack: 0.01,
		defense: 0.01,
		speed: 0.01,
	};

	const attackType: AttackType =
		combatTrait === "arcane" ? attackTypes.shoot : attackTypes.basic;

	return {
		hp: getStat(baseStats.hp, build.hp, availablePoints),
		attack: getStat(baseStats.attack, build.attack, availablePoints),
		defense: getStat(baseStats.defense, build.defense, availablePoints),
		speed: getStat(baseStats.speed, build.speed, availablePoints),
		attackType,
	};
};

export const getStages = (traits: TraitId[], cost: number): CreatureStats[] => [
	getStats(traits, cost, 0),
	getStats(traits, cost, 1),
	getStats(traits, cost, 2),
];
