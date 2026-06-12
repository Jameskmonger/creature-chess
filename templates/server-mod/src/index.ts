import { definePluginFromPackage } from "@cc-engine/kernel";

import pkg from "../package.json";

export default definePluginFromPackage(pkg, {
	/**
	 * Runs once at gamemode boot. Use for any setup that needs to happen before players connect,
	 */
	onEnable: (ctx) => {
		ctx.logger.info("server-mod template enabled - replace this body");
	},
});
