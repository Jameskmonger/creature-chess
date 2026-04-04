import { LobbyConnection } from "./LobbyConnection";

const createMockSocket = () => {
	const handlers = new Map<string, Function>();
	return {
		on: jest.fn((event: string, handler: Function) => { handlers.set(event, handler); }),
		off: jest.fn((event: string) => { handlers.delete(event); }),
		emit: jest.fn(),
		_trigger: (event: string, payload: any) => { handlers.get(event)?.(payload); },
	};
};

jest.mock("~/store/lobby/state", () => ({
	LobbyCommands: {
		connectToLobby: (p: any) => ({ type: "lobby/connectToLobby", payload: p }),
		updatePlayers: (p: any) => ({ type: "lobby/updatePlayers", payload: p }),
		updateSettings: (p: any) => ({ type: "lobby/updateSettings", payload: p }),
	},
}));

describe("LobbyConnection", () => {
	let socket: ReturnType<typeof createMockSocket>;
	let dispatch: jest.Mock;
	let conn: LobbyConnection;

	beforeEach(() => {
		socket = createMockSocket();
		dispatch = jest.fn();
		conn = new LobbyConnection(socket as any, dispatch);
	});

	afterEach(() => {
		conn.destroy();
	});

	it("should register socket listeners on construction", () => {
		expect(socket.on).toHaveBeenCalledWith("lobbyUpdate", expect.any(Function));
		expect(socket.on).toHaveBeenCalledWith("settingsUpdate", expect.any(Function));
	});

	describe("handleConnected", () => {
		it("should dispatch connectToLobby with the payload", () => {
			const payload = { players: [{ id: "p1", name: "Alice" }] };
			conn.handleConnected(payload as any);

			expect(dispatch).toHaveBeenCalledWith({
				type: "lobby/connectToLobby",
				payload,
			});
		});
	});

	describe("incoming events", () => {
		it("should dispatch updatePlayers on lobbyUpdate", () => {
			const payload = { players: [{ id: "p1" }] };
			socket._trigger("lobbyUpdate", payload);

			expect(dispatch).toHaveBeenCalledWith({
				type: "lobby/updatePlayers",
				payload,
			});
		});

		it("should dispatch updateSettings on settingsUpdate", () => {
			const payload = { settings: { maxPlayers: 8 } };
			socket._trigger("settingsUpdate", payload);

			expect(dispatch).toHaveBeenCalledWith({
				type: "lobby/updateSettings",
				payload,
			});
		});
	});

	describe("outgoing messages", () => {
		it("sendStartNow should emit startNow", () => {
			conn.sendStartNow();
			expect(socket.emit).toHaveBeenCalledWith("startNow", { empty: true });
		});

		it("sendUpdateSetting should emit updateSetting", () => {
			conn.sendUpdateSetting("maxPlayers", "4");
			expect(socket.emit).toHaveBeenCalledWith("updateSetting", { key: "maxPlayers", value: "4" });
		});
	});

	describe("destroy", () => {
		it("should remove all socket listeners", () => {
			conn.destroy();

			expect(socket.off).toHaveBeenCalledWith("lobbyUpdate", expect.any(Function));
			expect(socket.off).toHaveBeenCalledWith("settingsUpdate", expect.any(Function));
		});

		it("should not dispatch after destroy", () => {
			conn.destroy();
			dispatch.mockClear();

			socket._trigger("lobbyUpdate", { players: [] });
			expect(socket.off).toHaveBeenCalled();
		});
	});
});
