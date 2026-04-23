/* eslint-disable no-underscore-dangle, @typescript-eslint/ban-types */
import { GameConnection } from "./GameConnection";
import { LobbyConnection } from "./LobbyConnection";
import { SocketManager } from "./SocketManager";
import { setLobbyConnectionRef, setGameConnectionRef } from "./connectionRef";

jest.mock("~/store/menu/state", () => ({
	MenuCommands: {
		setLoadingMessage: (msg: string) => ({
			type: "menu/setLoadingMessage",
			payload: msg,
		}),
	},
}));
jest.mock("~/listeners/gameListeners", () => ({
	gameStartedAction: () => ({ type: "gameStarted" }),
}));
jest.mock("./connectionRef", () => ({
	setLobbyConnectionRef: jest.fn(),
	setGameConnectionRef: jest.fn(),
}));
jest.mock("./LobbyConnection", () => ({
	LobbyConnection: jest.fn().mockImplementation(() => ({
		handleConnected: jest.fn(),
		destroy: jest.fn(),
	})),
}));
jest.mock("./GameConnection", () => ({
	GameConnection: jest.fn().mockImplementation(() => ({
		handleConnected: jest.fn(),
		destroy: jest.fn(),
	})),
}));

const mockIo = jest.fn();
jest.mock("socket.io-client", () => ({
	io: (...args: any[]) => mockIo(...args),
}));

const createMockSocket = () => {
	const handlers = new Map<string, Function>();
	return {
		on: jest.fn((event: string, handler: Function) => {
			handlers.set(event, handler);
		}),
		off: jest.fn(),
		emit: jest.fn(),
		disconnect: jest.fn(),
		io: { on: jest.fn(), off: jest.fn() },
		_trigger: (event: string, ...args: any[]) => {
			handlers.get(event)?.(...args);
		},
	};
};

async function connectManager(
	manager: SocketManager,
	mockSocket: ReturnType<typeof createMockSocket>
) {
	const connectPromise = manager.connect();

	// Yield to let fetch resolve and connectSocket set up listeners
	await flushMicrotasks();

	mockSocket._trigger("connect");
	mockSocket._trigger("authenticate_response", { error: null });

	await connectPromise;
}

function flushMicrotasks() {
	return new Promise<void>((resolve) => setTimeout(resolve, 0));
}

describe("SocketManager", () => {
	let dispatch: jest.Mock;
	let boardSlices: any;
	let manager: SocketManager;
	let mockSocket: ReturnType<typeof createMockSocket>;

	beforeEach(() => {
		dispatch = jest.fn();
		boardSlices = { board: {}, bench: {}, matchBoard: {}, pieceRegistry: {} };
		manager = new SocketManager(dispatch, boardSlices);
		mockSocket = createMockSocket();

		global.fetch = jest.fn().mockResolvedValue({
			ok: true,
			json: () =>
				Promise.resolve({ id: "session-123", token: "guest-token-value" }),
		}) as any;
		(globalThis as any).APP_API_URL = "http://localhost";

		mockIo.mockReturnValue(mockSocket);
	});

	afterEach(() => {
		manager.disconnect();
		jest.restoreAllMocks();
	});

	describe("connect", () => {
		it("should dispatch loading message", async () => {
			await connectManager(manager, mockSocket);

			expect(dispatch).toHaveBeenCalledWith(
				expect.objectContaining({ payload: "Connecting..." })
			);
		});

		it("should show error when guest session fails", async () => {
			(global.fetch as jest.Mock).mockResolvedValue({ ok: false });

			await manager.connect();

			expect(dispatch).toHaveBeenCalledWith(
				expect.objectContaining({ payload: "ERROR: Failed to open session!" })
			);
		});

		it("should authenticate with socket after connection", async () => {
			await connectManager(manager, mockSocket);

			expect(mockSocket.emit).toHaveBeenCalledWith("authenticate", {
				type: "guest",
				data: { accessToken: "guest-token-value" },
			});
		});

		it("should listen for lobby and game connections after auth", async () => {
			await connectManager(manager, mockSocket);

			expect(mockSocket.on).toHaveBeenCalledWith(
				"connected",
				expect.any(Function)
			);
			expect(mockSocket.on).toHaveBeenCalledWith(
				"gameConnected",
				expect.any(Function)
			);
		});
	});

	describe("lobby connection", () => {
		it("should create LobbyConnection on 'connected' event", async () => {
			await connectManager(manager, mockSocket);

			mockSocket._trigger("connected", { players: [] });

			expect(LobbyConnection).toHaveBeenCalled();
			expect(setLobbyConnectionRef).toHaveBeenCalledWith(expect.any(Object));
		});
	});

	describe("game connection", () => {
		it("should create GameConnection on 'gameConnected' event", async () => {
			await connectManager(manager, mockSocket);

			mockSocket._trigger("gameConnected", {
				players: [],
				game: { phase: 1, phaseStartedAtSeconds: 0 },
				settings: {},
			});

			expect(GameConnection).toHaveBeenCalled();
			expect(setGameConnectionRef).toHaveBeenCalledWith(expect.any(Object));
		});

		it("should dispatch gameStartedAction on game connection", async () => {
			await connectManager(manager, mockSocket);

			mockSocket._trigger("gameConnected", {
				players: [],
				game: { phase: 1, phaseStartedAtSeconds: 0 },
				settings: {},
			});

			expect(dispatch).toHaveBeenCalledWith({ type: "gameStarted" });
		});

		it("should destroy lobby connection when game starts", async () => {
			await connectManager(manager, mockSocket);

			mockSocket._trigger("connected", { players: [] });
			const lobbyInstance = (LobbyConnection as jest.Mock).mock.results[0]
				.value;

			mockSocket._trigger("gameConnected", {
				players: [],
				game: { phase: 1, phaseStartedAtSeconds: 0 },
				settings: {},
			});

			expect(lobbyInstance.destroy).toHaveBeenCalled();
			expect(setLobbyConnectionRef).toHaveBeenCalledWith(null);
		});
	});

	describe("disconnect", () => {
		it("should disconnect the socket", async () => {
			await connectManager(manager, mockSocket);

			manager.disconnect();

			expect(mockSocket.disconnect).toHaveBeenCalled();
		});

		it("should clean up connection listeners", async () => {
			await connectManager(manager, mockSocket);

			manager.disconnect();

			expect(mockSocket.off).toHaveBeenCalledWith(
				"connected",
				expect.any(Function)
			);
			expect(mockSocket.off).toHaveBeenCalledWith(
				"gameConnected",
				expect.any(Function)
			);
		});

		it("should destroy active game connection", async () => {
			await connectManager(manager, mockSocket);

			mockSocket._trigger("gameConnected", {
				players: [],
				game: { phase: 1, phaseStartedAtSeconds: 0 },
				settings: {},
			});
			const gameInstance = (GameConnection as jest.Mock).mock.results[0].value;

			manager.disconnect();

			expect(gameInstance.destroy).toHaveBeenCalled();
			expect(setGameConnectionRef).toHaveBeenCalledWith(null);
		});
	});
});
