import { CreatureStats, AttackType, attackTypes, DefinitionClass } from "@creature-chess/models/src/creatureDefinition";

// each class has points to assign
// these are then used, along with piece cost and stage, to get stats
// the decimals here indicate how the points are assigned for each class
export const classBuilds = {
    [DefinitionClass.VALIANT]: {
        hp: 0.4,
        attack: 0.2,
        defense: 0.3,
        speed: 0.2
    },
    [DefinitionClass.ARCANE]: {
        hp: 0.2,
        attack: 0.4,
        defense: 0.2,
        speed: 0.3
    },
    [DefinitionClass.CUNNING]: {
        hp: 0.1,
        attack: 0.4,
        defense: 0.1,
        speed: 0.45
    }
};

const getBaseStats = (): Omit<CreatureStats, "attackType"> => {
    return {
        hp: 10,
        attack: 10,
        defense: 10,
        speed: 10
    };
};

const getPoints = (cost: number, stage: number): number => {
    const COST_MODIFIER = 1.5;

    if (stage === 0) {
        return (cost * COST_MODIFIER) * 20;
    }

    if (stage === 1) {
        return (cost * COST_MODIFIER) * 80;
    }

    if (stage === 2) {
        return (cost * COST_MODIFIER) * 210;
    }
};

const getStat = (baseStat: number, buildStat: number, availablePoints: number) => {
    return baseStat + Math.ceil(buildStat * availablePoints);
};

const getStats = (definitionClass: DefinitionClass, cost: number, stage: number): CreatureStats => {
    const baseStats = getBaseStats();
    const availablePoints = getPoints(cost, stage);

    const build = classBuilds[definitionClass];

    const attackType: AttackType = (
        definitionClass === DefinitionClass.ARCANE
            ? attackTypes.shoot
            : attackTypes.basic
    );

    return {
        hp: getStat(baseStats.hp, build.hp, availablePoints),
        attack: getStat(baseStats.attack, build.attack, availablePoints),
        defense: getStat(baseStats.defense, build.defense, availablePoints),
        speed: getStat(baseStats.speed, build.speed, availablePoints),
        attackType
    };
};

export const getStages = (definitionClass: DefinitionClass, cost: number): CreatureStats[] => {
    return [
        getStats(definitionClass, cost, 0),
        getStats(definitionClass, cost, 1),
        getStats(definitionClass, cost, 2)
    ];
};
