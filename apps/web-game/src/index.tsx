import * as React from "react";

import "pepjs";
import { createRoot } from "react-dom/client";
import { Provider as ReduxProvider } from "react-redux";

import { App } from "../src/app";
import { createAppStore } from "./store";

const AppRoot = () => {
	const store = createAppStore();

	return (
		<ReduxProvider store={store}>
			<App />
		</ReduxProvider>
	);
};

const container = document.getElementById("approot");
const root = createRoot(container!);

root.render(<AppRoot />);
