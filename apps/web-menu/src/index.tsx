import * as React from "react";

import { LocalPlayerContextProvider } from "modules/@creature-chess/auth-web/context";
import * as ReactDOM from "react-dom";

import { AUTH0_ENABLED } from "@creature-chess/auth-web/auth0/config";

import { App } from "./app";

const Auth0AppRoot = ({ children }: { children: React.ReactNode }) => {
	const onRedirectCallback = React.useCallback((appState: any) => {
		window.location.href = appState?.returnTo || window.location.pathname;
	}, []);

	const Auth0AuthProvider = React.useMemo(
		// eslint-disable-next-line @typescript-eslint/no-var-requires
		() => require("@creature-chess/auth-web/auth0/provider").Auth0AuthProvider,
		[]
	);

	return (
		<Auth0AuthProvider onRedirectCallback={onRedirectCallback}>
			{children}
		</Auth0AuthProvider>
	);
};

const AppRoot: React.FunctionComponent = () => {
	if (AUTH0_ENABLED) {
		return (
			<Auth0AppRoot>
				<App />
			</Auth0AppRoot>
		);
	}

	return (
		<LocalPlayerContextProvider value={null}>
			<App />
		</LocalPlayerContextProvider>
	);
};

ReactDOM.render(<AppRoot />, document.getElementById("approot"));
