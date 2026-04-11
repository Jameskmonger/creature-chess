/* eslint-disable no-underscore-dangle, @typescript-eslint/ban-types */
import { EventBus } from "./EventBus";
import { GameConnection, BoardSlices } from "./GameConnection";
import { ConnectionStatus, GameEventMap } from "./types";
import { updateBoardFromPacket } from "./utils/updateBoardFromPacket";

jest.mock("~/store/game/playerList/state", () => ({
	PlayerListCommands: {
		updatePlayerListCommand: (p: any) => ({
			type: "playerList/update",
			payload: p,
		}),
	},
}));
jest.mock("~/store/game/settings/state", () => ({
	SettingsCommands: {
		setSettingsCommand: (p: any) => ({ type: "settings/set", payload: p }),
	},
}));
jest.mock("~/store/game/ui/actions", () => ({
	setInGameCommand: () => ({ type: "ui/setInGame" }),
	setWinnerIdCommand: (p: any) => ({ type: "ui/setWinnerId", payload: p }),
}));
jest.mock("~/store/game/network", () => ({
	setPing: (ms: number) => ({ type: "network/setPing", payload: ms }),
}));
jest.mock("./utils/updateBoardFromPacket", () => ({
	updateBoardFromPacket: jest.fn(),
}));

const mockedUpdateBoard = updateBoardFromPacket as jest.Mock;

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

const createMockBoardSlices = (): BoardSlices => ({
	board: {} as any,
	bench: {} as any,
	matchBoard: {} as any,
	pieceRegistry: {} as any,
});

