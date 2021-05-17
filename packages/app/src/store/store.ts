import { createStore, combineReducers, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
import { composeWithDevTools } from "redux-devtools-extension";
import { createBoardSlice } from "@creature-chess/board";
import { createReducers } from "./reducers";
import { AppState } from "./state";
import { rootSaga } from "./saga";
import { PieceModel } from "@creature-chess/models";

const composeEnhancers = composeWithDevTools({
	trace: true,
	traceLimit: 20
});

export const createAppStore = (getAccessTokenSilently: () => Promise<string>, loginWithRedirect: () => Promise<void>) => {
	const sagaMiddleware = createSagaMiddleware();

	const boardSlice = createBoardSlice<PieceModel>("local-board", { width: 7, height: 3 });
	const benchSlice = createBoardSlice<PieceModel>("local-bench", { width: 7, height: 1 });

	const store = createStore(
		combineReducers<AppState>(createReducers({ boardSlice, benchSlice })),
		composeEnhancers(
			applyMiddleware(sagaMiddleware)
		)
	);

	sagaMiddleware.run(rootSaga, getAccessTokenSilently, loginWithRedirect, { benchSlice, boardSlice });

	return store;
};
