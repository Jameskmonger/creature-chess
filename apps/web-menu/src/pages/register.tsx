import React from "react";

import { AUTH0_ENABLED } from "@creature-chess/auth-web/auth0/config";
import { RegistrationPage } from "@creature-chess/ui";

import { patchUser } from "../patchUser";

// eslint-disable-next-line @typescript-eslint/no-var-requires
const useAuth0 = AUTH0_ENABLED ? require("@auth0/auth0-react").useAuth0 : null;

export function MenuRegistrationPage() {
	if (!useAuth0) {
		return <span>an error occured, please clear cache and try again</span>;
	}

	// eslint-disable-next-line react-hooks/rules-of-hooks
	const { getAccessTokenSilently, getIdTokenClaims, refresh } = useAuth0();

	const updateUser = async (nickname: string, image: number) => {
		const token = await getAccessTokenSilently();
		const response = await patchUser(token, nickname, image);

		if (response.status === 400) {
			const { error } = await response.json();

			return { error };
		}

		if (response.status === 200) {
			await getAccessTokenSilently({ ignoreCache: true });
			await getIdTokenClaims();

			refresh();
			return { error: null };
		}

		return { error: "An unknown error occured" };
	};

	return <RegistrationPage updateUser={updateUser} />;
}
