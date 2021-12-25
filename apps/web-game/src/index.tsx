import * as React from "react";
import * as ReactDOM from "react-dom";
import { Provider as ReduxProvider } from "react-redux";
import * as Sentry from "@sentry/react";
import { Integrations } from "@sentry/tracing";
import { AuthProvider } from "@creature-chess/auth-web";

import "pepjs";
import "./display/style/index.scss";
import "@shoki/board-react/style.css";

import { createAppStore } from "./store";
import { App } from "./app";

if (process.env.SENTRY_DSN) {
	Sentry.init({
		dsn: process.env.SENTRY_DSN,
		environment: process.env.NODE_ENV === "development" ? "development" : "production",
		integrations: [new Integrations.BrowserTracing()],

		// Set tracesSampleRate to 1.0 to capture 100%
		// of transactions for performance monitoring.
		// We recommend adjusting this value in production
		tracesSampleRate: 1.0,
	});
}

const AppRoot: React.FunctionComponent = () => {
	const onRedirectCallback = (appState: any) => {
		window.location.href = (appState?.returnTo || window.location.pathname);
	};

	const store = createAppStore();

	return (
		<AuthProvider onRedirectCallback={onRedirectCallback}>
			<ReduxProvider store={store}>
				<App />
			</ReduxProvider>
		</AuthProvider >
	);
};

ReactDOM.render(<AppRoot />, document.getElementById("approot"));
