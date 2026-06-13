import { Logger } from "@cc-engine/kernel";

import { SubscribableBoard, packPosition } from "@creature-chess/board";
import { PlayerProfile, PlayerStatus } from "@creature-chess/models";
import { GamemodeSettingsPresets } from "@creature-chess/models";

import { createDefaultGamemodeContext } from "../../coreBootstrap";
import { Gamemode } from "../../game";
import { Player } from "./player";

const createMockLogger = (): Logger => {
	const noop = () => undefined;
	return {
		info: noop,
		warn: noop,
		error: noop,
		debug: noop,
	} as unknown as Logger;
};

const createSubject = (overrides?: {
	id?: string;
	name?: string;
	profile?: PlayerProfile;
	finishPosition?: number;
	finishRound?: number;
}): Player => {
	const settings = GamemodeSettingsPresets.default;
	const logger = createMockLogger();
	const gamemode = new Gamemode({
		id: "test-game",
		logger,
		settings,
		context: createDefaultGamemodeContext(),
	});

	return gamemode.createPlayer(overrides?.id ?? "player-1", {
		boards: {
			board: new SubscribableBoard(
				settings.boardWidth,
				settings.boardHalfHeight
			),
			bench: new SubscribableBoard(settings.benchSize, 1),
		},
		name: overrides?.name ?? "Alice",
		profile: overrides?.profile ?? { title: null, picture: null },
		finishPosition: overrides?.finishPosition ?? -1,
		finishRound: overrides?.finishRound ?? -1,
		match: null,
	});
};

