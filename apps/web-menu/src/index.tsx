import * as React from "react";
import * as ReactDOM from "react-dom";
import { BrowserRouter, useNavigate } from "react-router-dom";
import * as Sentry from "@sentry/react";
import { Integrations } from "@sentry/tracing";
import { AuthProvider } from "@creature-chess/auth-web";

import "pepjs";
import "./display/style/index.scss";
import "@shoki/board-react/style.css";

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

const BrowserRouterChild: React.FunctionComponent = () => {
	const navigate = useNavigate();

	const onRedirectCallback = (appState: any) => {
		// Use the router's history module to replace the url
		navigate(appState?.returnTo || window.location.pathname);
	};

	return (
		<AuthProvider onRedirectCallback={onRedirectCallback}>
			<App />
		</AuthProvider >
	);
};

ReactDOM.render(
	<BrowserRouter>
		<BrowserRouterChild />
	</BrowserRouter>,
	document.getElementById("approot")
);
