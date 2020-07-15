import { CreatureDefinition } from "../models/creatureDefinition";
import { definitions } from "./definitions/definitions";

export class DefinitionProvider {
    private definitions = new Map<number, CreatureDefinition>();

    constructor() {
        definitions.forEach(d => {
            this.definitions.set(d.id, d);
        });
    }

    public get(id: number) {
        return this.definitions.get(id);
    }

    public getAll() {
        return Array.from(this.definitions.values());
    }
}
