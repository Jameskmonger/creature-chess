import { ClientPlugin } from "./clientPlugin";
import { CLIENT_PLUGIN_RUNTIME_KEY } from "./runtimeKey";

/**
 * Host build-time values exposed to plugins via `runtime.config`.
 *
 * @example
 * ```ts
 * declare module "@cc-plugins/api" {
 *   interface ClientPluginHostConfig {
 *     appUrl: string;
 *     apiUrl: string;
 *   }
 * }
 * ```
 */
// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface ClientPluginHostConfig {}

/**
 * Blessed selectors plugins can call instead of casting `getState()`.
 *
 * @example
 * ```ts
 * declare module "@cc-plugins/api" {
 *   interface ClientPluginHostSelectors {
 *     getLocalPlayerId(): string | null;
 *   }
 * }
 * ```
 */
// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface ClientPluginHostSelectors {}

/**
 * The runtime a loaded plugin bundle talks to. Installed on `globalThis`
 * by the host before any plugin bundle loads.
 */
export interface ClientPluginRuntime {
	/**
	 * Shared libraries the host provides to avoid dual-package issues.
	 */
	shared: {
		react: unknown;
		reactJss: unknown;
		reactRedux: unknown;
		reduxToolkit: unknown;
	};
	config: ClientPluginHostConfig;
	host: ClientPluginHostSelectors;
	/**
	 * Reports whether `host` selectors are safe to call. Prefer {@link onReady} over polling this.
	 */
	readonly isReady: boolean;
	register(plugin: ClientPlugin): void;
	onReady(fn: () => void): void;
}

/** Global key the host installs the runtime under. */
export { CLIENT_PLUGIN_RUNTIME_KEY };

/**
 * Reads the installed runtime. Used by a plugin's web bundle entry.
 *
 * @returns The runtime installed on `globalThis`.
 * @throws If no runtime is installed (the bundle loaded before the host).
 */
export const getClientPluginRuntime = (): ClientPluginRuntime => {
	const runtime = (globalThis as Record<string, unknown>)[
		CLIENT_PLUGIN_RUNTIME_KEY
	] as ClientPluginRuntime | undefined;
	if (!runtime) {
		throw new Error(
			"Creature Chess client plugin runtime not installed - a plugin bundle loaded before the host"
		);
	}
	return runtime;
};
