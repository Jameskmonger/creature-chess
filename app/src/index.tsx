import * as React from "react";
import * as ReactDOM from "react-dom";
import { Game } from "./components/game";

import "./style/index.scss";
import { Provider } from "react-redux";
import { store } from "./store/store";

ReactDOM.render(
    <Provider store={store}>
        <Game />
    </Provider>,
    document.getElementById("approot")
);
