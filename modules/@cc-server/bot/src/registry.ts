import { BotImplementation } from "./types";

export type BotEngine = {
	/** Matches the `engine` column of a row in the `bots` table. */
	id: string;
	/** Parses the row's `meta` blob and returns a wired implementation. */
	build: (meta: unknown) => BotImplementation;
};

export type BotEngineRegistry = {
	register: (engine: BotEngine) => void;
	build: (engineId: string, meta: unknown) => BotImplementation;
};

export const createBotEngineRegistry = (): BotEngineRegistry => {
	const engines = new Map<string, BotEngine>();
	return {
		register: (engine) => {
			if (engines.has(engine.id)) {
				throw new Error(`Bot engine "${engine.id}" already registered`);
			}

			engines.set(engine.id, engine);
		},
		build: (engineId, meta) => {
			const engine = engines.get(engineId);

			if (!engine) {
				throw new Error(`Unknown bot engine "${engineId}"`);
			}

			return engine.build(meta);
		},
	};
};
