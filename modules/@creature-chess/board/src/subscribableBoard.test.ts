import { SubscribableBoard } from "./subscribableBoard";

function installRafMock() {
	(globalThis as any).window = globalThis;
	// default RAF mock calls immediately
	(globalThis as any).requestAnimationFrame = (cb: FrameRequestCallback) =>
		cb(performance.now());
}

function setRafMock(delayMs: number) {
	(globalThis as any).requestAnimationFrame = (cb: FrameRequestCallback) => {
		if (delayMs > 0) {
			setTimeout(() => cb(performance.now()), delayMs);
		} else {
			cb(performance.now());
		}
	};
}

function cleanupRafMock() {
	delete (globalThis as any).window;
	delete (globalThis as any).requestAnimationFrame;
}

describe("SubscribableBoard", () => {
	beforeEach(() => {
		jest.restoreAllMocks();
		jest.useRealTimers();
		installRafMock();
	});

	afterEach(() => {
		cleanupRafMock();
	});

	test("subscribe registers listener and unsubscribe stops further notifications", () => {
		const board = new SubscribableBoard(3, 3);

		const listener = jest.fn();
		const unsubscribe = board.subscribe(listener);

		board.setPiece("a", 0, 0);
		expect(listener).toHaveBeenCalledTimes(1);

		unsubscribe();

		board.setPiece("b", 1, 0);
		expect(listener).toHaveBeenCalledTimes(1);
	});

	test("getSnapshot returns a version number that increments on mutation", () => {
		const board = new SubscribableBoard(3, 3);

		const v0 = board.getSnapshot();
		board.setPiece("a", 0, 0);

		const v1 = board.getSnapshot();
		board.setPiece("b", 1, 0);

		const v2 = board.getSnapshot();

		expect(typeof v0).toBe("number");
		expect(v1).toBe(v0 + 1);
		expect(v2).toBe(v1 + 1);
	});

	test("multiple listeners are notified", () => {
		const board = new SubscribableBoard(3, 3);

		const a = jest.fn();
		const b = jest.fn();
		board.subscribe(a);
		board.subscribe(b);

		board.setPiece("p", 0, 0);

		expect(a).toHaveBeenCalledTimes(1);
		expect(b).toHaveBeenCalledTimes(1);
	});

	test("immediate mutations notify synchronously", () => {
		const board = new SubscribableBoard(3, 3);

		const listener = jest.fn();
		board.subscribe(listener);

		// setPieces notifies immediately
		board.setPieces([
			{ id: "p1", x: 0, y: 0 },
			{ id: "p2", x: 1, y: 1 },
		]);

		expect(listener).toHaveBeenCalledTimes(1);
	});

	test("notifications are coalesced to requestAnimationFrame", () => {
		jest.useFakeTimers();

		// Minimal RAF mock we can control with jest timers
		setRafMock(16);

		const board = new SubscribableBoard(4, 4);

		const listener = jest.fn();
		board.subscribe(listener);

		// Two mutations within the same "frame"
		board.setPiece("a", 0, 0);
		board.setPiece("b", 1, 0);

		// Not yet, because coalesced to RAF
		expect(listener).toHaveBeenCalledTimes(0);

		// Flush RAF
		jest.advanceTimersByTime(16);

		expect(listener).toHaveBeenCalledTimes(1);

		// Another burst before the next frame
		board.setPiece("c", 2, 0);
		board.setPiece("d", 3, 0);
		expect(listener).toHaveBeenCalledTimes(1);

		jest.advanceTimersByTime(16);
		expect(listener).toHaveBeenCalledTimes(2);
	});

	test("version increments per mutation even if notifications are coalesced", () => {
		jest.useFakeTimers();

		setRafMock(16);

		const board = new SubscribableBoard(4, 4);

		const v0 = board.getSnapshot();
		board.setPiece("a", 0, 0);
		board.setPiece("b", 1, 0);
		const v2 = board.getSnapshot();

		expect(v2).toBe(v0 + 2);
	});
});
