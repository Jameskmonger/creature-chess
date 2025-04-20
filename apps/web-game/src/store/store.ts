import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import { networkingSaga } from "~/networking";

import { createBoardSlice } from "@shoki/board";

import { PieceModel } from "@creature-chess/models";
import { GamemodeSettingsPresets } from "@creature-chess/models/settings";

import { createGameReducer } from "./game/state";
import { lobbyReducer } from "./lobby/state";
import { menuReducer } from "./menu/state";
import { SagaContext } from "./sagaContext";
import { AppState } from "./state";

export const createAppStore = () => {
	const boardSlice = createBoardSlice<PieceModel>("local-board", {
		width: GamemodeSettingsPresets["default"].boardWidth,
		height: GamemodeSettingsPresets["default"].boardHalfHeight,
	});
	const benchSlice = createBoardSlice<PieceModel>("local-bench", {
		width: GamemodeSettingsPresets["default"].benchSize,
		height: 1,
	});

	const sagaMiddleware = createSagaMiddleware<SagaContext>({
		context: {
			slices: {
				board: boardSlice,
				bench: benchSlice,
			},
		},
	});

	const slices = { boardSlice, benchSlice };

	const store = configureStore<AppState>({
		reducer: {
			lobby: lobbyReducer,
			game: createGameReducer(slices),
			menu: menuReducer,
		},
		middleware: (getDefaultMiddleware) =>
			getDefaultMiddleware({
				thunk: false,
				serializableCheck: false,
			}).concat(sagaMiddleware),
		devTools: {
			trace: true,
			traceLimit: 20,
		},
	});

	sagaMiddleware.run(networkingSaga, slices);

	return store;
};
