import * as React from "react";

import { createRoot } from "react-dom/client";

import { AUTH0_ENABLED } from "@cc-web/auth/auth0/config";
import { LocalPlayerContextProvider } from "@cc-web/auth/context";

import { App } from "./app";

const Auth0AppRoot = ({ children }: { children: React.ReactNode }) => {
	const onRedirectCallback = React.useCallback((appState: any) => {
		window.location.href = appState?.returnTo || window.location.pathname;
	}, []);

	const Auth0AuthProvider = React.useMemo(
		// eslint-disable-next-line @typescript-eslint/no-var-requires
		() => require("@cc-web/auth/auth0/provider").Auth0AuthProvider,
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

const container = document.getElementById("approot");
const root = createRoot(container!);

root.render(<AppRoot />);
