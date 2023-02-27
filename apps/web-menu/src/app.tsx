import * as React from "react";

import { useAuth0 } from "@auth0/auth0-react";
import ReactModal from "react-modal";

import { Auth0User } from "@creature-chess/auth-web";
import { SanitizedUser } from "@creature-chess/models";
import {
	MenuPage,
	MenuPageContextProvider,
	RegistrationPage,
	LoginPage,
	useGlobalStyles,
} from "@creature-chess/ui";

import { getCurrentUser } from "./getUser";
import { patchUser } from "./patchUser";

const UnauthenticatedRootPage: React.FunctionComponent = () => {
	const { loginWithRedirect, isLoading } = useAuth0();

	return <LoginPage isLoading={isLoading} onSignInClick={loginWithRedirect} />;
};

function useUser() {
	const { getAccessTokenSilently } = useAuth0<Auth0User>();

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
	}, [shouldRefresh]);

	return { user: currentUser, isFetching, error, refresh };
}

const AuthenticatedRootPage: React.FunctionComponent = () => {
	const { logout, getAccessTokenSilently, getIdTokenClaims } =
		useAuth0<Auth0User>();

	const { user, refresh } = useUser();

	if (!user) {
		return <span>an error occured</span>;
	}

	// todo move the contexts out of here

	if (!user.registered) {
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

	const onLogoutClick = () => logout();
	const onFindGameClick = () => {
		window.location.href = process.env.GAME_SERVER_URL!;
	};

	const menuPageContext = {
		findGame: onFindGameClick,
		auth: {
			logout: onLogoutClick,
		},
	};

	return (
		<MenuPageContextProvider value={menuPageContext}>
			<MenuPage />
		</MenuPageContextProvider>
	);
};

ReactModal.setAppElement("#approot");

const App: React.FunctionComponent = () => {
	const { isAuthenticated, isLoading } = useAuth0();

	useGlobalStyles();

	if (isLoading) {
		return <span>Loading</span>;
	}

	if (isAuthenticated) {
		return <AuthenticatedRootPage />;
	}

	return <UnauthenticatedRootPage />;
};

export { App };
