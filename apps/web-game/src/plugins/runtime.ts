import * as React from "react";

import {
	CLIENT_PLUGIN_RUNTIME_KEY,
	ClientPluginHostSelectors,
	ClientPluginRuntime,
} from "@cc-plugins/api";

// Side-effect: gamemode's declaration-merge for runtime.config/host types.
import "@creature-chess/gamemode/client";
import * as ReduxToolkit from "@reduxjs/toolkit";
import * as ReactJss from "react-jss";
import * as ReactRedux from "react-redux";

import { getCurrentSession, subscribeSession } from "~/networking/sessionSources";
import { AppState } from "~/store";

import { createReadyQueue } from "./readyQueue";
import { markPluginFailed, registerClientPlugin } from "./registry";

let storeRef: { getState: () => AppState } | null = null;
let localPlayerIdGetter: (() => string | null) | null = null;
const readyQueue = createReadyQueue();

const requireWired = (): {
	store: { getState: () => AppState };
	getLocalPlayerId: () => string | null;
} => {
	if (!storeRef || !localPlayerIdGetter) {
		throw new Error(
			"Plugin called runtime.host.* before the host wired its state. " +
				"Defer state reads to `runtime.onReady(() => ...)` or to a listener registered via the plugin's `listeners` array."
		);
	}
	return { store: storeRef, getLocalPlayerId: localPlayerIdGetter };
};

const hostSelectors: ClientPluginHostSelectors = {
	getLocalPlayerId: () => requireWired().getLocalPlayerId(),
	getCurrentPhase: () => requireWired().store.getState().game.roundInfo.phase,
	getSession: () => getCurrentSession(),
	subscribeSession: (listener) => subscribeSession(listener),
};

export const wirePluginHostState = (params: {
	store: { getState: () => AppState };
	getLocalPlayerId: () => string | null;
}): void => {
	storeRef = params.store;
	localPlayerIdGetter = params.getLocalPlayerId;
	readyQueue.fire();
};

/** Must run before any plugin bundle loads. */
export const installPluginRuntime = (): void => {
	const existing = (globalThis as Record<string, unknown>)[
		CLIENT_PLUGIN_RUNTIME_KEY
	];
	if (existing) {
		// eslint-disable-next-line no-console
		console.warn("[plugins] runtime already installed - skipping duplicate install");
		return;
	}
	const runtime: ClientPluginRuntime = {
		shared: {
			react: React,
			reactJss: ReactJss,
			reactRedux: ReactRedux,
			reduxToolkit: ReduxToolkit,
		},
		config: {
			appUrl: APP_URL,
			apiUrl: APP_API_URL,
			imageUrl: APP_IMAGE_ROOT,
			version: APP_VERSION,
		},
		host: hostSelectors,
		register: registerClientPlugin,
		get isReady() {
			return readyQueue.isReady;
		},
		onReady: readyQueue.onReady,
	};
	(globalThis as Record<string, unknown>)[CLIENT_PLUGIN_RUNTIME_KEY] = runtime;
};

type PluginManifest = { plugins: string[] };

// `index.js` lets webpack's `publicPath: "auto"` derive the chunk base URL at load time.
const bundleUrlFor = (id: string) => `/plugins/${id}/index.js`;

const BUNDLE_LOAD_TIMEOUT_MS = 15_000;

const loadScript = (url: string, timeoutMs: number): Promise<void> =>
	new Promise((resolve, reject) => {
		const script = document.createElement("script");
		script.src = url;
		script.async = false;
		const timer = setTimeout(() => {
			script.remove();
			reject(new Error(`Bundle ${url} timed out after ${timeoutMs}ms`));
		}, timeoutMs);
		script.onload = () => {
			clearTimeout(timer);
			resolve();
		};
		script.onerror = () => {
			clearTimeout(timer);
			reject(new Error(`Failed to load client plugin bundle: ${url}`));
		};
		document.head.appendChild(script);
	});

/* eslint-disable no-console */
export const loadClientPlugins = async (manifestUrl: string): Promise<void> => {
	console.info(`[plugins] loading manifest: ${manifestUrl}`);

	let manifest: PluginManifest;
	try {
		const res = await fetch(manifestUrl, { cache: "no-cache" });
		if (!res.ok) {
			console.warn(
				`[plugins] manifest ${manifestUrl} -> HTTP ${res.status}; no client plugins loaded`
			);
			return;
		}
		const body = await res.text();
		try {
			manifest = JSON.parse(body) as PluginManifest;
		} catch {
			const reason = body.trimStart().startsWith("<")
				? "returned HTML, not JSON - the SPA fallback hit. nginx is " +
					"likely not proxying /plugins/manifest.json to server-game"
				: "is not valid JSON";
			console.warn(
				`[plugins] manifest ${manifestUrl} ${reason}; no client plugins loaded`
			);
			return;
		}
	} catch (error) {
		console.warn(
			`[plugins] manifest ${manifestUrl} not reachable; no client plugins loaded`,
			error
		);
		return;
	}

	const ids = manifest.plugins ?? [];
	console.info(`[plugins] manifest lists ${ids.length}: ${ids.join(", ")}`);

	const settled = await Promise.allSettled(
		ids.map((id) =>
			loadScript(bundleUrlFor(id), BUNDLE_LOAD_TIMEOUT_MS).catch((error) => {
				// Mark failed at the moment of rejection so a timed-out bundle that
				// still executes can't half-activate via a late register().
				markPluginFailed(id);
				throw error;
			})
		)
	);
	settled.forEach((result, i) => {
		const id = ids[i];
		if (result.status === "fulfilled") {
			console.info(`[plugins] loaded bundle for "${id}"`);
		} else {
			console.error(
				`[plugins] skipping "${id}" - bundle failed to load`,
				result.reason
			);
		}
	});
};
