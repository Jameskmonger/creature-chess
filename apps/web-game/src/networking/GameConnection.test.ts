/* eslint-disable no-underscore-dangle, @typescript-eslint/ban-types */
import { GameEvents, PlayerCommands } from "@creature-chess/gamemode";

import { GameConnection } from "./GameConnection";
import { ConnectionStatus } from "./types";

jest.mock("~/store/game/settings/state", () => ({
	SettingsCommands: {
		setSettingsCommand: (p: any) => ({ type: "settings/set", payload: p }),
	},
}));
jest.mock("~/store/game/ui/actions", () => ({
	setInGameCommand: () => ({ type: "ui/setInGame" }),
	setConnectionStatusCommand: (p: any) => ({
		type: "ui/setConnectionStatus",
		payload: p,
	}),
}));
jest.mock("~/store/game/network", () => ({
	setPing: (ms: number) => ({ type: "network/setPing", payload: ms }),
}));
jest.mock("~/store/board/sync", () => ({
	boardUpdateAction: Object.assign(
		(payload: any) => ({ type: "boardUpdateAction", payload }),
		{ type: "boardUpdateAction" }
	),
	benchUpdateAction: Object.assign(
		(payload: any) => ({ type: "benchUpdateAction", payload }),
		{ type: "benchUpdateAction" }
	),
	matchBoardUpdateAction: Object.assign(
		(payload: any) => ({ type: "matchBoardUpdateAction", payload }),
		{ type: "matchBoardUpdateAction" }
	),
}));

const createMockSocket = () => {
	const handlers = new Map<string, Function>();
	const ioHandlers = new Map<string, Function>();
	return {
		on: jest.fn((event: string, handler: Function) => {
			handlers.set(event, handler);
		}),
		off: jest.fn((event: string, handler: Function) => {
			handlers.delete(event);
		}),
		emit: jest.fn(),
		io: {
			on: jest.fn((event: string, handler: Function) => {
				ioHandlers.set(event, handler);
			}),
			off: jest.fn((event: string, handler: Function) => {
				ioHandlers.delete(event);
			}),
		},
		_trigger: (event: string, ...args: any[]) => {
			handlers.get(event)?.(...args);
		},
		_triggerIo: (event: string, ...args: any[]) => {
			ioHandlers.get(event)?.(...args);
		},
	};
};

