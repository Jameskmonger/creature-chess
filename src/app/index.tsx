import * as React from "react";
import * as ReactDOM from "react-dom";
import { GameContainer } from "./components/game-container";

import "./style/index.scss";
import { Provider } from "react-redux";
import { store } from "./store/store";

ReactDOM.render(
    <Provider store={store}>
        <GameContainer />
    </Provider>,
    document.getElementById("approot")
);
