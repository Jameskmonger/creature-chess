import { createStore, combineReducers, applyMiddleware } from "redux";
import { createReducers } from "./reducers";
import { composeWithDevTools } from "redux-devtools-extension";
import { createBoardSlice } from "@creature-chess/shared";
import createSagaMiddleware from "redux-saga";
import { AppState } from "./state";
import { rootSaga } from "./saga";

export const createAppStore = (getAccessTokenSilently: () => Promise<string>, loginWithRedirect: () => Promise<void>) => {
    const sagaMiddleware = createSagaMiddleware();

    const boardSlice = createBoardSlice(`local-board`, { width: 7, height: 3 });

    const store = createStore(
        combineReducers<AppState>(createReducers(boardSlice)),
        composeWithDevTools(
            applyMiddleware(sagaMiddleware)
        )
    );

    sagaMiddleware.run(rootSaga, getAccessTokenSilently, loginWithRedirect, boardSlice);

    return store;
};
