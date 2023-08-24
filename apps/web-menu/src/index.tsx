import * as React from "react";

import * as ReactDOM from "react-dom";

import { AuthProvider } from "@creature-chess/auth-web";

import { App } from "./app";

const AppRoot: React.FunctionComponent = () => {
	const onRedirectCallback = (appState: any) => {
		window.location.href = appState?.returnTo || window.location.pathname;
	};

	return (
		<AuthProvider onRedirectCallback={onRedirectCallback}>
			<App />
		</AuthProvider>
	);
};

ReactDOM.render(<AppRoot />, document.getElementById("approot"));
