import * as React from "react";
import ReactModal from "react-modal";
import { Route } from "react-router-dom";
import { useSelector } from "react-redux";
import { useAuth0 } from "@auth0/auth0-react";
import { AppState } from "./store";
import { GamePage } from "./game";
import { LobbyPage } from "./lobby";
import { MenuPage } from "./menu";
import { Auth0User, isRegistered, LoginPage, RegistrationPage } from "./auth";
import { Loading } from "./display/loading";

const UnauthenticatedRoutes: React.FunctionComponent = () => (
	<Route exact path="/" component={LoginPage} />
);

enum GameState {
	MENU = 0,
	LOBBY = 1,
	GAME = 2
}

const gameStateSelector = (state: AppState) => {
	if (state.game.roundInfo.phase !== null) {
		return GameState.GAME;
	}

	if (state.lobby.lobbyId !== null) {
		return GameState.LOBBY;
	}

	return GameState.MENU;
};

const AuthenticatedRootPage: React.FunctionComponent = () => {
	const { user } = useAuth0<Auth0User>();
	const gameState = useSelector<AppState, GameState>(gameStateSelector);

	if (!isRegistered(user)) {
		return <RegistrationPage />;
	}

	if (gameState === GameState.GAME) {
		return <GamePage />;
	}

	if (gameState === GameState.LOBBY) {
		return <LobbyPage />;
	}

	return <MenuPage />;
};

const AuthenticatedRoutes: React.FunctionComponent = () => (
	<Route exact path="/" component={AuthenticatedRootPage} />
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
