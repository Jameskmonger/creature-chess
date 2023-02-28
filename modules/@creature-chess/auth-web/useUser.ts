import React from "react";

import { useAuth0 } from "@auth0/auth0-react";

import { SanitizedUser } from "@creature-chess/models";

import { getCurrentUser } from "./getCurrentUser";
import { Auth0User } from "./types";

/**
 * Calls the current user endpoint and returns the user
 *
 * Allows you to refresh the user by calling the refresh function,
 * will also refresh if the auth0 user changes
 *
 * @returns
 * - user: the current user
 * - isFetching: whether the user is currently being fetched
 * - error: any error that occurred
 * - refresh: a function to refresh the user
 */
export function useUser() {
	const { user: auth0User, getAccessTokenSilently } = useAuth0<Auth0User>();

	const [currentUser, setCurrentUser] = React.useState<SanitizedUser | null>(
		null
	);
	const [isFetching, setIsFetching] = React.useState(false);
	const [error, setError] = React.useState<string | null>(null);

	const [shouldRefresh, setShouldRefresh] = React.useState(true);

	const refresh = React.useCallback(() => {
		setShouldRefresh(true);
	}, []);

	React.useEffect(() => {
		const getUser = async () => {
			if (!auth0User) {
				return;
			}

			if (currentUser && !shouldRefresh) {
				return;
			}

			if (isFetching) {
				return;
			}

			setIsFetching(true);
			const token = await getAccessTokenSilently();
			const response = await getCurrentUser(token);
			setIsFetching(false);
			setShouldRefresh(false);

			if (response.status !== 200) {
				const { message } = await response.json();

				setError(message);
				return;
			}

			const user = await response.json();
			setCurrentUser(user);
		};

		getUser();
	}, [
		auth0User,
		currentUser,
		getAccessTokenSilently,
		isFetching,
		shouldRefresh,
	]);

	return { user: currentUser, isFetching, error, refresh };
}
