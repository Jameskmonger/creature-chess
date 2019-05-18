import { CreatureType } from "./creatureType";
import { definitions } from "./__definitions";

export interface CreatureDefinition {
    id: number;
    name: string;
    stats: CreatureStats;
    cost?: number;
    evolvedFormId?: number;
}

export interface CreatureStats {
    hp: number;
    attack: number;
    defense: number;
    speed: number;
    specialAttack: number;
    specialDefense: number;
    type: CreatureType;
}

const definitionMap = new Map<number, CreatureDefinition>();

const mapDefinitions = (definition: CreatureDefinition[]) => {
    definition.forEach(p => {
        definitionMap.set(p.id, p);
    });
};

mapDefinitions(definitions);

const definitionArray = Array.from(definitionMap.values());

export const getDefinition = (id: number) => definitionMap.get(id);
export const getAllDefinitions = () => definitionArray;

// When pieces are combined, non-basic pieces do not currently have a cost, so use  placeholder value of $6
export const getPieceCost = (id: number) => getDefinition(id).cost || 6;

export const getStats = (id: number) => getDefinition(id).stats;

export const getRequiredQuantityToEvolve = (id: number) => 3;
