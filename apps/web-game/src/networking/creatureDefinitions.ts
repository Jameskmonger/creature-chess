import { CreatureDefinition } from "@creature-chess/models";

import { GameServerToClient } from "@creature-chess/networking";

type Entry = { definition: CreatureDefinition; ownerPluginId: string };

const registry = new Map<number, Entry>();

const setEntries = (entries: GameServerToClient.WireCreatureEntry[]): void => {
	for (const e of entries) {
		registry.set(e.definition.id, {
			definition: e.definition,
			ownerPluginId: e.ownerPluginId,
		});
	}
};

export const setCreatureDefinitions = (
	entries: GameServerToClient.WireCreatureEntry[]
): void => {
	registry.clear();
	setEntries(entries);
};

export const getAvailableCreatureIds = (): number[] => [...registry.keys()];

export const getCreatureDefinitionById = (
	id: number
): CreatureDefinition | undefined => registry.get(id)?.definition;

export const getCreatureLookup = () => ({
	get: (id: number) => registry.get(id)?.definition,
	has: (id: number) => registry.has(id),
});

export const getCreatureImageUrl = (
	id: number,
	facing: "front" | "back"
): string | null => {
	const entry = registry.get(id);
	if (!entry) {
		return null;
	}
	return `/plugins/${entry.ownerPluginId}/images/${facing}/${id}.png`;
};

export const loadCreatureCatalog = async (url: string): Promise<void> => {
	try {
		const res = await fetch(url, { cache: "no-cache" });
		if (!res.ok) {
			return;
		}
		const entries = (await res.json()) as GameServerToClient.WireCreatureEntry[];
		setEntries(entries);
	} catch {
		// No catalog (or a malformed one) just means no pre-game art - the full set still arrives upon game connection.
	}
};

export const clearCreatureDefinitions = (): void => {
	registry.clear();
};
