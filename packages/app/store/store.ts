import { createStore, combineReducers, applyMiddleware } from "redux";
import { reducers } from "./reducers";
import { composeWithDevTools } from "redux-devtools-extension";
import createSagaMiddleware from "redux-saga";
import { rootSaga } from "./sagas";
import { AppState } from "./state";

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
    combineReducers<AppState>({
        ...reducers
    }),
    composeWithDevTools(
        applyMiddleware(sagaMiddleware)
    )
);

sagaMiddleware.run(rootSaga);

export { store };
