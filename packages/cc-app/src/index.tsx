import * as React from "react";
import * as ReactDOM from "react-dom";
import { Provider as ReduxProvider } from "react-redux";
import { BrowserRouter, useHistory } from "react-router-dom";
import { Auth0Provider, useAuth0 } from "@auth0/auth0-react";
import * as Sentry from "@sentry/react";
import { Integrations } from "@sentry/tracing";

import "pepjs";
import "./display/style/index.scss";
import "@shoki/board-react/style.css";

import { createAppStore } from "./store/store";
import { App } from "./app";
import { auth0Config } from "./auth/config";

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
	const history = useHistory();

	const onRedirectCallback = (appState) => {
		// Use the router's history module to replace the url
		history.replace(appState?.returnTo || window.location.pathname);
	};

	return (
		<Auth0Provider
			domain={auth0Config.domain}
			clientId={auth0Config.clientID}
			redirectUri={auth0Config.redirectUri}
			audience={auth0Config.audience}
			scope={auth0Config.scope}
			onRedirectCallback={onRedirectCallback}
		>
			<Auth0ProviderChild />
		</Auth0Provider >
	);
};

const Auth0ProviderChild: React.FunctionComponent = () => {
	// https://github.com/auth0/auth0-react/pull/134#issuecomment-717834548
	const { getAccessTokenSilently, loginWithRedirect } = useAuth0();
	const store = createAppStore(getAccessTokenSilently, loginWithRedirect);

	return (
		<ReduxProvider store={store}>
			<App />
		</ReduxProvider>
	);
};

ReactDOM.render(
	<BrowserRouter>
		<BrowserRouterChild />
	</BrowserRouter>,
	document.getElementById("approot")
);
