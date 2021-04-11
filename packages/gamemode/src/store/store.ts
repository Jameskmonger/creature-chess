import { createStore } from "redux";
import { reducer } from "./reducer";

export const createGameStore = () => {
    const store = createStore(reducer);

    return store;
};
