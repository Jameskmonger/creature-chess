import { createStore, combineReducers, applyMiddleware } from "redux";
import { reducers } from "./reducers";
import { composeWithDevTools } from "redux-devtools-extension";
import createSagaMiddleware from "redux-saga";
import { AppState } from "./state";
import { rootSaga } from "./saga";

export const createAppStore = (getAccessTokenSilently: () => Promise<string>, loginWithRedirect: () => Promise<void>) => {
    const sagaMiddleware = createSagaMiddleware();

    const store = createStore(
        combineReducers<AppState>({
            ...reducers
        }),
        composeWithDevTools(
            applyMiddleware(sagaMiddleware)
        )
    );

    sagaMiddleware.run(rootSaga, getAccessTokenSilently, loginWithRedirect);

    return store;
};
