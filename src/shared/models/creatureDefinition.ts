import { CreatureType } from "./creatureType";

export interface CreatureDefinition {
    id: number;
    name: string;
    cost: number;
    type: CreatureType;
    stages: CreatureStats[];
}

export interface CreatureStats {
    hp: number;
    attack: number;
    defense: number;
    speed: number;
    attackType: AttackType;
}

export interface AttackType {
    range: number;
}

export const attackTypes = {
    basic: { range: 1 },
    shoot: { range: 2 }
};
