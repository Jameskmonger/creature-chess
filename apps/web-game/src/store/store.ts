import { createStore, combineReducers, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import createSagaMiddleware from "redux-saga";

import { createBoardSlice } from "@shoki/board";

import { PieceModel } from "@creature-chess/models";
import { DEFAULT_GAME_OPTIONS } from "@creature-chess/models/config";

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
		width: DEFAULT_GAME_OPTIONS.boardSize.width,
		height: DEFAULT_GAME_OPTIONS.boardSize.height / 2,
	});
	const benchSlice = createBoardSlice<PieceModel>("local-bench", {
		width: DEFAULT_GAME_OPTIONS.benchSize,
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

	const store = createStore(
		combineReducers<AppState>(createReducers({ boardSlice, benchSlice })),
		composeEnhancers(applyMiddleware(sagaMiddleware))
	);

	sagaMiddleware.run(rootSaga);

	return store;
};
