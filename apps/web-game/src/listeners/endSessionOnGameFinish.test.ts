import { GameEvents } from "@creature-chess/models";
import {
	configureStore,
	createListenerMiddleware,
	createSlice,
} from "@reduxjs/toolkit";
import { GameSessionHolder } from "~/game/GameSessionHolder";
import { GameConnection } from "~/networking/GameConnection";
import { LobbyConnection } from "~/networking/LobbyConnection";
import { SocketManager } from "~/networking/SocketManager";
import { ClientExtra, ClientStartListening } from "~/store/listenerContext";
import { Holder } from "~/utils/Holder";

import { setupEndSessionOnGameFinishListener } from "./endSessionOnGameFinish";

const noopSlice = createSlice({
	name: "noop",
	initialState: 0,
	reducers: {},
});

const buildStore = () => {
	const endSession = jest.fn();
	const socketManagerHolder = new Holder<SocketManager>("SocketManager");
	socketManagerHolder.set({ endSession } as unknown as SocketManager);

	const extra: ClientExtra = {
		sessionHolder: new GameSessionHolder(),
		gameConnectionHolder: new Holder<GameConnection>("GameConnection"),
		lobbyConnectionHolder: new Holder<LobbyConnection>("LobbyConnection"),
		accountIdHolder: new Holder<string>("AccountId"),
		socketManagerHolder,
	};

	const middleware = createListenerMiddleware({ extra });
	setupEndSessionOnGameFinishListener(
		middleware.startListening as ClientStartListening
	);

	const store = configureStore({
		reducer: { noop: noopSlice.reducer },
		middleware: (getDefaultMiddleware) =>
			getDefaultMiddleware().prepend(middleware.middleware),
	});

	return { store, endSession };
};

describe("end session on game finish", () => {
	it("ends the socket session when the game finishes", async () => {
		const { store, endSession } = buildStore();

		store.dispatch(GameEvents.gameFinishEvent({ players: [] }));
		await Promise.resolve();

		expect(endSession).toHaveBeenCalledTimes(1);
	});

	it("does nothing when no socket manager is set", async () => {
		const { store, endSession } = buildStore();
		// dispatching an unrelated action shouldn't tear down the session
		store.dispatch({ type: "noop/other" });
		await Promise.resolve();

		expect(endSession).not.toHaveBeenCalled();
	});
});
