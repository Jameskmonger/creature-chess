import { TypedEventEmitter } from "./typedEventEmitter";

type TestEvents = {
	message: string;
	count: number;
	empty: void;
	data: { x: number; y: number };
};

describe("TypedEventEmitter", () => {
	let emitter: TypedEventEmitter<TestEvents>;

	beforeEach(() => {
		emitter = new TypedEventEmitter<TestEvents>();
	});

	describe("on / emit", () => {
		test("calls handler when event is emitted", () => {
			const handler = jest.fn();
			emitter.on("message", handler);

			emitter.emit("message", "hello");

			expect(handler).toHaveBeenCalledWith("hello");
		});

		test("calls multiple handlers in order", () => {
			const calls: number[] = [];
			emitter.on("count", () => calls.push(1));
			emitter.on("count", () => calls.push(2));

			emitter.emit("count", 42);

			expect(calls).toEqual([1, 2]);
		});

		test("does not call handlers for other events", () => {
			const handler = jest.fn();
			emitter.on("message", handler);

			emitter.emit("count", 5);

			expect(handler).not.toHaveBeenCalled();
		});

		test("handles void events", () => {
			const handler = jest.fn();
			emitter.on("empty", handler);

			emitter.emit("empty");

			expect(handler).toHaveBeenCalledTimes(1);
		});

		test("unsubscribe stops future calls", () => {
			const handler = jest.fn();
			const unsub = emitter.on("message", handler);

			emitter.emit("message", "first");
			unsub();
			emitter.emit("message", "second");

			expect(handler).toHaveBeenCalledTimes(1);
			expect(handler).toHaveBeenCalledWith("first");
		});

		test("unsubscribe is idempotent", () => {
			const handler = jest.fn();
			const unsub = emitter.on("message", handler);

			unsub();
			unsub(); // should not throw

			emitter.emit("message", "test");
			expect(handler).not.toHaveBeenCalled();
		});
	});

	describe("once", () => {
		test("calls handler only once", () => {
			const handler = jest.fn();
			emitter.once("message", handler);

			emitter.emit("message", "first");
			emitter.emit("message", "second");

			expect(handler).toHaveBeenCalledTimes(1);
			expect(handler).toHaveBeenCalledWith("first");
		});

		test("unsubscribe prevents the single call", () => {
			const handler = jest.fn();
			const unsub = emitter.once("message", handler);

			unsub();
			emitter.emit("message", "test");

			expect(handler).not.toHaveBeenCalled();
		});
	});

	describe("waitFor", () => {
		test("resolves when matching event fires", async () => {
			const promise = emitter.waitFor("message");

			emitter.emit("message", "hello");

			await expect(promise).resolves.toBe("hello");
		});

		test("resolves only when predicate matches", async () => {
			const promise = emitter.waitFor("count", (n) => n > 10);

			emitter.emit("count", 5);   // doesn't match
			emitter.emit("count", 15);  // matches

			await expect(promise).resolves.toBe(15);
		});

		test("only resolves once", async () => {
			const handler = jest.fn();
			emitter.waitFor("count").then(handler);

			emitter.emit("count", 1);
			emitter.emit("count", 2);

			// Let microtasks flush
			await new Promise((r) => setTimeout(r, 0));

			expect(handler).toHaveBeenCalledTimes(1);
			expect(handler).toHaveBeenCalledWith(1);
		});

		test("rejects immediately if signal already aborted", async () => {
			const controller = new AbortController();
			controller.abort();

			const promise = emitter.waitFor("message", undefined, controller.signal);

			await expect(promise).rejects.toThrow();
		});

		test("rejects when signal is aborted while waiting", async () => {
			const controller = new AbortController();
			const promise = emitter.waitFor("message", undefined, controller.signal);

			controller.abort();

			await expect(promise).rejects.toThrow();
		});

		test("cleans up event listener after resolve", async () => {
			const promise = emitter.waitFor("message");
			emitter.emit("message", "done");
			await promise;

			// Emitting again should not cause issues (no lingering handlers)
			const handler = jest.fn();
			emitter.on("message", handler);
			emitter.emit("message", "after");
			// Only the explicitly registered handler fires
			expect(handler).toHaveBeenCalledTimes(1);
		});
	});

	describe("removeAllListeners", () => {
		test("removes all handlers", () => {
			const handler1 = jest.fn();
			const handler2 = jest.fn();
			emitter.on("message", handler1);
			emitter.on("count", handler2);

			emitter.removeAllListeners();

			emitter.emit("message", "test");
			emitter.emit("count", 42);

			expect(handler1).not.toHaveBeenCalled();
			expect(handler2).not.toHaveBeenCalled();
		});
	});
});