describe("GameConnection", () => {
	let socket: ReturnType<typeof createMockSocket>;
	let dispatch: jest.Mock;
	let conn: GameConnection;

	beforeEach(() => {
		jest.useFakeTimers();
		socket = createMockSocket();
		dispatch = jest.fn();
		conn = new GameConnection(socket as any, dispatch);
	});

	afterEach(() => {
		conn.destroy();
		jest.useRealTimers();
	});

	describe("handleConnected", () => {
		const payload = {
			players: [{ id: "p1", name: "Alice" }],
			game: { phase: 1, phaseStartedAtSeconds: 1000 },
			settings: { maxPlayers: 8 },
		};

		it("should seed the store by replaying connection-packet contents as wire events", () => {
			conn.handleConnected(payload as any);

			expect(dispatch).toHaveBeenCalledWith(
				expect.objectContaining({
					type: GameEvents.playerListChangedEvent.type,
					payload: { players: payload.players },
				})
			);
			expect(dispatch).toHaveBeenCalledWith(
				expect.objectContaining({
					type: GameEvents.gamePhaseStartedEvent.type,
				})
			);
			expect(dispatch).toHaveBeenCalledWith(
				expect.objectContaining({ type: "settings/set" })
			);
			expect(dispatch).toHaveBeenCalledWith(
				expect.objectContaining({ type: "ui/setInGame" })
			);
		});

		it("should dispatch CONNECTED status", () => {
			conn.handleConnected(payload as any);

			expect(dispatch).toHaveBeenCalledWith({
				type: "ui/setConnectionStatus",
				payload: ConnectionStatus.CONNECTED,
			});
		});
	});

	describe("sendPlayerAction", () => {
		it("should emit valid player actions to socket", () => {
			const action = { type: "buyXpPlayerAction" };
			conn.sendPlayerAction(action);

			expect(socket.emit).toHaveBeenCalledWith(
				"sendPlayerActions",
				action,
				expect.any(Function)
			);
		});

		it("should reject invalid action types", () => {
			const consoleSpy = jest.spyOn(console, "error").mockImplementation();
			conn.sendPlayerAction({ type: "invalidAction" });

			expect(socket.emit).not.toHaveBeenCalledWith(
				"sendPlayerActions",
				expect.anything(),
				expect.anything()
			);
			expect(consoleSpy).toHaveBeenCalledWith(
				expect.stringContaining("Invalid player action type")
			);
			consoleSpy.mockRestore();
		});

		it("should dispatch ping RTT on ack", () => {
			conn.sendPlayerAction({ type: "buyXpPlayerAction" });

			const ackCall = socket.emit.mock.calls.find(
				(c: any[]) => c[0] === "sendPlayerActions"
			);
			const ackFn = ackCall?.[2];
			ackFn?.();

			expect(dispatch).toHaveBeenCalledWith(
				expect.objectContaining({ type: "network/setPing" })
			);
		});
	});

	describe("sendFinishMatch", () => {
		it("should emit finishMatch", () => {
			conn.sendFinishMatch();
			expect(socket.emit).toHaveBeenCalledWith("finishMatch", { empty: true });
		});
	});

	describe("board listeners", () => {
		it("should dispatch boardUpdateAction with packet payload", () => {
			const packet = { positions: {}, pieces: [] };
			socket._trigger("boardUpdate", packet);

			expect(dispatch).toHaveBeenCalledWith({
				type: "boardUpdateAction",
				payload: packet,
			});
		});

		it("should dispatch benchUpdateAction with packet payload", () => {
			const packet = { positions: {}, pieces: [] };
			socket._trigger("benchUpdate", packet);

			expect(dispatch).toHaveBeenCalledWith({
				type: "benchUpdateAction",
				payload: packet,
			});
		});

		it("should dispatch matchBoardUpdateAction with packet payload", () => {
			const board = { positions: {}, pieces: [] };
			socket._trigger("matchBoardUpdate", { turn: 3, board });

			expect(dispatch).toHaveBeenCalledWith({
				type: "matchBoardUpdateAction",
				payload: { turn: 3, board },
			});
		});
	});

	describe("game event listeners", () => {
		it("should dispatch valid game events verbatim and call ack", () => {
			const ack = jest.fn();
			const action = {
				type: "gamePhaseStartedEvent",
				payload: { phase: 1, startedAt: 1000, round: 1 },
			};
			socket._trigger("sendGameEvents", action, ack);

			expect(ack).toHaveBeenCalled();
			expect(dispatch).toHaveBeenCalledWith(action);
		});

		it("should reject invalid game event types", () => {
			const consoleSpy = jest.spyOn(console, "error").mockImplementation();
			socket._trigger("sendGameEvents", { type: "bogusEvent" });

			expect(consoleSpy).toHaveBeenCalledWith(
				expect.stringContaining("Unhandled sendGameEvents type")
			);
			consoleSpy.mockRestore();
		});

		it("should dispatch gameFinishEvent verbatim", () => {
			const action = {
				type: "gameFinishEvent",
				payload: {
					players: [
						{ id: "p1", position: 1, finishRound: 10 },
						{ id: "p2", position: 2, finishRound: 8 },
					],
				},
			};
			socket._trigger("sendGameEvents", action);

			expect(dispatch).toHaveBeenCalledWith(action);
		});

		it("should dispatch playerListChangedEvent verbatim", () => {
			const action = {
				type: "playerListChangedEvent",
				payload: { players: [{ id: "p1" }] },
			};
			socket._trigger("sendGameEvents", action);

			expect(dispatch).toHaveBeenCalledWith(action);
		});
	});

	describe("player event listeners", () => {
		it("should dispatch valid player events verbatim", () => {
			const action = {
				type: "playerReceiveQuickChatEvent",
				payload: { sendingPlayerId: "p1", chatValue: 0 },
			};
			socket._trigger("sendLocalPlayerEvents", action);

			expect(dispatch).toHaveBeenCalledWith(action);
		});

		it("should reject invalid player event types", () => {
			const consoleSpy = jest.spyOn(console, "error").mockImplementation();
			socket._trigger("sendLocalPlayerEvents", { type: "bogusEvent" });

			expect(consoleSpy).toHaveBeenCalledWith(
				expect.stringContaining("Unhandled sendLocalPlayerEvents type")
			);
			consoleSpy.mockRestore();
		});
	});

	describe("snapshot listener", () => {
		it("should dispatch each action in the snapshot", () => {
			const actions = [
				PlayerCommands.playerInfoCommands.updateMoneyCommand(5),
				PlayerCommands.updateShopLockCommand(true),
			];
			socket._trigger("snapshot", actions);

			expect(dispatch).toHaveBeenCalledWith(actions[0]);
			expect(dispatch).toHaveBeenCalledWith(actions[1]);
		});

		it("should reject unknown action types", () => {
			const consoleSpy = jest.spyOn(console, "error").mockImplementation();
			socket._trigger("snapshot", [{ type: "bogusEvent" }]);

			expect(consoleSpy).toHaveBeenCalledWith(
				expect.stringContaining("Unhandled snapshot action type")
			);
			consoleSpy.mockRestore();
		});
	});

	describe("connection status", () => {
		it("should dispatch DISCONNECTED on reconnect_failed", () => {
			socket._triggerIo("reconnect_failed");

			expect(dispatch).toHaveBeenCalledWith({
				type: "ui/setConnectionStatus",
				payload: ConnectionStatus.DISCONNECTED,
			});
		});

		it("should dispatch DISCONNECTED on reconnect_error", () => {
			socket._triggerIo("reconnect_error");

			expect(dispatch).toHaveBeenCalledWith({
				type: "ui/setConnectionStatus",
				payload: ConnectionStatus.DISCONNECTED,
			});
		});
	});

	describe("ping loop", () => {
		it("should emit ping every 2.5 seconds", () => {
			socket.emit.mockClear();

			jest.advanceTimersByTime(2500);

			expect(socket.emit).toHaveBeenCalledWith(
				"ping",
				{ type: "ping" },
				expect.any(Function)
			);
		});

		it("should stop pinging after destroy", () => {
			conn.destroy();
			socket.emit.mockClear();

			jest.advanceTimersByTime(5000);

			const pingCalls = socket.emit.mock.calls.filter(
				(c: any[]) => c[0] === "ping"
			);
			expect(pingCalls).toHaveLength(0);
		});
	});

	describe("destroy", () => {
		it("should remove all socket listeners", () => {
			conn.destroy();

			expect(socket.off).toHaveBeenCalled();
			expect(socket.io.off).toHaveBeenCalled();
		});
	});
});
