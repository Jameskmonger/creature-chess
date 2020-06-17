import * as React from "react";
import * as ReactDOM from "react-dom";

import "pepjs";
import "./display/style/index.scss";

import { Provider as ReduxProvider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { store } from "./store/store";
import { App } from "./app";

ReactDOM.render(
    <ReduxProvider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </ReduxProvider>,
    document.getElementById("approot")
);