describe("Gamemode.createPlayer", () => {
	describe("construction", () => {
		test("sets id from argument", () => {
			expect(createSubject({ id: "abc-123" }).id).toBe("abc-123");
		});

		test("exposes dependencies as direct properties", () => {
			const settings = GamemodeSettingsPresets.default;
			const logger = createMockLogger();
			const gamemode = new Gamemode({
				id: "g1",
				logger,
				settings,
				context: createDefaultGamemodeContext(),
			});
			const board = new SubscribableBoard(
				settings.boardWidth,
				settings.boardHalfHeight
			);
			const bench = new SubscribableBoard(settings.benchSize, 1);

			const player = gamemode.createPlayer("p1", {
				boards: { board, bench },
				name: "n",
				profile: { title: null, picture: null },
				finishPosition: -1,
				finishRound: -1,
				match: null,
			});

			expect(player.logger).toBe(logger);
			expect(player.board).toBe(board);
			expect(player.bench).toBe(bench);
			expect(player.gamemode).toBe(gamemode);
			expect(player.settings).toBe(settings);
		});

		test("sets initial mutable properties", () => {
			const profile: PlayerProfile = { title: null, picture: "creature:7" };
			const player = createSubject({
				name: "Bob",
				profile,
				finishPosition: 3,
				finishRound: 12,
			});

			expect(player.name).toBe("Bob");
			expect(player.profile).toBe(profile);
			expect(player.finishPosition).toBe(3);
			expect(player.finishRound).toBe(12);
			expect(player.match).toBeNull();
		});

		test("initial typed getters expose default state", () => {
			const player = createSubject();
			expect(player.shopLocked).toBe(false);
			expect(player.spectatingId).toBeNull();
			expect(player.status).toBe(PlayerStatus.CONNECTED);
			expect(player.ready).toBe(false);
		});
	});

	describe("typed mutators", () => {
		test("setShopLocked toggles shopLocked getter", () => {
			const player = createSubject();
			player.setShopLocked(true);
			expect(player.shopLocked).toBe(true);
			player.setShopLocked(false);
			expect(player.shopLocked).toBe(false);
		});

		test("setSpectatingId updates spectatingId getter", () => {
			const player = createSubject();
			player.setSpectatingId("other-player");
			expect(player.spectatingId).toBe("other-player");
		});

		test("setFinishStanding writes to readonly fields", () => {
			const player = createSubject();
			player.setFinishStanding({ position: 4, round: 7 });
			expect(player.finishPosition).toBe(4);
			expect(player.finishRound).toBe(7);
		});

		test("addMoney accumulates", () => {
			const player = createSubject();
			const before = player.money;
			player.addMoney(5);
			expect(player.money).toBe(before + 5);
		});

		test("reduceHealth auto-eliminates on the killing blow", () => {
			const player = createSubject();
			player.setHealth(10);

			player.reduceHealth(3);
			expect(player.health).toBe(7);
			expect(player.alive).toBe(true);
			expect(player.status).toBe(PlayerStatus.CONNECTED);

			player.reduceHealth(7);
			expect(player.health).toBe(0);
			expect(player.alive).toBe(false);
			expect(player.status).toBe(PlayerStatus.DEAD);
		});
	});

	describe("swapPieces", () => {
		const makePiece = (id: string, definitionId: number) => ({
			id,
			ownerId: "player-1",
			definitionId,
			stage: 0,
			traits: [],
			maxHealth: 100,
		});

		test("cross-side swap sends each piece to the other's prior side and slot", () => {
			const player = createSubject();
			player.addPiece(makePiece("a", 1), {
				type: "board",
				location: packPosition(2, 1),
			});
			player.addPiece(makePiece("b", 2), {
				type: "bench",
				location: packPosition(4, 0),
			});

			player.swapPieces("a", "b");

			expect(player.bench.containsPiece("a")).toBe(true);
			expect(player.bench.getPiecePosition("a")).toEqual([4, 0]);
			expect(player.board.containsPiece("b")).toBe(true);
			expect(player.board.getPiecePosition("b")).toEqual([2, 1]);
		});

		test("cross-side swap does not throw when bench-piece's x collides with a board piece in row 0", () => {
			const player = createSubject();
			// Decoy on board at (3, 0) - same x as the bench piece, row 0.
			player.addPiece(makePiece("decoy", 3), {
				type: "board",
				location: packPosition(3, 0),
			});
			player.addPiece(makePiece("a", 1), {
				type: "board",
				location: packPosition(2, 1),
			});
			player.addPiece(makePiece("b", 2), {
				type: "bench",
				location: packPosition(3, 0),
			});

			expect(() => player.swapPieces("a", "b")).not.toThrow();
			expect(player.bench.getPiecePosition("a")).toEqual([3, 0]);
			expect(player.board.getPiecePosition("b")).toEqual([2, 1]);
			expect(player.board.getPiecePosition("decoy")).toEqual([3, 0]);
		});
	});

	describe("events.onInfoUpdate", () => {
		test("keyed subscription fires the initial value by default", () => {
			const player = createSubject();
			const seen: number[] = [];
			player.events.onInfoUpdate("health", (h) => seen.push(h));
			expect(seen).toEqual([player.health]);
		});

		test("keyed subscription respects emitInitial: false", () => {
			const player = createSubject();
			const seen: number[] = [];
			player.events.onInfoUpdate("health", (h) => seen.push(h), {
				emitInitial: false,
			});
			expect(seen).toEqual([]);
		});

		test("keyed subscription fires on subsequent updates", () => {
			const player = createSubject();
			const seen: boolean[] = [];
			player.events.onInfoUpdate("ready", (r) => seen.push(r), {
				emitInitial: false,
			});
			player.setReady(true);
			player.setReady(false);
			expect(seen).toEqual([true, false]);
		});

		test("firehose receives the underlying action", () => {
			const player = createSubject();
			const seen: string[] = [];
			player.events.onInfoUpdate((a) => seen.push(a.type));
			player.setReady(true);
			expect(seen.length).toBe(1);
		});

		test("unsubscribe stops future invocations", () => {
			const player = createSubject();
			const seen: boolean[] = [];
			const unsub = player.events.onInfoUpdate("ready", (r) => seen.push(r), {
				emitInitial: false,
			});
			player.setReady(true);
			unsub();
			player.setReady(false);
			expect(seen).toEqual([true]);
		});
	});

	describe("events.onPlayerEvent", () => {
		test("keyed subscription fires on the matching event only", () => {
			const player = createSubject();
			const calls: string[] = [];
			player.events.onPlayerEvent("playerDeath", () => calls.push("death"));
			player.events.onPlayerEvent("afterRerollCards", () =>
				calls.push("reroll")
			);
			player.reduceHealth(player.health);
			expect(calls).toEqual(["death"]);
		});

		test("firehose fires only for wire-shape events", () => {
			const player = createSubject();
			const seen: string[] = [];
			player.events.onPlayerEvent((a) => seen.push(a.type));
			// playerDeath is on the wire, afterReroll is internal-only
			player.reduceHealth(player.health);
			player.emitRerollCards();
			expect(seen).toEqual(["playerDeathEvent"]);
		});
	});

	describe("events.onSpectatingChange", () => {
		test("fires with the new id on setSpectatingId", () => {
			const player = createSubject();
			const seen: (string | null)[] = [];
			player.events.onSpectatingChange((id) => seen.push(id));
			player.setSpectatingId("other");
			player.setSpectatingId(null);
			expect(seen).toEqual(["other", null]);
		});
	});

	describe("events.onQuit", () => {
		test("fires once when status changes to QUIT", () => {
			const player = createSubject();
			const fn = jest.fn();
			player.events.onQuit(fn);
			player.setStatus(PlayerStatus.QUIT);
			expect(fn).toHaveBeenCalledTimes(1);
		});

		test("does not fire for other status changes", () => {
			const player = createSubject();
			const fn = jest.fn();
			player.events.onQuit(fn);
			player.setStatus(PlayerStatus.DEAD);
			expect(fn).not.toHaveBeenCalled();
		});
	});
});
