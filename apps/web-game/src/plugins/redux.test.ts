import { ClientPlugin } from "@cc-plugins/api";
import { createAction, createReducer } from "@reduxjs/toolkit";

import { buildPluginsReducer } from "./redux";
import { createClientPluginRegistry } from "./registry";

const counterReducer = (initial = 0) =>
	createReducer(initial, (b) => {
		b.addCase(createAction<number>("counter/add"), (s, a) => s + a.payload);
	});

describe("buildPluginsReducer", () => {
	test("identity for an empty registry (no combineReducers warning)", () => {
		const registry = createClientPluginRegistry();
		const reducer = buildPluginsReducer(registry);
		const initial = reducer(undefined, { type: "@@INIT" });
		const next = reducer(initial, { type: "anything" });
		expect(next).toBe(initial);
	});

	test("nests each plugin's reducers under its id", () => {
		const registry = createClientPluginRegistry();
		const plugin: ClientPlugin = {
			id: "@me/a",
			reducers: { count: counterReducer(0), other: counterReducer(10) },
		};
		registry.register(plugin);

		const state = buildPluginsReducer(registry)(undefined, { type: "@@INIT" });
		expect(state).toEqual({ "@me/a": { count: 0, other: 10 } });
	});

	test("two plugins sharing a slice key do NOT collide (different sub-trees)", () => {
		const registry = createClientPluginRegistry();
		registry.register({ id: "@me/a", reducers: { foo: counterReducer(1) } });
		registry.register({ id: "@me/b", reducers: { foo: counterReducer(2) } });

		const state = buildPluginsReducer(registry)(undefined, { type: "@@INIT" });
		expect(state).toEqual({
			"@me/a": { foo: 1 },
			"@me/b": { foo: 2 },
		});
	});

	test("a plugin with no reducers contributes no sub-tree", () => {
		const registry = createClientPluginRegistry();
		registry.register({ id: "@me/listener-only" });
		registry.register({
			id: "@me/stateful",
			reducers: { x: counterReducer(7) },
		});

		const state = buildPluginsReducer(registry)(undefined, { type: "@@INIT" });
		expect(state).toEqual({ "@me/stateful": { x: 7 } });
		expect(state).not.toHaveProperty("@me/listener-only");
	});

	test("a throwing reducer keeps its own slice but does NOT crash the store", () => {
		const registry = createClientPluginRegistry();
		registry.register({
			id: "@me/buggy",
			reducers: {
				slice: () => {
					throw new Error("boom");
				},
			},
		});
		const errorSpy = jest.spyOn(console, "error").mockImplementation(() => { /* noop */ });

		const state = buildPluginsReducer(registry)(undefined, { type: "anything" });
		expect(state).toEqual({ "@me/buggy": { slice: null } });
		expect(errorSpy).toHaveBeenCalled();

		errorSpy.mockRestore();
	});
});
