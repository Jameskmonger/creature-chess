import React from "react";

import { AUTH0_ENABLED } from "@cc-web/auth/auth0/config";
import { LoginPage } from "@cc-web/ui";

// eslint-disable-next-line @typescript-eslint/no-var-requires
const useAuth0 = AUTH0_ENABLED ? require("@auth0/auth0-react").useAuth0 : null;

export const MenuLoginPage = () => {
	const onPlayAsGuestClick = () => {
		window.location.href = process.env.GAME_SERVER_URL! + "?guest=true";
	};

	if (useAuth0) {
		// eslint-disable-next-line react-hooks/rules-of-hooks
		const { loginWithRedirect, isLoading } = useAuth0();

		return (
			<LoginPage
				onPlayAsGuestClick={onPlayAsGuestClick}
				auth0Enabled={true}
				isLoading={isLoading}
				onSignInClick={loginWithRedirect}
			/>
		);
	}

	return <LoginPage onPlayAsGuestClick={onPlayAsGuestClick} />;
};
