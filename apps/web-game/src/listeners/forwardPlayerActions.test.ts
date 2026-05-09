import {
	configureStore,
	createListenerMiddleware,
	createSlice,
} from "@reduxjs/toolkit";

import { PlayerActions } from "@creature-chess/gamemode";

import { setupForwardPlayerActions } from "./forwardPlayerActions";

const sendPlayerAction = jest.fn();

jest.mock("~/networking/connectionRef", () => ({
	getGameConnectionRef: () => ({
		sendPlayerAction: (action: any) => sendPlayerAction(action),
	}),
}));

const noopSlice = createSlice({
	name: "noop",
	initialState: 0,
	reducers: {
		other: (s) => s,
	},
});

const buildStore = () => {
	const middleware = createListenerMiddleware();
	const store = configureStore({
		reducer: { noop: noopSlice.reducer },
		middleware: (getDefaultMiddleware) =>
			getDefaultMiddleware().prepend(middleware.middleware),
	});
	setupForwardPlayerActions(middleware.startListening as any);
	return store;
};

describe("forwardPlayerActions", () => {
	beforeEach(() => {
		sendPlayerAction.mockClear();
	});

	it("forwards dispatched PlayerAction to the connection", async () => {
		const store = buildStore();

		const action = PlayerActions.buyCardPlayerAction({ index: 2 });
		store.dispatch(action);

		await Promise.resolve();

		expect(sendPlayerAction).toHaveBeenCalledTimes(1);
		expect(sendPlayerAction).toHaveBeenCalledWith(action);
	});

	it("forwards drop and swap actions", async () => {
		const store = buildStore();

		const drop = PlayerActions.dropPiecePlayerAction({
			pieceId: "p1",
			to: { type: "board", location: 0 as any },
		});
		const swap = PlayerActions.swapPiecePlayerAction({
			pieceAId: "p1",
			pieceBId: "p2",
		});

		store.dispatch(drop);
		store.dispatch(swap);

		await Promise.resolve();

		expect(sendPlayerAction).toHaveBeenCalledWith(drop);
		expect(sendPlayerAction).toHaveBeenCalledWith(swap);
	});

	it("does not forward unrelated actions", async () => {
		const store = buildStore();

		store.dispatch(noopSlice.actions.other());
		store.dispatch({ type: "ui/clearSelectedPiece" });
		store.dispatch({ type: "settings/setSettingsCommand", payload: {} });

		await Promise.resolve();

		expect(sendPlayerAction).not.toHaveBeenCalled();
	});
});
