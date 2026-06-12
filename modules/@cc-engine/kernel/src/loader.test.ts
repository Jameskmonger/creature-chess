import { DefinesApi } from "./defines";
import { PluginLoader, LoadFailure } from "./loader";
import { Logger } from "./logger";
import { PluginContext } from "./plugin";

jest.mock(
	"@cc-test/plugin-good",
	() => ({
		default: {
			manifest: {
				id: "@cc-test/plugin-good",
				version: "1.0.0",
				kernelVersion: "^0.0.1",
			},
			onEnable: jest.fn(),
		},
	}),
	{ virtual: true }
);

jest.mock(
	"@cc-test/plugin-named-export",
	() => ({
		plugin: {
			manifest: {
				id: "@cc-test/plugin-named-export",
				version: "1.0.0",
				kernelVersion: "^0.0.1",
			},
			onEnable: jest.fn(),
		},
	}),
	{ virtual: true }
);

jest.mock(
	"@cc-test/plugin-invalid-shape",
	() => ({
		default: { somethingElse: true },
	}),
	{ virtual: true }
);

jest.mock(
	"@cc-test/plugin-malformed-manifest",
	() => ({
		default: {
			manifest: { id: 42, version: "1.0.0", kernelVersion: "^0.0.1" },
			onEnable: jest.fn(),
		},
	}),
	{ virtual: true }
);

jest.mock(
	"@cc-test/plugin-empty-id",
	() => ({
		default: {
			manifest: { id: "", version: "1.0.0", kernelVersion: "^0.0.1" },
			onEnable: jest.fn(),
		},
	}),
	{ virtual: true }
);

jest.mock(
	"@cc-test/plugin-bad-kernel-version",
	() => ({
		default: {
			manifest: {
				id: "@cc-test/plugin-bad-kernel-version",
				version: "1.0.0",
				kernelVersion: "^99.0.0",
			},
			onEnable: jest.fn(),
		},
	}),
	{ virtual: true }
);

jest.mock(
	"@cc-test/plugin-onenable-throws",
	() => ({
		default: {
			manifest: {
				id: "@cc-test/plugin-onenable-throws",
				version: "1.0.0",
				kernelVersion: "^0.0.1",
			},
			onEnable: () => {
				throw new Error("boom");
			},
		},
	}),
	{ virtual: true }
);

// dependsOn scenarios - A is independent, B depends on A, C depends on
// B (transitive), CYCLE-A/CYCLE-B depend on each other, NEEDS-MISSING
// names a plugin not in any batch, BROKEN throws in onEnable.
jest.mock(
	"@cc-test/dep-a",
	() => ({
		default: {
			manifest: { id: "@cc-test/dep-a", version: "1.0.0", kernelVersion: "*" },
			onEnable: jest.fn(),
		},
	}),
	{ virtual: true }
);
jest.mock(
	"@cc-test/dep-b",
	() => ({
		default: {
			manifest: {
				id: "@cc-test/dep-b",
				version: "1.0.0",
				kernelVersion: "*",
				dependsOn: ["@cc-test/dep-a"],
			},
			onEnable: jest.fn(),
		},
	}),
	{ virtual: true }
);
jest.mock(
	"@cc-test/dep-c",
	() => ({
		default: {
			manifest: {
				id: "@cc-test/dep-c",
				version: "1.0.0",
				kernelVersion: "*",
				dependsOn: ["@cc-test/dep-b"],
			},
			onEnable: jest.fn(),
		},
	}),
	{ virtual: true }
);
jest.mock(
	"@cc-test/dep-cycle-a",
	() => ({
		default: {
			manifest: {
				id: "@cc-test/dep-cycle-a",
				version: "1.0.0",
				kernelVersion: "*",
				dependsOn: ["@cc-test/dep-cycle-b"],
			},
			onEnable: jest.fn(),
		},
	}),
	{ virtual: true }
);
jest.mock(
	"@cc-test/dep-cycle-b",
	() => ({
		default: {
			manifest: {
				id: "@cc-test/dep-cycle-b",
				version: "1.0.0",
				kernelVersion: "*",
				dependsOn: ["@cc-test/dep-cycle-a"],
			},
			onEnable: jest.fn(),
		},
	}),
	{ virtual: true }
);
jest.mock(
	"@cc-test/dep-needs-missing",
	() => ({
		default: {
			manifest: {
				id: "@cc-test/dep-needs-missing",
				version: "1.0.0",
				kernelVersion: "*",
				dependsOn: ["@cc-test/never-loaded"],
			},
			onEnable: jest.fn(),
		},
	}),
	{ virtual: true }
);
jest.mock(
	"@cc-test/dep-broken",
	() => ({
		default: {
			manifest: {
				id: "@cc-test/dep-broken",
				version: "1.0.0",
				kernelVersion: "*",
			},
			onEnable: () => {
				throw new Error("broken-onEnable");
			},
		},
	}),
	{ virtual: true }
);
jest.mock(
	"@cc-test/dep-needs-broken",
	() => ({
		default: {
			manifest: {
				id: "@cc-test/dep-needs-broken",
				version: "1.0.0",
				kernelVersion: "*",
				dependsOn: ["@cc-test/dep-broken"],
			},
			onEnable: jest.fn(),
		},
	}),
	{ virtual: true }
);

