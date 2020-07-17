import { CreatureStats, AttackType, attackTypes } from "@common/models/creatureDefinition"

export enum DefinitionClass {
    VALIANT = "Valiant",
    ARCANE = "Arcane",
    CUNNING = "Cunning"
}

// each class has points to assign
// these are then used, along with piece cost and stage, to get stats
// the decimals here indicate how the points are assigned for each class
export const classBuilds = {
    [DefinitionClass.VALIANT]: {
        hp: 0.3,
        attack: 0.2,
        defense: 0.3,
        speed: 0.2
    },
    [DefinitionClass.ARCANE]: {
        hp: 0.2,
        attack: 0.3,
        defense: 0.2,
        speed: 0.3
    },
    [DefinitionClass.CUNNING]: {
        hp: 0.1,
        attack: 0.35,
        defense: 0.1,
        speed: 0.45
    }
};

const getBaseStats = (cost: number): Omit<CreatureStats, "attackType"> => {
    if (cost === 1) {
        return {
            hp: 10,
            attack: 10,
            defense: 10,
            speed: 10
        };
    }

    if (cost === 2) {
        return {
            hp: 16,
            attack: 16,
            defense: 16,
            speed: 16
        };
    }

    if (cost === 3) {
        return {
            hp: 25,
            attack: 24,
            defense: 24,
            speed: 25
        };
    }

    if (cost === 4) {
        return {
            hp: 43,
            attack: 40,
            defense: 40,
            speed: 43
        };
    }

    if (cost === 5) {
        return {
            hp: 68,
            attack: 60,
            defense: 60,
            speed: 68
        };
    }
};

const getAvailablePoints = (stage: number): number => {
    if (stage === 0) {
        return 20;
    }

    if (stage === 1) {
        return 32;
    }

    if (stage === 2) {
        return 46;
    }

    if (stage === 3) {
        return 74;
    }

    if (stage === 4) {
        return 110;
    }
};

const getStat = (baseStat: number, buildStat: number, availablePoints: number) => {
    return baseStat + Math.ceil(buildStat * availablePoints);
};

const getStats = (definitionClass: DefinitionClass, cost: number, stage: number): CreatureStats => {
    const baseStats = getBaseStats(cost);
    const availablePoints = getAvailablePoints(stage);

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
