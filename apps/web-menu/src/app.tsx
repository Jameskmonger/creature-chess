import * as React from "react";
import ReactModal from "react-modal";
import { useAuth0 } from "@auth0/auth0-react";
import { Auth0User, isRegistered } from "@creature-chess/auth-web";
import { MenuPage, MenuPageContextProvider, RegistrationPage, LoginPage, useGlobalStyles } from "@creature-chess/ui";
import { patchUser } from "./patchUser";

const UnauthenticatedRootPage: React.FunctionComponent = () => {
	const { loginWithRedirect, isLoading } = useAuth0();

	return <LoginPage isLoading={isLoading} onSignInClick={loginWithRedirect} />;
};

const AuthenticatedRootPage: React.FunctionComponent = () => {
	const { user, logout, getAccessTokenSilently, getIdTokenClaims } = useAuth0<Auth0User>();

	// todo move the contexts out of here

	if (!isRegistered(user)) {
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
