import { Board } from "@creature-chess/board";
import { GamemodeSettings } from "@creature-chess/models";
import { PieceRegistry } from "@creature-chess/utils";

import { BattleRunner } from "./battleRunner";
import { simulateTurn } from "./simulator";
import { PieceCombatState, PieceInfoStore } from "./state";

jest.mock("./simulator", () => ({
	simulateTurn: jest.fn(),
}));

jest.mock("./utils/duration", () => ({
	duration: jest.fn(() => ({
		remaining: () => ({ promise: Promise.resolve(), ms: 0 }),
	})),
}));

const mockSimulateTurn = simulateTurn as jest.Mock;

function createMockBoard(pieces: { id: string }[] = []) {
	return {
		getAllPieces: jest.fn(() => pieces.map((p) => ({ id: p.id }))),
		removePiece: jest.fn(),
	} as unknown as Board;
}

function createMockPieceRegistry(
	pieces: { id: string; ownerId: string }[] = []
) {
	const map = new Map(
		pieces.map((p) => [p.id, { id: p.id, ownerId: p.ownerId }])
	);
	return {
		getPieceById: jest.fn((id: string) => map.get(id) ?? null),
	} as unknown as PieceRegistry;
}

function createMockCombatStore(
	pieces: { id: string; health: number }[] = []
): PieceInfoStore<PieceCombatState> {
	const map = new Map<string, { currentHealth: number }>();
	for (const p of pieces) {
		map.set(p.id, { currentHealth: p.health });
	}
	return {
		seedPiece: jest.fn((id: string, state: PieceCombatState) => {
			map.set(id, state as unknown as { currentHealth: number });
		}),
		clear: jest.fn(() => map.clear()),
		getPiece: jest.fn(
			(id: string) => map.get(id) as unknown as PieceCombatState
		),
		updatePiece: jest.fn(),
		updatePiecePartial: jest.fn(),
		subscribe: jest.fn(() => () => undefined),
		getSnapshot: jest.fn(() => 0),
		// eslint-disable-next-line @typescript-eslint/naming-convention
		_getMap: jest.fn(() => map as unknown as Map<string, PieceCombatState>),
	};
}

const defaultSettings: GamemodeSettings = {
	battleTurnCount: 50,
	battleTurnDuration: 0,
} as GamemodeSettings;

describe("BattleRunner", () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	describe("getTurn", () => {
		test("returns 0 by default", () => {
			const runner = new BattleRunner(
				createMockBoard(),
				createMockPieceRegistry(),
				createMockCombatStore(),
				defaultSettings
			);
			expect(runner.getTurn()).toBe(0);
		});

		test("returns startingTurn if provided", () => {
			const runner = new BattleRunner(
				createMockBoard(),
				createMockPieceRegistry(),
				createMockCombatStore(),
				defaultSettings,
				10
			);
			expect(runner.getTurn()).toBe(10);
		});
	});

	describe("run", () => {
		test("stops when a team is defeated (all pieces belong to one owner)", async () => {
			// Start with two teams alive
			const pieces = [
				{ id: "a", ownerId: "p1", health: 10 },
				{ id: "b", ownerId: "p2", health: 10 },
			];
			const board = createMockBoard(pieces);
			const registry = createMockPieceRegistry(pieces);
			const combatStore = createMockCombatStore(pieces);

			// After first simulateTurn, kill p2's piece
			mockSimulateTurn.mockImplementation(() => {
				const p2Combat = combatStore.getPiece("b") as any;
				if (p2Combat) {
					p2Combat.currentHealth = 0;
				}
			});

			const runner = new BattleRunner(
				board,
				registry,
				combatStore,
				defaultSettings
			);
			const result = await runner.run();

			// Should have run 1 turn then stopped (after the turn, only p1's pieces survive)
			expect(result.turn).toBe(1);
			expect(mockSimulateTurn).toHaveBeenCalledTimes(1);
		});

		test("stops when battleTurnCount is reached", async () => {
			const pieces = [
				{ id: "a", ownerId: "p1", health: 100 },
				{ id: "b", ownerId: "p2", health: 100 },
			];
			const board = createMockBoard(pieces);
			const registry = createMockPieceRegistry(pieces);
			const combatStore = createMockCombatStore(pieces);

			const settings = { ...defaultSettings, battleTurnCount: 3 };
			const runner = new BattleRunner(board, registry, combatStore, settings);
			const result = await runner.run();

			expect(result.turn).toBe(3);
			expect(mockSimulateTurn).toHaveBeenCalledTimes(3);
		});

		test("stops immediately if no pieces on board", async () => {
			const board = createMockBoard([]);
			const registry = createMockPieceRegistry([]);
			const combatStore = createMockCombatStore();

			const runner = new BattleRunner(
				board,
				registry,
				combatStore,
				defaultSettings
			);
			const result = await runner.run();

			// No pieces means <= 1 unique owner ids, so isATeamDefeated is true at turn 0
			expect(result.turn).toBe(0);
			expect(mockSimulateTurn).not.toHaveBeenCalled();
		});

		test("increments turn counter each iteration", async () => {
			const pieces = [
				{ id: "a", ownerId: "p1", health: 100 },
				{ id: "b", ownerId: "p2", health: 100 },
			];
			const board = createMockBoard(pieces);
			const registry = createMockPieceRegistry(pieces);
			const combatStore = createMockCombatStore(pieces);

			const settings = { ...defaultSettings, battleTurnCount: 5 };
			const runner = new BattleRunner(board, registry, combatStore, settings);

			await runner.run();
			expect(runner.getTurn()).toBe(5);
		});

		test("calls simulateTurn with correct arguments", async () => {
			const pieces = [
				{ id: "a", ownerId: "p1", health: 100 },
				{ id: "b", ownerId: "p2", health: 100 },
			];
			const board = createMockBoard(pieces);
			const registry = createMockPieceRegistry(pieces);
			const combatStore = createMockCombatStore(pieces);

			const settings = { ...defaultSettings, battleTurnCount: 1 };
			const runner = new BattleRunner(board, registry, combatStore, settings);

			await runner.run();

			expect(mockSimulateTurn).toHaveBeenCalledWith(
				1,
				board,
				registry,
				expect.objectContaining({ combatStore })
			);
		});

		test("respects startingTurn offset", async () => {
			const pieces = [
				{ id: "a", ownerId: "p1", health: 100 },
				{ id: "b", ownerId: "p2", health: 100 },
			];
			const board = createMockBoard(pieces);
			const registry = createMockPieceRegistry(pieces);
			const combatStore = createMockCombatStore(pieces);

			// battleTurnCount is 5, starting at turn 3, so only 2 more turns
			const settings = { ...defaultSettings, battleTurnCount: 5 };
			const runner = new BattleRunner(
				board,
				registry,
				combatStore,
				settings,
				3
			);

			await runner.run();

			expect(runner.getTurn()).toBe(5);
			expect(mockSimulateTurn).toHaveBeenCalledTimes(2);
		});
	});

	describe("pause / resume", () => {
		test("pause and resume are callable", () => {
			const runner = new BattleRunner(
				createMockBoard(),
				createMockPieceRegistry(),
				createMockCombatStore(),
				defaultSettings
			);

			// Should not throw
			runner.pause();
			runner.resume();
		});
	});
});
