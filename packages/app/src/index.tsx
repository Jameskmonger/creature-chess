import * as React from "react";
import * as ReactDOM from "react-dom";
import { Auth0Provider, useAuth0 } from "@auth0/auth0-react";

import "pepjs";
import "./ui/display/style/index.scss";

import { Provider as ReduxProvider } from "react-redux";
import { BrowserRouter, useHistory } from "react-router-dom";
import { createAppStore } from "./store/store";
import { App } from "./app";
import { auth0Config } from "./menu/auth/config";

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
            audience={"https://creaturechess.eu.auth0.com/api/v2/"}
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
