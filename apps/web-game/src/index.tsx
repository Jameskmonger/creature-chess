import * as React from "react";

import * as Sentry from "@sentry/react";
import { Integrations } from "@sentry/tracing";
import "pepjs";
import * as ReactDOM from "react-dom";
import { Provider as ReduxProvider } from "react-redux";

import { Auth0ContextProvider, AuthProvider } from "@creature-chess/auth-web";

import { App } from "./app";
import { createAppStore } from "./store";

if (process.env.SENTRY_DSN) {
	Sentry.init({
		dsn: process.env.SENTRY_DSN,
		environment:
			process.env.NODE_ENV === "development" ? "development" : "production",
		integrations: [new Integrations.BrowserTracing()],

		// Set tracesSampleRate to 1.0 to capture 100%
		// of transactions for performance monitoring.
		// We recommend adjusting this value in production
		tracesSampleRate: 1.0,
	});
}

const AppRoot: React.FunctionComponent = () => {
	const onRedirectCallback = (appState: any) => {
		window.location.href = appState?.returnTo || window.location.pathname;
	};

	const store = createAppStore();

	return (
		<AuthProvider onRedirectCallback={onRedirectCallback}>
			<Auth0ContextProvider>
				<ReduxProvider store={store}>
					<App />
				</ReduxProvider>
			</Auth0ContextProvider>
		</AuthProvider>
	);
};

ReactDOM.render(<AppRoot />, document.getElementById("approot"));
