import * as React from "react";

import "pepjs";
import { createRoot } from "react-dom/client";
import { Provider as ReduxProvider } from "react-redux";

import { AUTH0_ENABLED } from "@cc-web/auth/auth0/config";
import { GuestAuthProvider } from "@cc-web/auth/guest/provider";

import { App } from "./app";
import { Auth0AppRoot } from "./auth/auth0";
import { useGuestMode } from "./guest";
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
			<Auth0AppRoot>
				<ReduxProvider store={store}>
					<App />
				</ReduxProvider>
			</Auth0AppRoot>
		);
	}

	return <span>error: no suitable auth provider</span>;
};

const container = document.getElementById("approot");
const root = createRoot(container!);

root.render(<AppRoot />);