describe("GameConnection", () => {
	let socket: ReturnType<typeof createMockSocket>;
	let dispatch: jest.Mock;
	let eventBus: EventBus<GameEventMap>;
	let boardSlices: BoardSlices;
	let conn: GameConnection;

	beforeEach(() => {
		jest.useFakeTimers();
		socket = createMockSocket();
		dispatch = jest.fn();
		eventBus = new EventBus();
		boardSlices = createMockBoardSlices();
		conn = new GameConnection(socket as any, dispatch, boardSlices, eventBus);
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

		it("should dispatch initial state", () => {
			conn.handleConnected(payload as any);

			expect(dispatch).toHaveBeenCalledWith(
				expect.objectContaining({ type: "playerList/update" })
			);
			expect(dispatch).toHaveBeenCalledWith(
				expect.objectContaining({ type: "settings/set" })
			);
			expect(dispatch).toHaveBeenCalledWith(
				expect.objectContaining({ type: "ui/setInGame" })
			);
		});

		it("should emit connectionStatusChanged CONNECTED on eventBus", () => {
			const handler = jest.fn();
			eventBus.on("connectionStatusChanged", handler);

			conn.handleConnected(payload as any);

			expect(handler).toHaveBeenCalledWith(ConnectionStatus.CONNECTED);
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
		it("should call updateBoardFromPacket on boardUpdate", () => {
			const packet = { positions: {}, pieces: [] };
			socket._trigger("boardUpdate", packet);

			expect(mockedUpdateBoard).toHaveBeenCalledWith(
				boardSlices.board,
				boardSlices.pieceRegistry,
				packet
			);
		});

		it("should call updateBoardFromPacket on benchUpdate", () => {
			const packet = { positions: {}, pieces: [] };
			socket._trigger("benchUpdate", packet);

			expect(mockedUpdateBoard).toHaveBeenCalledWith(
				boardSlices.bench,
				boardSlices.pieceRegistry,
				packet
			);
		});

		it("should handle matchBoardUpdate with turn", () => {
			const board = { positions: {}, pieces: [] };
			socket._trigger("matchBoardUpdate", { turn: 3, board });

			expect(mockedUpdateBoard).toHaveBeenCalledWith(
				boardSlices.matchBoard,
				boardSlices.pieceRegistry,
				board
			);
			expect(dispatch).toHaveBeenCalledWith(
				expect.objectContaining({ payload: { turn: 3 } })
			);
		});

		it("should handle matchBoardUpdate with turn 0", () => {
			const board = { positions: {}, pieces: [] };
			socket._trigger("matchBoardUpdate", { turn: 0, board });

			expect(dispatch).toHaveBeenCalledWith(
				expect.objectContaining({ payload: { turn: 0 } })
			);
		});

		it("should not dispatch battle command when turn is null", () => {
			dispatch.mockClear();
			const board = { positions: {}, pieces: [] };
			socket._trigger("matchBoardUpdate", { turn: null, board });

			const battleDispatches = dispatch.mock.calls.filter(
				([action]: any[]) => action.payload?.turn !== undefined
			);
			expect(battleDispatches).toHaveLength(0);
		});
	});

	describe("game event listeners", () => {
		it("should dispatch valid game events and call ack", () => {
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

		it("should emit phaseChanged on gamePhaseStartedEvent", () => {
			const handler = jest.fn();
			eventBus.on("phaseChanged", handler);

			const payload = { phase: 1, startedAt: 1000, round: 1 };
			socket._trigger("sendGameEvents", {
				type: "gamePhaseStartedEvent",
				payload,
			});

			expect(handler).toHaveBeenCalledWith(payload);
		});

		it("should dispatch setWinnerIdCommand on gameFinishEvent with a winner", () => {
			const payload = {
				players: [
					{ id: "p1", position: 1, finishRound: 10 },
					{ id: "p2", position: 2, finishRound: 8 },
				],
			};
			socket._trigger("sendGameEvents", {
				type: "gameFinishEvent",
				payload,
			});

			expect(dispatch).toHaveBeenCalledWith({
				type: "ui/setWinnerId",
				payload: { winnerId: "p1" },
			});
		});

		it("should emit gameFinished on gameFinishEvent", () => {
			const handler = jest.fn();
			eventBus.on("gameFinished", handler);

			const payload = { players: [{ id: "p1", position: 1, finishRound: 10 }] };
			socket._trigger("sendGameEvents", {
				type: "gameFinishEvent",
				payload,
			});

			expect(handler).toHaveBeenCalledWith(payload);
		});

		it("should dispatch updatePlayerListCommand on playerListChangedEvent", () => {
			const players = [{ id: "p1" }];
			socket._trigger("sendGameEvents", {
				type: "playerListChangedEvent",
				payload: { players },
			});

			expect(dispatch).toHaveBeenCalledWith({
				type: "playerList/update",
				payload: players,
			});
		});
	});

	describe("player event listeners", () => {
		it("should emit quickChat on playerReceiveQuickChatEvent", () => {
			const handler = jest.fn();
			eventBus.on("quickChat", handler);

			const payload = { sendingPlayerId: "p1", chatValue: 0 };
			socket._trigger("sendLocalPlayerEvents", {
				type: "playerReceiveQuickChatEvent",
				payload,
			});

			expect(handler).toHaveBeenCalledWith(payload);
		});

		it("should emit playerDeath on playerDeathEvent", () => {
			const handler = jest.fn();
			eventBus.on("playerDeath", handler);

			socket._trigger("sendLocalPlayerEvents", {
				type: "playerDeathEvent",
			});

			expect(handler).toHaveBeenCalledWith(undefined);
		});
	});

	describe("connection listeners", () => {
		it("should emit DISCONNECTED on reconnect_failed", () => {
			const handler = jest.fn();
			eventBus.on("connectionStatusChanged", handler);

			socket._triggerIo("reconnect_failed");

			expect(handler).toHaveBeenCalledWith(ConnectionStatus.DISCONNECTED);
		});

		it("should emit DISCONNECTED on reconnect_error", () => {
			const handler = jest.fn();
			eventBus.on("connectionStatusChanged", handler);

			socket._triggerIo("reconnect_error");

			expect(handler).toHaveBeenCalledWith(ConnectionStatus.DISCONNECTED);
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
