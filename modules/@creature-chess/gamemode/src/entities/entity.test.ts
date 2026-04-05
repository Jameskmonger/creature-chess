import { entity, entityFactory, Entity } from "./entity";

// Simple reducers for testing
const counterReducer = (state: number | undefined = 0, action: { type: string; payload?: any }) => {
	if (action.type === "increment") return state + 1;
	if (action.type === "decrement") return state - 1;
	if (action.type === "set") return action.payload;
	return state;
};

const nameReducer = (state: string | undefined = "default", action: { type: string; payload?: any }) => {
	if (action.type === "setName") return action.payload;
	return state;
};

type TestState = { counter: number; name: string };

const testReducers = {
	counter: counterReducer,
	name: nameReducer,
};

// Action creator helpers with .type and .match
const increment = Object.assign(() => ({ type: "increment" as const }), {
	type: "increment" as const,
	toString: () => "increment",
	match: (action: any) => action.type === "increment",
});

const setName = Object.assign((name: string) => ({ type: "setName" as const, payload: name }), {
	type: "setName" as const,
	toString: () => "setName",
	match: (action: any) => action.type === "setName",
});

describe("entity", () => {
	let e: Entity<TestState, {}, {}>;

	beforeEach(() => {
		e = entity({ reducers: testReducers }, "test-1");
	});

	describe("initial state", () => {
		test("initializes state from reducers with undefined", () => {
			expect(e.select((s) => s.counter)).toBe(0);
			expect(e.select((s) => s.name)).toBe("default");
		});

		test("has correct id", () => {
			expect(e.id).toBe("test-1");
		});
	});

	describe("select", () => {
		test("reads current state", () => {
			expect(e.select((s) => s)).toEqual({ counter: 0, name: "default" });
		});

		test("reflects state changes", () => {
			e.put({ type: "increment" });
			expect(e.select((s) => s.counter)).toBe(1);
		});
	});

	describe("put", () => {
		test("updates state through reducers", () => {
			e.put({ type: "increment" });
			expect(e.select((s) => s.counter)).toBe(1);

			e.put({ type: "increment" });
			expect(e.select((s) => s.counter)).toBe(2);

			e.put({ type: "decrement" });
			expect(e.select((s) => s.counter)).toBe(1);
		});

		test("handles payload actions", () => {
			e.put({ type: "set", payload: 42 });
			expect(e.select((s) => s.counter)).toBe(42);
		});

		test("updates only affected slice", () => {
			e.put({ type: "setName", payload: "alice" });
			expect(e.select((s) => s.name)).toBe("alice");
			expect(e.select((s) => s.counter)).toBe(0);
		});

		test("unknown action does not change state", () => {
			const before = e.select((s) => s);
			e.put({ type: "unknown" });
			expect(e.select((s) => s)).toBe(before);
		});
	});

	describe("addListener", () => {
		test("fires on matching actionCreator", async () => {
			const handler = jest.fn();
			e.addListener({
				actionCreator: increment,
				effect: async (action, api) => { handler(action); },
			});

			e.put(increment());

			await tick();
			expect(handler).toHaveBeenCalledWith({ type: "increment" });
		});

		test("fires on matching type string", async () => {
			const handler = jest.fn();
			e.addListener({
				type: "setName",
				effect: async (action) => { handler(action.payload); },
			});

			e.put(setName("bob"));

			await tick();
			expect(handler).toHaveBeenCalledWith("bob");
		});

		test("fires on matching matcher function", async () => {
			const handler = jest.fn();
			e.addListener({
				matcher: (action) => action.type === "increment" || action.type === "decrement",
				effect: async (action) => { handler(action.type); },
			});

			e.put({ type: "increment" });
			e.put({ type: "decrement" });
			e.put({ type: "setName", payload: "x" });

			await tick();
			// The second increment cancels the first effect, and decrement cancels increment
			// Actually, matcher matches increment and decrement so it fires for both,
			// but since they use the same listener registration, each new match cancels the previous
			expect(handler).toHaveBeenCalledWith("decrement");
		});

		test("fires on matching predicate with current and previous state", async () => {
			const states: { current: TestState; previous: TestState }[] = [];
			e.addListener({
				predicate: (action, currentState, previousState) => {
					return action.type === "increment";
				},
				effect: async (action, api) => {
					states.push({
						current: api.getState(),
						previous: api.getState(), // can't capture previousState from effect, but predicate receives it
					});
				},
			});

			e.put({ type: "increment" });
			await tick();

			expect(states).toHaveLength(1);
			expect(states[0].current.counter).toBe(1);
		});

		test("predicate receives correct previous state", async () => {
			const captured: { prev: number; curr: number }[] = [];
			e.addListener({
				predicate: (action, currentState, previousState) => {
					if (action.type === "increment") {
						captured.push({ prev: previousState.counter, curr: currentState.counter });
						return true;
					}
					return false;
				},
				effect: async () => {},
			});

			e.put({ type: "increment" }); // prev=0, curr=1
			e.put({ type: "increment" }); // prev=1, curr=2

			expect(captured).toEqual([
				{ prev: 0, curr: 1 },
				{ prev: 1, curr: 2 },
			]);
		});

		test("does not fire for non-matching actions", async () => {
			const handler = jest.fn();
			e.addListener({
				actionCreator: increment,
				effect: async () => { handler(); },
			});

			e.put({ type: "setName", payload: "x" });

			await tick();
			expect(handler).not.toHaveBeenCalled();
		});

		test("unsubscribe removes listener", async () => {
			const handler = jest.fn();
			const unsub = e.addListener({
				type: "increment",
				effect: async () => { handler(); },
			});

			unsub();
			e.put({ type: "increment" });

			await tick();
			expect(handler).not.toHaveBeenCalled();
		});

		test("previous effect is cancelled when same listener fires again", async () => {
			const calls: string[] = [];

			e.addListener({
				actionCreator: increment,
				effect: async (action, api) => {
					calls.push("start");
					await api.delay(100);
					calls.push("end"); // should NOT run if cancelled
				},
			});

			e.put(increment());
			e.put(increment()); // cancels first

			await sleep(200);

			// First effect starts but gets cancelled before delay resolves.
			// Second effect starts and completes.
			expect(calls).toEqual(["start", "start", "end"]);
		});
	});

	describe("take", () => {
		test("resolves when matching action is dispatched", async () => {
			let resolved: any;

			e.runEffect(async (api) => {
				const action = await api.take((a) => a.type === "setName");
				resolved = action;
			});

			e.put(setName("alice"));
			await tick();

			expect(resolved).toEqual({ type: "setName", payload: "alice" });
		});

		test("skips non-matching actions", async () => {
			let resolved = false;

			e.runEffect(async (api) => {
				await api.take((a) => a.type === "setName");
				resolved = true;
			});

			e.put({ type: "increment" });
			await tick();

			expect(resolved).toBe(false);

			e.put(setName("bob"));
			await tick();

			expect(resolved).toBe(true);
		});

		test("rejects when cancelled", async () => {
			const errors: string[] = [];

			const task = e.runEffect(async (api) => {
				try {
					await api.take(() => true);
				} catch (err: any) {
					errors.push(err.message);
				}
			});

			task.cancel();
			await tick();

			expect(errors).toEqual(["cancelled"]);
		});

		test("rejects immediately if already cancelled", async () => {
			const errors: string[] = [];

			// Run an effect that immediately gets cancelled before take
			const task = e.runEffect(async (api) => {
				// Yield to allow cancellation
				await new Promise((r) => setTimeout(r, 0));
				try {
					await api.take(() => true);
				} catch (err: any) {
					errors.push(err.message);
				}
			});

			task.cancel();
			await tick();

			expect(errors).toEqual(["cancelled"]);
		});
	});

	describe("delay", () => {
		test("resolves after specified time", async () => {
			let resolved = false;

			e.runEffect(async (api) => {
				await api.delay(50);
				resolved = true;
			});

			expect(resolved).toBe(false);
			await sleep(100);
			expect(resolved).toBe(true);
		});

		test("rejects when cancelled", async () => {
			let rejected = false;

			const task = e.runEffect(async (api) => {
				try {
					await api.delay(5000);
				} catch {
					rejected = true;
				}
			});

			task.cancel();
			await tick();

			expect(rejected).toBe(true);
		});
	});

	describe("runEffect", () => {
		test("runs the effect with a working API", async () => {
			const result: number[] = [];

			const task = e.runEffect(async (api) => {
				result.push(api.getState().counter);
				api.dispatch({ type: "increment" });
				result.push(api.getState().counter);
			});

			await task.promise;
			expect(result).toEqual([0, 1]);
		});

		test("cancel resolves the promise (does not reject)", async () => {
			const task = e.runEffect(async (api) => {
				await api.delay(10000);
			});

			task.cancel();
			// Should not throw
			await task.promise;
		});

		test("propagates non-cancellation errors", async () => {
			const task = e.runEffect(async () => {
				throw new Error("boom");
			});

			await expect(task.promise).rejects.toThrow("boom");
		});
	});

	describe("variables", () => {
		test("getVariable reads initial variables", () => {
			const e2 = entity(
				{ reducers: testReducers },
				"v-test",
				{},
				{ score: 100 }
			);

			expect(e2.getVariable((v) => v.score)).toBe(100);
		});

		test("updateVariables patches variables", () => {
			const e2 = entity(
				{ reducers: testReducers },
				"v-test",
				{},
				{ score: 100, label: "a" }
			);

			e2.updateVariables({ score: 200 });
			expect(e2.getVariable((v) => v.score)).toBe(200);
			expect(e2.getVariable((v) => v.label)).toBe("a");
		});
	});

	describe("dependencies", () => {
		test("exposes dependencies", () => {
			const deps = { logger: "mock-logger" };
			const e2 = entity({ reducers: testReducers }, "d-test", deps);
			expect(e2.dependencies).toBe(deps);
		});
	});

	describe("setupListeners", () => {
		test("calls setupListeners on creation", async () => {
			const handler = jest.fn();

			entity(
				{
					reducers: testReducers,
					setupListeners: (startListening, extra) => {
						startListening({
							type: "increment",
							effect: async () => { handler(); },
						});
					},
				},
				"sl-test"
			).put({ type: "increment" });

			await tick();
			expect(handler).toHaveBeenCalled();
		});

		test("setupListeners receives extra with id and dependencies", () => {
			let capturedExtra: any;

			entity(
				{
					reducers: testReducers,
					setupListeners: (_, extra) => { capturedExtra = extra; },
				},
				"extra-test",
				{ foo: "bar" },
				{ x: 1 }
			);

			expect(capturedExtra.id).toBe("extra-test");
			expect(capturedExtra.dependencies).toEqual({ foo: "bar" });
			expect(capturedExtra.getVariable((v: any) => v.x)).toBe(1);
		});
	});
});

describe("entityFactory", () => {
	test("creates entities with static config", () => {
		const factory = entityFactory<TestState>({ reducers: testReducers });
		const e = factory("f-1");
		expect(e.id).toBe("f-1");
		expect(e.select((s) => s.counter)).toBe(0);
	});

	test("creates entities with dynamic config from dependencies", () => {
		const factory = entityFactory<TestState, { initial: number }>(
			(deps) => ({
				reducers: {
					counter: (state: number | undefined = deps.initial, action: { type: string; payload?: any }) => {
						if (action.type === "increment") return state + 1;
						return state;
					},
					name: nameReducer,
				},
			})
		);

		const e = factory("f-2", { initial: 10 });
		expect(e.select((s) => s.counter)).toBe(10);
	});

	test("passes variables through", () => {
		const factory = entityFactory<TestState, {}, { tag: string }>({
			reducers: testReducers,
		});

		const e = factory("f-3", {}, { tag: "hello" });
		expect(e.getVariable((v) => v.tag)).toBe("hello");
	});
});

// Helpers
function tick() {
	return new Promise((r) => setTimeout(r, 0));
}

function sleep(ms: number) {
	return new Promise((r) => setTimeout(r, ms));
}
