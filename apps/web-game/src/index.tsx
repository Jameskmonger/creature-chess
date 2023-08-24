import * as React from "react";

import "pepjs";
import * as ReactDOM from "react-dom";
import { Provider as ReduxProvider } from "react-redux";

import { AuthProvider } from "@creature-chess/auth-web";

import { App } from "./app";
import { createAppStore } from "./store";

const AppRoot: React.FunctionComponent = () => {
	const onRedirectCallback = (appState: any) => {
		window.location.href = appState?.returnTo || window.location.pathname;
	};

	const store = createAppStore();

	return (
		<AuthProvider onRedirectCallback={onRedirectCallback}>
			<ReduxProvider store={store}>
				<App />
			</ReduxProvider>
		</AuthProvider>
	);
};

ReactDOM.render(<AppRoot />, document.getElementById("approot"));
