import { Logger } from "winston";

import { Board } from "@creature-chess/board";
import { GamePhase } from "@creature-chess/models";
import { PlayerStatus } from "@creature-chess/models/game/playerList";
import { PlayerProfile } from "@creature-chess/models/player";
import { GamemodeSettingsPresets } from "@creature-chess/models/settings";

import { Gamemode } from "../../game";
import { createPlayer, Player } from "./player";
import { PlayerCommands } from "./state";

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
	const gamemode = new Gamemode("test-game", logger, settings);

	return createPlayer(
		overrides?.id ?? "player-1",
		{
			logger,
			boards: {
				board: new Board(settings.boardWidth, settings.boardHalfHeight),
				bench: new Board(settings.benchSize, 1),
			},
			gamemode,
			settings,
		},
		{
			name: overrides?.name ?? "Alice",
			profile: overrides?.profile ?? { title: null, picture: null },
			finishPosition: overrides?.finishPosition ?? -1,
			finishRound: overrides?.finishRound ?? -1,
			match: null,
		}
	);
};

describe("createPlayer", () => {
	describe("construction", () => {
		test("sets id from argument", () => {
			const player = createSubject({ id: "abc-123" });
			expect(player.id).toBe("abc-123");
		});

		test("exposes dependencies as direct properties", () => {
			const settings = GamemodeSettingsPresets.default;
			const logger = createMockLogger();
			const gamemode = new Gamemode("g1", logger, settings);
			const board = new Board(settings.boardWidth, settings.boardHalfHeight);
			const bench = new Board(settings.benchSize, 1);

			const player = createPlayer(
				"p1",
				{ logger, boards: { board, bench }, gamemode, settings },
				{
					name: "n",
					profile: { title: null, picture: null },
					finishPosition: -1,
					finishRound: -1,
					match: null,
				}
			);

			expect(player.logger).toBe(logger);
			expect(player.board).toBe(board);
			expect(player.bench).toBe(bench);
			expect(player.gamemode).toBe(gamemode);
			expect(player.settings).toBe(settings);
		});

		test("sets initial mutable properties", () => {
			const profile: PlayerProfile = { title: null, picture: 7 };
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
	});

	describe("mutable properties", () => {
		test("name can be reassigned", () => {
			const player = createSubject({ name: "Alice" });
			player.name = "Charlie";
			expect(player.name).toBe("Charlie");
		});

		test("profile can be reassigned", () => {
			const player = createSubject();
			const newProfile: PlayerProfile = { title: null, picture: 42 };
			player.profile = newProfile;
			expect(player.profile).toBe(newProfile);
		});

		test("finishPosition can be reassigned", () => {
			const player = createSubject();
			player.finishPosition = 1;
			expect(player.finishPosition).toBe(1);
		});

		test("finishRound can be reassigned", () => {
			const player = createSubject();
			player.finishRound = 25;
			expect(player.finishRound).toBe(25);
		});

		test("match can be reassigned", () => {
			const player = createSubject();
			const fakeMatch = { foo: "bar" } as any;
			player.match = fakeMatch;
			expect(player.match).toBe(fakeMatch);
		});
	});

	describe("select", () => {
		test("returns the initial state produced by the reducers", () => {
			const player = createSubject();

			const cardShop = player.select((s) => s.cardShop);
			expect(cardShop).toEqual({ cards: [], locked: false });

			const spectating = player.select((s) => s.spectating);
			expect(spectating).toEqual({ id: null });

			const roundInfo = player.select((s) => s.roundInfo);
			expect(roundInfo.round).toBe(1);
			expect(roundInfo.phase).toBe(GamePhase.PREPARING);
		});

		test("returns the value produced by the selector", () => {
			const player = createSubject();
			expect(player.select((s) => s.playerInfo.status)).toBe(PlayerStatus.CONNECTED);
			expect(player.select((s) => s.playerInfo.ready)).toBe(false);
			expect(player.select(() => 42)).toBe(42);
		});
	});

	describe("put", () => {
		test("dispatches action through reducers to update state", () => {
			const player = createSubject();

			player.put(PlayerCommands.setSpectatingIdCommand("other-player"));

			expect(player.select((s) => s.spectating.id)).toBe("other-player");
		});

		test("supports multiple sequential dispatches", () => {
			const player = createSubject();

			player.put(PlayerCommands.updateShopLockCommand(true));
			expect(player.select((s) => s.cardShop.locked)).toBe(true);

			player.put(PlayerCommands.updateShopLockCommand(false));
			expect(player.select((s) => s.cardShop.locked)).toBe(false);
		});

		test("ignores actions with unknown types", () => {
			const player = createSubject();
			const before = player.select((s) => s);

			player.put({ type: "UNKNOWN/action", payload: 123 });

			const after = player.select((s) => s);
			expect(after).toBe(before);
		});

		test("state is immutably replaced when a reducer handles the action", () => {
			const player = createSubject();
			const before = player.select((s) => s.cardShop);

			player.put(PlayerCommands.updateShopLockCommand(true));

			const after = player.select((s) => s.cardShop);
			expect(after).not.toBe(before);
			expect(before.locked).toBe(false);
			expect(after.locked).toBe(true);
		});
	});

	describe("addListener", () => {
		test("effect fires when actionCreator matches dispatched action", async () => {
			const player = createSubject();
			const effect = jest.fn().mockResolvedValue(undefined);

			player.addListener({
				actionCreator: PlayerCommands.updateShopLockCommand,
				effect,
			});

			player.put(PlayerCommands.updateShopLockCommand(true));
			await flush();

			expect(effect).toHaveBeenCalledTimes(1);
			expect(effect.mock.calls[0][0]).toMatchObject({
				type: PlayerCommands.updateShopLockCommand.type,
				payload: true,
			});
		});

		test("effect does not fire when action type does not match", async () => {
			const player = createSubject();
			const effect = jest.fn().mockResolvedValue(undefined);

			player.addListener({
				actionCreator: PlayerCommands.updateShopLockCommand,
				effect,
			});

			player.put(PlayerCommands.setSpectatingIdCommand("x"));
			await flush();

			expect(effect).not.toHaveBeenCalled();
		});

		test("matches by literal `type` string", async () => {
			const player = createSubject();
			const effect = jest.fn().mockResolvedValue(undefined);

			player.addListener({
				type: PlayerCommands.updateShopLockCommand.type,
				effect,
			});

			player.put(PlayerCommands.updateShopLockCommand(false));
			await flush();

			expect(effect).toHaveBeenCalledTimes(1);
		});

		test("matches by `matcher` function", async () => {
			const player = createSubject();
			const effect = jest.fn().mockResolvedValue(undefined);

			player.addListener({
				matcher: (action) => action.payload === "target",
				effect,
			});

			player.put(PlayerCommands.setSpectatingIdCommand("nope"));
			player.put(PlayerCommands.setSpectatingIdCommand("target"));
			await flush();

			expect(effect).toHaveBeenCalledTimes(1);
			expect(effect.mock.calls[0][0].payload).toBe("target");
		});

		test("matches by `predicate` with access to current and previous state", async () => {
			const player = createSubject();
			const seen: Array<{ current: boolean; previous: boolean }> = [];

			player.addListener({
				predicate: (_action, currentState, previousState) => {
					seen.push({
						current: currentState.cardShop.locked,
						previous: previousState.cardShop.locked,
					});
					return true;
				},
				effect: async () => { },
			});

			player.put(PlayerCommands.updateShopLockCommand(true));
			await flush();

			expect(seen).toEqual([{ current: true, previous: false }]);
		});

		test("returns an unsubscribe function that stops future invocations", async () => {
			const player = createSubject();
			const effect = jest.fn().mockResolvedValue(undefined);

			const unsubscribe = player.addListener({
				actionCreator: PlayerCommands.updateShopLockCommand,
				effect,
			});

			player.put(PlayerCommands.updateShopLockCommand(true));
			await flush();
			expect(effect).toHaveBeenCalledTimes(1);

			unsubscribe();

			player.put(PlayerCommands.updateShopLockCommand(false));
			await flush();
			expect(effect).toHaveBeenCalledTimes(1);
		});

		test("unsubscribe is safe to call multiple times", async () => {
			const player = createSubject();
			const effect = jest.fn().mockResolvedValue(undefined);

			const unsubscribe = player.addListener({
				actionCreator: PlayerCommands.updateShopLockCommand,
				effect,
			});

			unsubscribe();
			expect(() => unsubscribe()).not.toThrow();

			player.put(PlayerCommands.updateShopLockCommand(true));
			await flush();
			expect(effect).not.toHaveBeenCalled();
		});

		test("multiple listeners on the same action all fire", async () => {
			const player = createSubject();
			const a = jest.fn().mockResolvedValue(undefined);
			const b = jest.fn().mockResolvedValue(undefined);

			player.addListener({
				actionCreator: PlayerCommands.updateShopLockCommand,
				effect: a,
			});
			player.addListener({
				actionCreator: PlayerCommands.updateShopLockCommand,
				effect: b,
			});

			player.put(PlayerCommands.updateShopLockCommand(true));
			await flush();

			expect(a).toHaveBeenCalledTimes(1);
			expect(b).toHaveBeenCalledTimes(1);
		});

		test("effect rejection does not break subsequent dispatches", async () => {
			const player = createSubject();
			const effect = jest.fn().mockRejectedValue(new Error("boom"));

			player.addListener({
				actionCreator: PlayerCommands.updateShopLockCommand,
				effect,
			});

			player.put(PlayerCommands.updateShopLockCommand(true));
			player.put(PlayerCommands.updateShopLockCommand(false));
			await flush();

			expect(effect).toHaveBeenCalledTimes(2);
		});

		test("re-dispatch cancels the prior in-flight invocation of the same listener", async () => {
			const player = createSubject();
			const observations: Array<"completed" | "cancelled"> = [];

			player.addListener({
				actionCreator: PlayerCommands.updateShopLockCommand,
				effect: async (_action, api) => {
					try {
						await api.delay(50);
						observations.push("completed");
					} catch {
						observations.push("cancelled");
					}
				},
			});

			player.put(PlayerCommands.updateShopLockCommand(true));
			// Dispatch again before the first delay resolves — should abort the first
			player.put(PlayerCommands.updateShopLockCommand(false));

			await new Promise((r) => setTimeout(r, 100));

			expect(observations).toEqual(["cancelled", "completed"]);
		});
	});

	describe("listener api", () => {
		test("api.getState reflects the current state", async () => {
			const player = createSubject();
			let observed: boolean | undefined;

			player.addListener({
				actionCreator: PlayerCommands.updateShopLockCommand,
				effect: async (_action, api) => {
					observed = api.getState().cardShop.locked;
				},
			});

			player.put(PlayerCommands.updateShopLockCommand(true));
			await flush();

			expect(observed).toBe(true);
		});

		test("api.dispatch forwards to put and updates state", async () => {
			const player = createSubject();

			player.addListener({
				actionCreator: PlayerCommands.updateShopLockCommand,
				effect: async (_action, api) => {
					api.dispatch(PlayerCommands.setSpectatingIdCommand("from-listener"));
				},
			});

			player.put(PlayerCommands.updateShopLockCommand(true));
			await flush();

			expect(player.select((s) => s.spectating.id)).toBe("from-listener");
		});

		test("api.player is the player itself", async () => {
			const player = createSubject();
			let captured: unknown;

			player.addListener({
				actionCreator: PlayerCommands.updateShopLockCommand,
				effect: async (_action, api) => {
					captured = api.player;
				},
			});

			player.put(PlayerCommands.updateShopLockCommand(true));
			await flush();

			expect(captured).toBe(player);
		});
	});

	describe("take", () => {
		test("resolves with the next action matching the predicate", async () => {
			const player = createSubject();
			let resolved: any;

			const task = player.runEffect(async (api) => {
				resolved = await api.take(
					(action) => action.type === PlayerCommands.updateShopLockCommand.type
				);
			});

			await flush();

			player.put(PlayerCommands.setSpectatingIdCommand("ignored"));
			player.put(PlayerCommands.updateShopLockCommand(true));

			await task.promise;

			expect(resolved).toMatchObject({
				type: PlayerCommands.updateShopLockCommand.type,
				payload: true,
			});
		});

		test("does not resolve for non-matching actions", async () => {
			const player = createSubject();
			const onResolve = jest.fn();

			player.runEffect(async (api) => {
				const action = await api.take(() => false);
				onResolve(action);
			});

			player.put(PlayerCommands.updateShopLockCommand(true));
			await flush();

			expect(onResolve).not.toHaveBeenCalled();
		});

		test("rejects (cancelled) when the task is cancelled while waiting", async () => {
			const player = createSubject();
			let caught: unknown;

			const task = player.runEffect(async (api) => {
				try {
					await api.take(() => false);
				} catch (err) {
					caught = err;
					throw err;
				}
			});

			await flush();
			task.cancel();
			await task.promise;

			expect(caught).toBeInstanceOf(Error);
			expect((caught as Error).message).toBe("cancelled");
		});

		test("rejects immediately if the task is already cancelled", async () => {
			const player = createSubject();
			let caught: unknown;

			const task = player.runEffect(async (api) => {
				try {
					await api.take(() => true);
				} catch (err) {
					caught = err;
					throw err;
				}
			});

			task.cancel();
			await task.promise;

			expect(caught).toBeInstanceOf(Error);
			expect((caught as Error).message).toBe("cancelled");
		});
	});

	describe("delay", () => {
		test("resolves after the specified duration", async () => {
			const player = createSubject();
			const start = Date.now();

			const task = player.runEffect(async (api) => {
				await api.delay(30);
			});

			await task.promise;
			const elapsed = Date.now() - start;

			expect(elapsed).toBeGreaterThanOrEqual(25);
		});

		test("rejects (cancelled) if the task is cancelled while delaying", async () => {
			const player = createSubject();
			let caught: unknown;

			const task = player.runEffect(async (api) => {
				try {
					await api.delay(1000);
				} catch (err) {
					caught = err;
					throw err;
				}
			});

			await flush();
			task.cancel();
			await task.promise;

			expect(caught).toBeInstanceOf(Error);
			expect((caught as Error).message).toBe("cancelled");
		});

		test("rejects immediately if the task is already cancelled", async () => {
			const player = createSubject();
			let caught: unknown;

			const task = player.runEffect(async (api) => {
				try {
					await api.delay(1000);
				} catch (err) {
					caught = err;
					throw err;
				}
			});

			task.cancel();
			await task.promise;

			expect(caught).toBeInstanceOf(Error);
			expect((caught as Error).message).toBe("cancelled");
		});
	});

	describe("runEffect", () => {
		test("invokes the effect and resolves its promise when the effect completes", async () => {
			const player = createSubject();
			const effect = jest.fn().mockResolvedValue(undefined);

			const task = player.runEffect(effect);
			await task.promise;

			expect(effect).toHaveBeenCalledTimes(1);
		});

		test("promise resolves (does not reject) when cancelled via CancelledError", async () => {
			const player = createSubject();

			const task = player.runEffect(async (api) => {
				await api.delay(1000);
			});

			task.cancel();

			// A propagated CancelledError should resolve the task cleanly
			await expect(task.promise).resolves.toBeUndefined();
		});

		test("promise rejects when the effect throws a non-CancelledError", async () => {
			const player = createSubject();

			const task = player.runEffect(async () => {
				throw new Error("other");
			});

			await expect(task.promise).rejects.toThrow("other");
		});
	});
});

// Let all scheduled microtasks/timers run
const flush = () => new Promise((r) => setTimeout(r, 0));
