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
    name: string;
    range: number;
}

type AttackTypeName = "basic" | "shoot";

export const attackTypes: {[name in AttackTypeName]: AttackType} = {
    basic: { name: "basic", range: 1 },
    shoot: { name: "shoot", range: 2 }
};
