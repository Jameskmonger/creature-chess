import { BattleEvent } from "@creature-chess/battle";

import { PieceAnimationEventStore } from "./animationEventStore";

const attackEvent: BattleEvent = {
	type: "piece_attack",
	pieceId: "piece-A",
	targetId: "piece-B",
	ranged: false,
	direction: { x: 1, y: 0 },
	distance: 1,
	damage: 5,
};

const hitEvent: BattleEvent = {
	type: "piece_hit",
	pieceId: "piece-B",
	direction: { x: -1, y: 0 },
	damage: 5,
};

const dyingEvent: BattleEvent = {
	type: "piece_dying",
	pieceId: "piece-B",
};

describe("PieceAnimationEventStore", () => {
	describe("pushEvents", () => {
		it("groups events by pieceId", () => {
			const store = new PieceAnimationEventStore();

			store.pushEvents([attackEvent, hitEvent]);

			expect(store.consumeEventsForPiece("piece-A")).toEqual([attackEvent]);
			expect(store.consumeEventsForPiece("piece-B")).toEqual([hitEvent]);
		});

		it("accumulates events for the same piece", () => {
			const store = new PieceAnimationEventStore();

			store.pushEvents([hitEvent, dyingEvent]);

			const events = store.consumeEventsForPiece("piece-B");
			expect(events).toEqual([hitEvent, dyingEvent]);
		});

		it("accumulates across multiple pushEvents calls", () => {
			const store = new PieceAnimationEventStore();

			store.pushEvents([hitEvent]);
			store.pushEvents([dyingEvent]);

			const events = store.consumeEventsForPiece("piece-B");
			expect(events).toEqual([hitEvent, dyingEvent]);
		});
	});

	describe("consumeEventsForPiece", () => {
		it("returns empty array for unknown pieceId", () => {
			const store = new PieceAnimationEventStore();

			expect(store.consumeEventsForPiece("nonexistent")).toEqual([]);
		});

		it("clears events for the consumed piece only", () => {
			const store = new PieceAnimationEventStore();

			store.pushEvents([attackEvent, hitEvent]);

			store.consumeEventsForPiece("piece-A");

			// piece-A is cleared
			expect(store.consumeEventsForPiece("piece-A")).toEqual([]);
			// piece-B still has events
			expect(store.consumeEventsForPiece("piece-B")).toEqual([hitEvent]);
		});
	});

	describe("subscribe / getSnapshot", () => {
		it("starts at version 0", () => {
			const store = new PieceAnimationEventStore();

			expect(store.getSnapshot()).toBe(0);
		});

		it("increments version on pushEvents", () => {
			const store = new PieceAnimationEventStore();

			store.pushEvents([attackEvent]);
			expect(store.getSnapshot()).toBe(1);

			store.pushEvents([hitEvent]);
			expect(store.getSnapshot()).toBe(2);
		});

		it("does not increment version on consume", () => {
			const store = new PieceAnimationEventStore();

			store.pushEvents([attackEvent]);
			const versionBefore = store.getSnapshot();

			store.consumeEventsForPiece("piece-A");

			expect(store.getSnapshot()).toBe(versionBefore);
		});

		it("notifies listeners on pushEvents", () => {
			const store = new PieceAnimationEventStore();
			const listener = jest.fn();

			store.subscribe(listener);
			store.pushEvents([attackEvent]);

			expect(listener).toHaveBeenCalledTimes(1);
		});

		it("does not notify after unsubscribe", () => {
			const store = new PieceAnimationEventStore();
			const listener = jest.fn();

			const unsubscribe = store.subscribe(listener);
			unsubscribe();

			store.pushEvents([attackEvent]);

			expect(listener).not.toHaveBeenCalled();
		});

		it("notifies multiple listeners", () => {
			const store = new PieceAnimationEventStore();
			const listener1 = jest.fn();
			const listener2 = jest.fn();

			store.subscribe(listener1);
			store.subscribe(listener2);

			store.pushEvents([attackEvent]);

			expect(listener1).toHaveBeenCalledTimes(1);
			expect(listener2).toHaveBeenCalledTimes(1);
		});
	});
});
