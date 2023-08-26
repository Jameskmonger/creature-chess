import * as React from "react";

import { AUTH0_ENABLED } from "@cc-web/auth/auth0/config";
import { GuestAuthProvider } from "@cc-web/auth/guest/provider";
import "pepjs";
import * as ReactDOM from "react-dom";
import { Provider as ReduxProvider } from "react-redux";

import { App } from "./app";
import { useGuestMode } from "./guest";
import { createAppStore } from "./store";

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

const AppRoot = () => {
	const store = createAppStore();
	const guestMode = useGuestMode();

	if (guestMode) {
		return (
			<GuestAuthProvider>
				<ReduxProvider store={store}>
					<App />
				</ReduxProvider>
			</GuestAuthProvider>
		);
	}

	if (AUTH0_ENABLED) {
		return (
			<Auth0AppRoot>
				<ReduxProvider store={store}>
					<App />
				</ReduxProvider>
			</Auth0AppRoot>
		);
	}

	return <span>error: no suitable auth provider</span>;
};

ReactDOM.render(<AppRoot />, document.getElementById("approot"));