const makeLogger = (): Logger & {
	logs: { level: string; message: string; meta?: unknown }[];
} => {
	const logs: { level: string; message: string; meta?: unknown }[] = [];
	return {
		logs,
		debug: (message, meta) => logs.push({ level: "debug", message, meta }),
		info: (message, meta) => logs.push({ level: "info", message, meta }),
		warn: (message, meta) => logs.push({ level: "warn", message, meta }),
		error: (message, meta) => logs.push({ level: "error", message, meta }),
	};
};

const makeContext = (logger: Logger): PluginContext =>
	({ logger, defines: new DefinesApi() }) as unknown as PluginContext;

describe("PluginLoader", () => {
	test("happy path: loads plugin with default export, calls onEnable, logs success", async () => {
		const logger = makeLogger();
		const loader = new PluginLoader({ logger });
		const ctx = makeContext(logger);

		const result = await loader.load(["@cc-test/plugin-good"], ctx);

		expect(result.loaded).toHaveLength(1);
		expect(result.loaded[0].manifest.id).toBe("@cc-test/plugin-good");
		expect(result.failed).toEqual([]);
		expect(
			logger.logs.some(
				(l) => l.level === "info" && l.message.includes("Loaded plugin")
			)
		).toBe(true);
	});

	test("happy path: accepts named `plugin` export when no default", async () => {
		const logger = makeLogger();
		const loader = new PluginLoader({ logger });
		const ctx = makeContext(logger);

		const result = await loader.load(["@cc-test/plugin-named-export"], ctx);

		expect(result.loaded).toHaveLength(1);
		expect(result.failed).toEqual([]);
	});

	test("require failure: records as failed with phase=require, continues to next", async () => {
		const logger = makeLogger();
		const loader = new PluginLoader({ logger });
		const ctx = makeContext(logger);

		const result = await loader.load(
			["@cc-test/plugin-does-not-exist", "@cc-test/plugin-good"],
			ctx
		);

		expect(result.loaded).toHaveLength(1);
		expect(result.failed).toEqual<LoadFailure[]>([
			{
				plugin: "@cc-test/plugin-does-not-exist",
				phase: "require",
				error: expect.stringContaining("failed to require module"),
			},
		]);
	});

	test("invalid shape: records as failed with phase=validate", async () => {
		const logger = makeLogger();
		const loader = new PluginLoader({ logger });
		const ctx = makeContext(logger);

		const result = await loader.load(["@cc-test/plugin-invalid-shape"], ctx);

		expect(result.loaded).toEqual([]);
		expect(result.failed).toHaveLength(1);
		expect(result.failed[0].phase).toBe("validate");
		expect(result.failed[0].error).toMatch(/invalid shape/);
	});

	test("malformed manifest (non-string id) rejected", async () => {
		const logger = makeLogger();
		const loader = new PluginLoader({ logger });
		const ctx = makeContext(logger);

		const result = await loader.load(
			["@cc-test/plugin-malformed-manifest"],
			ctx
		);

		expect(result.loaded).toEqual([]);
		expect(result.failed[0].phase).toBe("validate");
		expect(result.failed[0].error).toMatch(/malformed manifest/);
		expect(result.failed[0].error).toMatch(/'id'/);
	});

	test("malformed manifest (empty id) rejected", async () => {
		const logger = makeLogger();
		const loader = new PluginLoader({ logger });
		const ctx = makeContext(logger);

		const result = await loader.load(["@cc-test/plugin-empty-id"], ctx);

		expect(result.failed[0].phase).toBe("validate");
		expect(result.failed[0].error).toMatch(/non-empty string/);
	});

	test("kernelVersion mismatch: records as failed with phase=kernelVersion", async () => {
		const logger = makeLogger();
		const loader = new PluginLoader({ logger });
		const ctx = makeContext(logger);

		const result = await loader.load(
			["@cc-test/plugin-bad-kernel-version"],
			ctx
		);

		expect(result.loaded).toEqual([]);
		expect(result.failed[0].phase).toBe("kernelVersion");
		expect(result.failed[0].error).toMatch(/not satisfied by kernel/);
	});

	test("onEnable throws: records as failed with phase=onEnable and stack", async () => {
		const logger = makeLogger();
		const loader = new PluginLoader({ logger });
		const ctx = makeContext(logger);

		const result = await loader.load(["@cc-test/plugin-onenable-throws"], ctx);

		expect(result.loaded).toEqual([]);
		expect(result.failed[0].phase).toBe("onEnable");
		expect(result.failed[0].error).toMatch(/onEnable threw - boom/);

		const errorLog = logger.logs.find((l) => l.level === "error");
		expect(errorLog?.meta).toMatchObject({
			plugin: "@cc-test/plugin-onenable-throws",
			phase: "onEnable",
			stack: expect.any(String),
		});
	});

	test("continues loading after a failure", async () => {
		const logger = makeLogger();
		const loader = new PluginLoader({ logger });
		const ctx = makeContext(logger);

		const result = await loader.load(
			[
				"@cc-test/plugin-onenable-throws",
				"@cc-test/plugin-good",
				"@cc-test/plugin-bad-kernel-version",
			],
			ctx
		);

		expect(result.loaded.map((p) => p.manifest.id)).toEqual([
			"@cc-test/plugin-good",
		]);
		// Order: phase-1 failures (require/validate/kernelVersion) are
		// emitted before phase-3 failures (onEnable), so kernelVersion
		// comes first even though it was last in the input batch.
		expect(result.failed.map((f) => f.phase)).toEqual([
			"kernelVersion",
			"onEnable",
		]);
	});

	describe("dependsOn", () => {
		test("topo-sorts: dependency loads before dependent regardless of input order", async () => {
			const logger = makeLogger();
			const loader = new PluginLoader({ logger });
			const ctx = makeContext(logger);

			// Input order is reversed from the dependency order.
			const result = await loader.load(
				["@cc-test/dep-c", "@cc-test/dep-b", "@cc-test/dep-a"],
				ctx
			);

			expect(result.failed).toEqual([]);
			expect(result.loaded.map((p) => p.manifest.id)).toEqual([
				"@cc-test/dep-a",
				"@cc-test/dep-b",
				"@cc-test/dep-c",
			]);
		});

		test("missing dep: fails with phase=dependsOn citing the unsatisfied id", async () => {
			const logger = makeLogger();
			const loader = new PluginLoader({ logger });
			const ctx = makeContext(logger);

			const result = await loader.load(["@cc-test/dep-needs-missing"], ctx);

			expect(result.loaded).toEqual([]);
			expect(result.failed).toHaveLength(1);
			expect(result.failed[0].phase).toBe("dependsOn");
			expect(result.failed[0].error).toMatch(/unsatisfied dependsOn/);
			expect(result.failed[0].error).toMatch(/@cc-test\/never-loaded/);
		});

		test("cycle: both members fail with phase=dependsOn", async () => {
			const logger = makeLogger();
			const loader = new PluginLoader({ logger });
			const ctx = makeContext(logger);

			const result = await loader.load(
				["@cc-test/dep-cycle-a", "@cc-test/dep-cycle-b"],
				ctx
			);

			expect(result.loaded).toEqual([]);
			expect(result.failed.map((f) => f.phase)).toEqual([
				"dependsOn",
				"dependsOn",
			]);
			expect(result.failed.every((f) => /cycle/.test(f.error))).toBe(true);
		});

		test("cascade: dependent fails with phase=dependsOn when its dependency throws in onEnable", async () => {
			const logger = makeLogger();
			const loader = new PluginLoader({ logger });
			const ctx = makeContext(logger);

			const result = await loader.load(
				["@cc-test/dep-broken", "@cc-test/dep-needs-broken"],
				ctx
			);

			expect(result.loaded).toEqual([]);
			expect(result.failed).toHaveLength(2);
			// dep-broken fails at onEnable; dep-needs-broken cascades.
			expect(
				result.failed.find((f) => f.plugin === "@cc-test/dep-broken")?.phase
			).toBe("onEnable");
			const cascade = result.failed.find(
				(f) => f.plugin === "@cc-test/dep-needs-broken"
			);
			expect(cascade?.phase).toBe("dependsOn");
			expect(cascade?.error).toMatch(/'@cc-test\/dep-broken' failed to load/);
		});
	});
});
