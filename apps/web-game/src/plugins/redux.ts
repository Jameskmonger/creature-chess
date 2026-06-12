import { PluginStartListening } from "@cc-plugins/api";
import { Reducer, combineReducers } from "@reduxjs/toolkit";

import { ClientStartListening } from "~/store/listenerContext";

import { ClientPluginRegistry } from "./registry";

const guardReducer =
	(pluginId: string, key: string, reducer: Reducer): Reducer =>
	(state, action) => {
		try {
			return reducer(state, action);
		} catch (error) {
			// eslint-disable-next-line no-console
			console.error(
				`[plugin-reducer] "${key}" (plugin ${pluginId}) threw on "${action.type}"; keeping prior slice state`,
				error
			);
			return state ?? null;
		}
	};

// Each plugin's slice-tree mounts under its id, so slice-key collisions are structurally impossible.
export const buildPluginsReducer = (registry: ClientPluginRegistry): Reducer => {
	const tree: Record<string, Reducer> = {};
	for (const plugin of registry.list()) {
		const own = plugin.reducers ?? {};
		if (Object.keys(own).length === 0) {
			continue;
		}
		tree[plugin.id] = combineReducers(
			Object.fromEntries(
				Object.entries(own).map(([key, reducer]) => [
					key,
					guardReducer(plugin.id, key, reducer),
				])
			)
		);
	}
	return Object.keys(tree).length > 0
		? combineReducers(tree)
		: (state = {}) => state;
};

export const setupPluginListeners = (
	registry: ClientPluginRegistry,
	startListening: ClientStartListening
): void => {
	const opaque = startListening as unknown as PluginStartListening;
	for (const plugin of registry.list()) {
		for (const setup of plugin.listeners ?? []) {
			setup(opaque);
		}
	}
};

