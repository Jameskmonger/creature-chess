import * as React from "react";

import "pepjs";
import { createRoot } from "react-dom/client";
import { Provider as ReduxProvider } from "react-redux";

import { App } from "../src/app";
import { AUTH0_ENABLED } from "./auth/auth0/config";
import { Auth0AuthProvider } from "./auth/auth0/provider";
import { GuestAuthProvider, useGuestMode } from "./auth/guest";
import { createAppStore } from "./store";

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
			<Auth0AuthProvider>
				<ReduxProvider store={store}>
					<App />
				</ReduxProvider>
			</Auth0AuthProvider>
		);
	}

	return <span>error: no suitable auth provider</span>;
};

const container = document.getElementById("approot");
const root = createRoot(container!);

root.render(<AppRoot />);
