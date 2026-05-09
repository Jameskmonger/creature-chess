import { BattleRunner } from "@creature-chess/battle";
import { GamemodeSettingsPresets } from "@creature-chess/models";
import { PieceRegistry } from "@creature-chess/utils";

import { BattleSession } from "./BattleSession";

jest.mock("@creature-chess/battle", () => {
	const actual = jest.requireActual("@creature-chess/battle");
	return {
		...actual,
		BattleRunner: jest.fn(),
	};
});

const MockBattleRunner = BattleRunner as unknown as jest.Mock;

type RunnerInstance = {
	run: jest.Mock<Promise<{ turn: number }>, []>;
	pause: jest.Mock;
	resume: jest.Mock;
	stop: jest.Mock;
	resolveRun: (turn: number) => void;
	constructorArgs: unknown[];
};

const createInstrumentedRunner = (): RunnerInstance => {
	let resolveRun!: (turn: number) => void;
	const runPromise = new Promise<{ turn: number }>((resolve) => {
		resolveRun = (turn) => resolve({ turn });
	});
	return {
		run: jest.fn(() => runPromise),
		pause: jest.fn(),
		resume: jest.fn(),
		stop: jest.fn(),
		resolveRun,
		constructorArgs: [],
	};
};

const wireRunnerQueue = (queue: RunnerInstance[]) => {
	MockBattleRunner.mockImplementation((...args: unknown[]) => {
		const next = queue.shift();
		if (!next) {
			throw new Error("No more runner instances queued");
		}
		next.constructorArgs = args;
		return next;
	});
};

const settings = GamemodeSettingsPresets.default;

const buildSession = () =>
	new BattleSession(new PieceRegistry(), settings);

describe("BattleSession", () => {
	beforeEach(() => {
		MockBattleRunner.mockReset();
	});

	test("owns its battle board sized from settings", () => {
		const session = buildSession();
		expect(session.board.width).toBe(settings.boardWidth);
		expect(session.board.height).toBe(settings.boardHalfHeight * 2);
	});

	test("owns its own combatStore and animationEventStore", () => {
		const session = buildSession();
		expect(session.combatStore).toBeDefined();
		expect(session.animationEventStore).toBeDefined();
	});

	test("start() constructs a runner against the session's stores and returns its result", async () => {
		const runner = createInstrumentedRunner();
		wireRunnerQueue([runner]);

		const session = buildSession();
		const promise = session.start(7);
		runner.resolveRun(12);

		expect(await promise).toEqual({ turn: 12 });
		expect(MockBattleRunner).toHaveBeenCalledTimes(1);
		const [board, , combatStore, passedSettings, startingTurn] =
			runner.constructorArgs;
		expect(board).toBe(session.board);
		expect(combatStore).toBe(session.combatStore);
		expect(passedSettings).toBe(settings);
		expect(startingTurn).toBe(7);
	});

	test("start() forwards runner events into the session's animationEventStore", async () => {
		const runner = createInstrumentedRunner();
		wireRunnerQueue([runner]);

		const session = buildSession();
		const pushSpy = jest.spyOn(session.animationEventStore, "pushEvents");

		session.start();

		const onEvents = runner.constructorArgs[5] as (events: unknown[]) => void;
		const events = [{ type: "piece_dying", pieceId: "p1" }];
		onEvents(events);

		expect(pushSpy).toHaveBeenCalledWith(events);

		runner.resolveRun(0);
	});

	test("start() defaults turn to 0 when omitted", async () => {
		const runner = createInstrumentedRunner();
		wireRunnerQueue([runner]);

		const session = buildSession();
		const promise = session.start();
		runner.resolveRun(0);
		await promise;

		expect(runner.constructorArgs[4]).toBe(0);
	});

	test("calling start() again stops the previous runner before constructing the new one", async () => {
		const first = createInstrumentedRunner();
		const second = createInstrumentedRunner();
		wireRunnerQueue([first, second]);

		const session = buildSession();
		const firstPromise = session.start(0);
		expect(first.stop).not.toHaveBeenCalled();

		const secondPromise = session.start(5);
		expect(first.stop).toHaveBeenCalledTimes(1);

		first.resolveRun(2);
		second.resolveRun(9);

		await expect(firstPromise).resolves.toEqual({ turn: 2 });
		await expect(secondPromise).resolves.toEqual({ turn: 9 });
		expect(MockBattleRunner).toHaveBeenCalledTimes(2);
	});

	test("pause() and resume() forward to the active runner", async () => {
		const runner = createInstrumentedRunner();
		wireRunnerQueue([runner]);

		const session = buildSession();
		session.start();
		session.pause();
		session.resume();

		expect(runner.pause).toHaveBeenCalledTimes(1);
		expect(runner.resume).toHaveBeenCalledTimes(1);

		runner.resolveRun(0);
	});

	test("pause() and resume() are no-ops when no runner exists", () => {
		const session = buildSession();
		expect(() => session.pause()).not.toThrow();
		expect(() => session.resume()).not.toThrow();
		expect(MockBattleRunner).not.toHaveBeenCalled();
	});
});
