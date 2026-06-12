import { ClientPlugin } from "@cc-plugins/api";

export interface ClientPluginRegistry {
	register(plugin: ClientPlugin): void;
	list(): readonly ClientPlugin[];
	/** Bumps on every registration. */
	version(): number;
	/** Returns an unsubscribe. */
	onChange(fn: () => void): () => void;
}

export const createClientPluginRegistry = (): ClientPluginRegistry => {
	const plugins: ClientPlugin[] = [];
	const subscribers = new Set<() => void>();
	let version = 0;

	return {
		register(plugin) {
			if (plugins.some((p) => p.id === plugin.id)) {
				throw new Error(`Client plugin "${plugin.id}" registered twice`);
			}
			plugins.push(plugin);
			version += 1;
			for (const fn of subscribers) {
				fn();
			}
		},
		list() {
			return plugins;
		},
		version() {
			return version;
		},
		onChange(fn) {
			subscribers.add(fn);
			return () => {
				subscribers.delete(fn);
			};
		},
	};
};

export const pluginRegistry: ClientPluginRegistry = createClientPluginRegistry();

// Bundles whose load timed out or errored.
const failedPluginIds = new Set<string>();

export const markPluginFailed = (id: string): void => {
	failedPluginIds.add(id);
};

export const registerClientPlugin = (plugin: ClientPlugin): void => {
	if (failedPluginIds.has(plugin.id)) {
		// eslint-disable-next-line no-console
		console.warn(
			`[plugins] ignoring late register() from "${plugin.id}" - its bundle already timed out or failed to load`
		);
		return;
	}
	pluginRegistry.register(plugin);
	// eslint-disable-next-line no-console
	console.info(`[plugins] registered "${plugin.id}"`);
};
