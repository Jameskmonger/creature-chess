import React from "react";
import { Auth0Provider } from "@auth0/auth0-react";

import { auth0Config } from "./config";

type Props = {
	children: React.ReactNode;
	onRedirectCallback?: (appState: any) => void;
};

export const AuthProvider: React.FC<Props> = ({ children, onRedirectCallback }) => (
	<Auth0Provider
		domain={auth0Config.domain}
		clientId={auth0Config.clientID}
		redirectUri={auth0Config.redirectUri}
		audience={auth0Config.audience}
		scope={auth0Config.scope}
		onRedirectCallback={onRedirectCallback}
	>
		{children}
	</Auth0Provider>
);
