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

export type CreatureOrigin = { plugin: string };

/** Read-only view of a creature catalog. */
export type CreatureLookup = {
	get(id: number): CreatureDefinition | undefined;
	has(id: number): boolean;
};

type Slot = { definition: CreatureDefinition; origin: CreatureOrigin };

/**
 * Catalog of creature definitions.
 */
export class CreatureRegistry {
	private readonly slots: Map<number, Slot>;
	private readonly origin: CreatureOrigin | null;

	public constructor(
		slots?: Map<number, Slot>,
		origin: CreatureOrigin | null = null
	) {
		this.slots = slots ?? new Map();
		this.origin = origin;
	}

	public get size(): number {
		return this.slots.size;
	}

	public get(id: number): CreatureDefinition | undefined {
		return this.slots.get(id)?.definition;
	}

	public has(id: number): boolean {
		return this.slots.has(id);
	}

	/** Cross-plugin overwrite logs a warning, but the write still goes through. */
	public set(id: number, definition: CreatureDefinition): void {
		if (!this.origin) {
			throw new Error("CreatureRegistry: cannot set on an unowned registry; use scopedTo() to create a plugin-owned registry");
		}

		const existing = this.slots.get(id);
		if (existing && existing.origin.plugin !== this.origin.plugin) {
			// eslint-disable-next-line no-console
			console.warn(
				`[creatures] id ${id} ("${existing.definition.name}") already registered by plugin "${existing.origin.plugin}"; ` +
					`overwriting with "${definition.name}" from plugin "${this.origin.plugin}". Asset URLs now resolve to the new owner.`
			);
		}

		this.slots.set(id, { definition, origin: this.origin });
	}

	public originOf(id: number): CreatureOrigin | null {
		return this.slots.get(id)?.origin ?? null;
	}

	public *values(): IterableIterator<CreatureDefinition> {
		for (const slot of this.slots.values()) {
			yield slot.definition;
		}
	}

	public *entriesWithOrigin(): IterableIterator<{
		definition: CreatureDefinition;
		origin: CreatureOrigin;
	}> {
		for (const slot of this.slots.values()) {
			yield { ...slot };
		}
	}

	public scopedTo(origin: CreatureOrigin): CreatureRegistry {
		return new CreatureRegistry(this.slots, origin);
	}
}
