import { definePluginFromPackage } from "@cc-engine/kernel";

// Side-effect: pulls in gamemode's PluginContext declaration merge so `ctx.creatures` is typed.
import "@creature-chess/gamemode";

import pkg from "../package.json";
import { vanillaCreatureDefinitions } from "./definitions";

export default definePluginFromPackage(pkg, {
	onEnable: (ctx) => {
		for (const def of vanillaCreatureDefinitions) {
			ctx.creatures.set(def.id, def);
		}
		ctx.logger.info(
			`creatures-vanilla seeded ${vanillaCreatureDefinitions.length} creature definitions`
		);
	},
});
