import {
	setLobbyConnectionRef,
	setGameConnectionRef,
	getGameConnectionRef,
} from "./connectionRef";

jest.mock("react", () => ({
	useSyncExternalStore: jest.fn(),
}));

describe("connectionRef", () => {
	afterEach(() => {
		setLobbyConnectionRef(null);
		setGameConnectionRef(null);
	});

	describe("getGameConnectionRef", () => {
		it("should return null initially", () => {
			expect(getGameConnectionRef()).toBeNull();
		});

		it("should return the set connection", () => {
			const mockConn = { sendFinishMatch: jest.fn() } as any;
			setGameConnectionRef(mockConn);

			expect(getGameConnectionRef()).toBe(mockConn);
		});

		it("should return null after clearing", () => {
			setGameConnectionRef({ sendFinishMatch: jest.fn() } as any);
			setGameConnectionRef(null);

			expect(getGameConnectionRef()).toBeNull();
		});
	});

	describe("notifications", () => {
		it("should notify listeners when lobby connection changes", () => {
			const { useSyncExternalStore } = require("react");

			let subscribeFn: (cb: () => void) => () => void;
			useSyncExternalStore.mockImplementation((sub: any) => {
				subscribeFn = sub;
				return null;
			});

			const { useLobbyConnection } = require("./connectionRef");
			useLobbyConnection();

			const listener = jest.fn();
			const unsub = subscribeFn!((listener));

			setLobbyConnectionRef({ destroy: jest.fn() } as any);
			expect(listener).toHaveBeenCalledTimes(1);

			unsub();
			setLobbyConnectionRef(null);
			expect(listener).toHaveBeenCalledTimes(1);
		});

		it("should notify listeners when game connection changes", () => {
			const { useSyncExternalStore } = require("react");

			let subscribeFn: (cb: () => void) => () => void;
			useSyncExternalStore.mockImplementation((sub: any) => {
				subscribeFn = sub;
				return null;
			});

			const { useGameConnectionRef } = require("./connectionRef");
			useGameConnectionRef();

			const listener = jest.fn();
			const unsub = subscribeFn!((listener));

			setGameConnectionRef({ sendFinishMatch: jest.fn() } as any);
			expect(listener).toHaveBeenCalledTimes(1);

			unsub();
			setGameConnectionRef(null);
			expect(listener).toHaveBeenCalledTimes(1);
		});
	});
});
