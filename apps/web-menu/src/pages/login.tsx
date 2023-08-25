import React from "react";

import { AUTH0_ENABLED } from "@creature-chess/auth-web/auth0/config";
import { LoginPage } from "@creature-chess/ui";

// eslint-disable-next-line @typescript-eslint/no-var-requires
const useAuth0 = AUTH0_ENABLED ? require("@auth0/auth0-react").useAuth0 : null;

export const MenuLoginPage = () => {
	if (useAuth0) {
		// eslint-disable-next-line react-hooks/rules-of-hooks
		const { loginWithRedirect, isLoading } = useAuth0();

		return (
			<LoginPage
				auth0Enabled={true}
				isLoading={isLoading}
				onSignInClick={loginWithRedirect}
			/>
		);
	}

	return <LoginPage auth0Enabled={false} isLoading={false} />;
};
