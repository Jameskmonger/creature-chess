import { PluginLoader } from "@cc-engine/kernel/loader";
import {
	GamemodeContext,
	createCreatureRegistry,
	createDefines,
	createGameplayEventsBus,
	createBuiltInPlayerActionRegistry,
	createBuiltInWireProtocol,
} from "@creature-chess/gamemode";
import { readFileSync } from "fs";
import { join } from "path";

import { logger } from "./log";

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { categorisePlugin } = require(
	join(process.cwd(), "scripts/resolvePlugin.js")
) as {
	categorisePlugin: (id: string) => {
		id: string;
		kind: "isomorphic" | "server-only" | "client-only" | "not-found";
		serverEntry: boolean;
		clientBundle: string | null;
	};
};

interface CreatureChessManifest {
	plugins: string[];
}

const readManifest = (): CreatureChessManifest => {
	const filename = process.env.CREATURE_CHESS_MANIFEST ?? "creature-chess.json";
	const path = join(process.cwd(), filename);
	const raw = readFileSync(path, "utf8");
	return JSON.parse(raw) as CreatureChessManifest;
};

export const loadGamemodeAndMods = async (): Promise<GamemodeContext> => {
	const manifest = readManifest();
	const loader = new PluginLoader({ logger });

	const wire = createBuiltInWireProtocol();
	const playerActions = createBuiltInPlayerActionRegistry(wire);

	const context: GamemodeContext = {
		defines: createDefines(),
		creatures: createCreatureRegistry(),
		events: createGameplayEventsBus(),
		playerActions,
		wire,
	};

	const modIds = manifest.plugins.filter((id) => {
		const report = categorisePlugin(id);
		// Pass not-found through so the loader's require() raises the canonical error.
		if (report.kind === "not-found") {
			return true;
		}
		return report.serverEntry;
	});
	const result = await loader.load(modIds, {
		logger,
		...context,
	});

	if (result.failed.length > 0) {
		logger.warn(
			`Mod load completed with ${result.failed.length} failure(s); ${result.loaded.length} loaded`,
			{ failed: result.failed }
		);
	}

	return context;
};
