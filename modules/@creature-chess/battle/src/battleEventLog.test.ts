import { BattleEvent, BattleEventLog } from "./battleEventLog";

const attackEvent: BattleEvent = {
	type: "piece_attack",
	pieceId: "attacker-1",
	targetId: "target-1",
	attackTypeName: "basic",
	direction: { x: 0, y: -1 },
	distance: 1,
	damage: 10,
};

const hitEvent: BattleEvent = {
	type: "piece_hit",
	pieceId: "target-1",
	direction: { x: 0, y: 1 },
	damage: 10,
};

const dyingEvent: BattleEvent = {
	type: "piece_dying",
	pieceId: "target-1",
};

describe("BattleEventLog", () => {
	it("starts empty", () => {
		const log = new BattleEventLog();

		expect(log.consume()).toEqual([]);
	});

	it("appends and consumes events in order", () => {
		const log = new BattleEventLog();

		log.append(attackEvent);
		log.append(hitEvent);
		log.append(dyingEvent);

		expect(log.consume()).toEqual([attackEvent, hitEvent, dyingEvent]);
	});

	it("clears events after consume", () => {
		const log = new BattleEventLog();

		log.append(attackEvent);
		log.consume();

		expect(log.consume()).toEqual([]);
	});

	it("accumulates events across multiple appends", () => {
		const log = new BattleEventLog();

		log.append(attackEvent);
		log.append(hitEvent);

		const events = log.consume();
		expect(events).toHaveLength(2);

		log.append(dyingEvent);

		const events2 = log.consume();
		expect(events2).toEqual([dyingEvent]);
	});
});
