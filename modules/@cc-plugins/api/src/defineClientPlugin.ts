import { ClientPlugin } from "./clientPlugin";

/** Subset of `package.json` that `defineClientPlugin` reads. */
export interface ClientPluginPackageJson {
	name?: string;
}

/**
 * Derives the `id` from the plugin's `package.json` so it isn't
 * duplicated across files.
 *
 * @param pkg The plugin's `package.json` (imported as JSON).
 * @param def The plugin definition, minus `id`.
 * @returns A `ClientPlugin` with `id` set from `pkg.name`.
 * @throws If `pkg.name` is missing or empty.
 *
 * @example
 * ```ts
 * import { defineClientPlugin } from "@cc-plugins/api";
 * import pkg from "../../package.json";
 *
 * export default defineClientPlugin(pkg, {
 *   reducers: { ... },
 *   ui: [ ... ],
 * });
 * ```
 */
export const defineClientPlugin = (
	pkg: ClientPluginPackageJson,
	def: Omit<ClientPlugin, "id">
): ClientPlugin => {
	if (!pkg.name) {
		throw new Error(
			"defineClientPlugin: package.json must have a non-empty 'name'"
		);
	}
	return { id: pkg.name, ...def };
};
