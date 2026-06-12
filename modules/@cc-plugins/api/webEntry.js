/* eslint-disable */

const { getClientPluginRuntime } = require("@cc-plugins/api");

const mod = require("@cc-plugins-entry");
const plugin = mod && (mod.default ?? mod.plugin ?? mod);

if (!plugin || typeof plugin !== "object" || typeof plugin.id !== "string") {
	throw new Error(
		"@cc-plugins/api webEntry: the configured entry must export a default `ClientPlugin` (an object with an `id` string). " +
			"Got: " +
			JSON.stringify(plugin)
	);
}

getClientPluginRuntime().register(plugin);
