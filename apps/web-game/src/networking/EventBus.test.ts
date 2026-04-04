import { EventBus } from "./EventBus";

type TestEventMap = {
	greeting: { message: string };
	count: number;
	empty: undefined;
};

describe("EventBus", () => {
	let bus: EventBus<TestEventMap>;

	beforeEach(() => {
		bus = new EventBus();
	});

	it("should call handler when event is emitted", () => {
		const handler = jest.fn();
		bus.on("greeting", handler);

		bus.emit("greeting", { message: "hello" });

		expect(handler).toHaveBeenCalledWith({ message: "hello" });
	});

	it("should support multiple handlers for the same event", () => {
		const handler1 = jest.fn();
		const handler2 = jest.fn();
		bus.on("count", handler1);
		bus.on("count", handler2);

		bus.emit("count", 42);

		expect(handler1).toHaveBeenCalledWith(42);
		expect(handler2).toHaveBeenCalledWith(42);
	});

	it("should not call handlers for other events", () => {
		const handler = jest.fn();
		bus.on("greeting", handler);

		bus.emit("count", 1);

		expect(handler).not.toHaveBeenCalled();
	});

	it("should unsubscribe when calling the returned function", () => {
		const handler = jest.fn();
		const unsubscribe = bus.on("count", handler);

		bus.emit("count", 1);
		expect(handler).toHaveBeenCalledTimes(1);

		unsubscribe();
		bus.emit("count", 2);
		expect(handler).toHaveBeenCalledTimes(1);
	});

	it("should not break when emitting an event with no listeners", () => {
		expect(() => bus.emit("greeting", { message: "hello" })).not.toThrow();
	});

	it("should handle undefined payload events", () => {
		const handler = jest.fn();
		bus.on("empty", handler);

		bus.emit("empty", undefined);

		expect(handler).toHaveBeenCalledWith(undefined);
	});

	it("should not affect other handlers when one is removed", () => {
		const handler1 = jest.fn();
		const handler2 = jest.fn();
		const unsub1 = bus.on("count", handler1);
		bus.on("count", handler2);

		unsub1();
		bus.emit("count", 5);

		expect(handler1).not.toHaveBeenCalled();
		expect(handler2).toHaveBeenCalledWith(5);
	});
});
