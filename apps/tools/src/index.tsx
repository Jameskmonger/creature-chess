import React from "react";

import ReactDOM from "react-dom";
import { Provider } from "react-redux";

import { DevTools } from "./DevTools";
import { store } from "./store/store";

ReactDOM.render(
	<Provider store={store}>
		<DevTools />
	</Provider>,
	document.getElementById("root")
);
