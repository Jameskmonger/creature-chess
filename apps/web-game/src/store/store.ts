import { createStore, combineReducers, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import createSagaMiddleware from "redux-saga";

import { createBoardSlice } from "@shoki/board";

import { PieceModel } from "@creature-chess/models";
import { GamemodeSettingsPresets } from "@creature-chess/models/settings";

import { createReducers } from "./reducers";
import { rootSaga } from "./saga";
import { SagaContext } from "./sagaContext";
import { AppState } from "./state";

const composeEnhancers = composeWithDevTools({
	trace: true,
	traceLimit: 20,
});

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

	const store = createStore(
		combineReducers<AppState>(createReducers(slices)),
		composeEnhancers(applyMiddleware(sagaMiddleware))
	);

	sagaMiddleware.run(rootSaga, slices);

	return store;
};
