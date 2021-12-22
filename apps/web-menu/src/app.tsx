import * as React from "react";
import ReactModal from "react-modal";
import { Route, Routes } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { MenuPage } from "./menuPage";
import { Auth0User, isRegistered } from "@creature-chess/auth-web";
import { LoginPage, RegistrationPage } from "./auth";
import { Loading } from "./display/loading";

const UnauthenticatedRoutes: React.FunctionComponent = () => (
	<Routes>
		<Route path="/" element={<LoginPage />} />
	</Routes>
);

const AuthenticatedRootPage: React.FunctionComponent = () => {
	const { user } = useAuth0<Auth0User>();

	if (!isRegistered(user)) {
		return <RegistrationPage />;
	}

	return <MenuPage />;
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
