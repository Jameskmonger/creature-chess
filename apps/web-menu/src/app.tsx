import * as React from "react";
import ReactModal from "react-modal";
import { Route, Routes } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { Auth0User, isRegistered } from "@creature-chess/auth-web";
import { MenuPage, MenuPageContextProvider, RegistrationPage, RegistrationPageContextProvider } from "@creature-chess/ui";
import { LoginPage } from "./auth";
import { Loading } from "./display/loading";
import { patchUser } from "./auth/utils/patchUser";

const UnauthenticatedRoutes: React.FunctionComponent = () => (
	<Routes>
		<Route path="/" element={<LoginPage />} />
	</Routes>
);

const AuthenticatedRootPage: React.FunctionComponent = () => {
	const { user, logout, getAccessTokenSilently, getIdTokenClaims } = useAuth0<Auth0User>();

	// todo move the contexts out of here

	if (!isRegistered(user)) {
		const registrationPageContext = {
			updateUser: async (nickname: string, image: number) => {
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
			}
		};

		return (
			<RegistrationPageContextProvider value={registrationPageContext}>
				<RegistrationPage />
			</RegistrationPageContextProvider>
		);
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

const AuthenticatedRoutes: React.FunctionComponent = () => (
	<Routes>
		<Route path="/" element={<AuthenticatedRootPage />} />
	</Routes>
);

ReactModal.setAppElement("#approot");

const App: React.FunctionComponent = () => {
	const { isAuthenticated, isLoading } = useAuth0();

	if (isLoading) {
		return <Loading />;
	}

	if (isAuthenticated) {
		return <AuthenticatedRoutes />;
	}

	return <UnauthenticatedRoutes />;
};

export { App };
