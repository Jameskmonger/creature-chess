import { createClientPluginRegistry } from "./registry";

describe("ClientPluginRegistry", () => {
	test("list() returns plugins in registration order", () => {
		const registry = createClientPluginRegistry();
		registry.register({ id: "@me/a" });
		registry.register({ id: "@me/b" });
		expect(registry.list().map((p) => p.id)).toEqual(["@me/a", "@me/b"]);
	});

	test("rejects a second plugin with the same id", () => {
		const registry = createClientPluginRegistry();
		registry.register({ id: "@me/dup" });
		expect(() => registry.register({ id: "@me/dup" })).toThrow(/registered twice/);
	});

	test("onChange fires on every register, stops after unsubscribe", () => {
		const registry = createClientPluginRegistry();
		const calls: string[] = [];
		const unsubscribe = registry.onChange(() => calls.push("change"));

		registry.register({ id: "@me/a" });
		registry.register({ id: "@me/b" });
		unsubscribe();
		registry.register({ id: "@me/c" });

		expect(calls).toEqual(["change", "change"]);
	});
});
