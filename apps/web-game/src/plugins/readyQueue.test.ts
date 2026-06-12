import { createReadyQueue } from "./readyQueue";

describe("ReadyQueue", () => {
	test("isReady is false before fire", () => {
		const q = createReadyQueue();
		expect(q.isReady).toBe(false);
	});

	test("callbacks queued before fire run in order after fire", () => {
		const q = createReadyQueue();
		const calls: number[] = [];
		q.onReady(() => calls.push(1));
		q.onReady(() => calls.push(2));
		q.onReady(() => calls.push(3));
		expect(calls).toEqual([]);
		q.fire();
		expect(calls).toEqual([1, 2, 3]);
	});

	test("isReady is true after fire", () => {
		const q = createReadyQueue();
		q.fire();
		expect(q.isReady).toBe(true);
	});

	test("callbacks added after fire run synchronously inline", () => {
		const q = createReadyQueue();
		q.fire();
		const calls: number[] = [];
		q.onReady(() => calls.push(42));
		expect(calls).toEqual([42]);
	});

	test("fire is idempotent - a second fire does nothing", () => {
		const q = createReadyQueue();
		const calls: number[] = [];
		q.onReady(() => calls.push(1));
		q.fire();
		q.fire();
		expect(calls).toEqual([1]);
	});

	test("a throwing callback does not poison the queue for siblings", () => {
		const errors: unknown[] = [];
		const q = createReadyQueue((e) => errors.push(e));
		const calls: number[] = [];
		q.onReady(() => calls.push(1));
		q.onReady(() => {
			throw new Error("boom");
		});
		q.onReady(() => calls.push(3));
		q.fire();
		expect(calls).toEqual([1, 3]);
		expect(errors).toHaveLength(1);
	});

	test("a throwing callback added after fire is caught and reported", () => {
		const errors: unknown[] = [];
		const q = createReadyQueue((e) => errors.push(e));
		q.fire();
		q.onReady(() => {
			throw new Error("boom");
		});
		expect(errors).toHaveLength(1);
	});
});
