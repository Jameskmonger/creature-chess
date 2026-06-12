import { DefinesApi } from "./defines";

describe("DefinesApi", () => {
	test("get throws when path is not set", () => {
		const d = new DefinesApi();
		expect(() => d.get("economy.buyXpCost")).toThrow(
			/no value registered for path 'economy.buyXpCost'/
		);
	});

	test("has reports whether a path is set", () => {
		const d = new DefinesApi();
		expect(d.has("economy.buyXpCost")).toBe(false);
		d.set("economy.buyXpCost", 5);
		expect(d.has("economy.buyXpCost")).toBe(true);
	});

	test("set + get round-trip", () => {
		const d = new DefinesApi();
		d.set<number>("economy.buyXpCost", 5);
		expect(d.get<number>("economy.buyXpCost")).toBe(5);
	});

	test("set from same origin overwrites without a warning", () => {
		const d = new DefinesApi();
		const warn = jest.spyOn(console, "warn").mockImplementation(() => undefined);
		d.set("a", 1);
		d.set("a", 2);
		expect(d.get<number>("a")).toBe(2);
		expect(warn).not.toHaveBeenCalled();
		warn.mockRestore();
	});

	test("patch updates an existing path", () => {
		const d = new DefinesApi();
		d.set("a", 1);
		d.patch("a", 99);
		expect(d.get<number>("a")).toBe(99);
	});

	test("patch throws when the path was never set", () => {
		const d = new DefinesApi();
		expect(() => d.patch("never.set", 1)).toThrow(
			/path 'never.set' is not set/
		);
	});

	test("patch error message includes the misspelled path", () => {
		const d = new DefinesApi();
		d.set("economy.buyXpCost", 5);
		expect(() => d.patch("economy.buyExpCost", 1)).toThrow(
			/'economy\.buyExpCost'/
		);
	});

	test("originOf returns the origin that last wrote the path", () => {
		const d = new DefinesApi();
		d.set("a", 1);
		expect(d.originOf("a")).toBe("core");
		expect(d.originOf("never-set")).toBeNull();

		const scoped = d.scopedTo({ plugin: "@me/cheap-cards" });
		scoped.patch("a", 99);
		expect(d.originOf("a")).toEqual({ plugin: "@me/cheap-cards" });
	});

	test("scopedTo shares values with the parent", () => {
		const d = new DefinesApi();
		d.set("a", 1);
		const scoped = d.scopedTo({ plugin: "@me/p" });
		expect(scoped.get<number>("a")).toBe(1);
		scoped.patch("a", 99);
		expect(d.get<number>("a")).toBe(99);
	});

	test("set from a different origin logs a collision warning", () => {
		const d = new DefinesApi();
		d.set("a", 1);
		const scoped = d.scopedTo({ plugin: "@me/p" });
		const warn = jest.spyOn(console, "warn").mockImplementation(() => undefined);
		scoped.set("a", 2);
		expect(warn).toHaveBeenCalledWith(
			expect.stringMatching(
				/'a' already set by core; overwriting from plugin "@me\/p"/
			)
		);
		warn.mockRestore();
	});

	test("two plugins setting the same path: both origins surface in the warning", () => {
		const d = new DefinesApi();
		d.scopedTo({ plugin: "@me/first" }).set("a", 1);
		const warn = jest.spyOn(console, "warn").mockImplementation(() => undefined);
		d.scopedTo({ plugin: "@me/second" }).set("a", 2);
		expect(warn).toHaveBeenCalledWith(
			expect.stringMatching(
				/'a' already set by plugin "@me\/first".*overwriting from plugin "@me\/second"/
			)
		);
		warn.mockRestore();
	});

	test("patch does not log a collision (intentional override)", () => {
		const d = new DefinesApi();
		d.set("a", 1);
		const warn = jest.spyOn(console, "warn").mockImplementation(() => undefined);
		d.scopedTo({ plugin: "@me/p" }).patch("a", 99);
		expect(warn).not.toHaveBeenCalled();
		warn.mockRestore();
	});
});
