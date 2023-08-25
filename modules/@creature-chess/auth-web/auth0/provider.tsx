import React from "react";

import { Auth0Provider } from "@auth0/auth0-react";

import { auth0Config } from "./config";
import { Auth0LocalUserProvider } from "./internal/localUserProvider";

type Props = {
	children: React.ReactNode;
	onRedirectCallback?: (appState: any) => void;
};

/**
 * Handles authentication with auth0 and loading of user data from the API
 *
 * This file should be conditionally imported based on whether or not auth0 is enabled
 */
export const Auth0AuthProvider: React.FC<Props> = ({
	children,
	onRedirectCallback,
}) => {
	const { domain, clientID, redirectUri } = auth0Config;

	if (!domain) {
		throw Error("no auth0 domain");
	}

	if (!clientID) {
		throw Error("no auth0 clientID");
	}

	if (!redirectUri) {
		throw Error("no auth0 redirectUri");
	}

	return (
		<Auth0Provider
			domain={domain}
			clientId={clientID}
			redirectUri={auth0Config.redirectUri}
			audience={auth0Config.audience}
			scope={auth0Config.scope}
			cacheLocation="localstorage"
			onRedirectCallback={onRedirectCallback}
			useRefreshTokens
		>
			<Auth0LocalUserProvider>{children}</Auth0LocalUserProvider>
		</Auth0Provider>
	);
};
