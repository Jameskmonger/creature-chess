/**
 * Test scaffolding for client plugins.
 *
 * Does not pull React or Redux. Plugin code that needs
 * them at test time should mock them or use a host stub.
 *
 * @example
 * ```ts
 * import { createPluginTestHarness } from "@cc-plugins/api/test";
 * import myPlugin from "../src/client";
 *
 * test("registers an augment for player-avatar", () => {
 *   const h = createPluginTestHarness();
 *   h.register(myPlugin);
 *   expect(h.uiOpsFor({ id: "x", classes: ["player-avatar"] })).toHaveLength(1);
 *   h.teardown();
 * });
 * ```
 */
import {
	CLIENT_PLUGIN_RUNTIME_KEY,
	ClientPlugin,
	ClientPluginHostConfig,
	ClientPluginRuntime,
	RegionDescriptor,
	UiOperation,
} from "./index";

export interface PluginTestHarness {
	/** The runtime installed on `globalThis`. */
	readonly runtime: ClientPluginRuntime;
	/** Registers a plugin, exactly as a loaded bundle would. */
	register(plugin: ClientPlugin): void;
	/** Plugins registered so far, in registration order. */
	registered(): readonly ClientPlugin[];
	/** UI ops matching a region - for op assertions. */
	uiOpsFor(region: RegionDescriptor): UiOperation[];
	/** Restores the previous runtime global. */
	teardown(): void;
}

const DEFAULT_CONFIG: ClientPluginHostConfig = {
	appUrl: "https://test.local",
	apiUrl: "https://test.local/api",
	imageUrl: "https://test.local/images",
	version: "0.0.0-test",
};

/**
 * Creates a fresh test harness with a stub runtime installed on
 * `globalThis`.
 *
 * @param options Optional overrides for `config` and `shared`.
 * @returns A harness for registering plugins and asserting against contributions.
 */
export const createPluginTestHarness = (
	options: {
		config?: Partial<ClientPluginHostConfig>;
		shared?: Partial<ClientPluginRuntime["shared"]>;
	} = {}
): PluginTestHarness => {
	const registered: ClientPlugin[] = [];
	const runtime: ClientPluginRuntime = {
		shared: {
			react: undefined,
			reactJss: undefined,
			reactRedux: undefined,
			reduxToolkit: undefined,
			...options.shared,
		},
		config: { ...DEFAULT_CONFIG, ...options.config },
		host: {} as ClientPluginRuntime["host"],
		register: (plugin) => {
			if (registered.some((p) => p.id === plugin.id)) {
				throw new Error(`Test plugin "${plugin.id}" registered twice`);
			}
			registered.push(plugin);
		},
		isReady: true,
		onReady: (fn: () => void) => fn(),
	};

	const g = globalThis as Record<string, unknown>;
	const previous = g[CLIENT_PLUGIN_RUNTIME_KEY];
	g[CLIENT_PLUGIN_RUNTIME_KEY] = runtime;

	return {
		runtime,
		register: runtime.register,
		registered: () => registered,
		uiOpsFor: (region) =>
			registered.flatMap(
				(p) => p.ui?.filter((op) => op.match(region)) ?? []
			),
		teardown: () => {
			if (previous === undefined) {
				delete g[CLIENT_PLUGIN_RUNTIME_KEY];
			} else {
				g[CLIENT_PLUGIN_RUNTIME_KEY] = previous;
			}
		},
	};
};
