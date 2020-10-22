import * as React from "react";
import { Route } from "react-router-dom";
import { useSelector } from "react-redux";
import { AppState } from "./store";
import { AuthSelectors, CallbackPage, LoginPage, RegistrationPage } from "./auth";
import { GamePage } from "./game";
import { LobbyPage } from "./lobby";
import { MenuPage } from "./menu";

const UnauthenticatedRoutes: React.FunctionComponent = () => {
    return (
        <>
            <Route exact path="/" component={LoginPage} />
            <Route exact path="/callback" component={CallbackPage} />
        </>
    );
};

enum GameState {
    MENU = 0,
    LOBBY = 1,
    GAME = 2
}

const gameStateSelector = (state: AppState) => {
    if (state.game.phase !== null) {
        return GameState.GAME;
    }

    if (state.lobby.lobbyId !== null) {
        return GameState.LOBBY;
    }

    return GameState.MENU;
};

const AuthenticatedRootPage: React.FunctionComponent = () => {
    const gameState = useSelector<AppState, GameState>(gameStateSelector);
    const registered = useSelector<AppState, boolean>(state => state.auth.user.registered);

    if (!registered) {
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

const AuthenticatedRoutes: React.FunctionComponent = () => {
    return (
        <>
            <Route exact path="/" component={AuthenticatedRootPage} />
            <Route exact path="/callback" component={CallbackPage} />
        </>
    );
};

const App: React.FunctionComponent = () => {
    const loggedIn = useSelector<AppState, boolean>(AuthSelectors.isLoggedIn);

    if (loggedIn) {
        return <AuthenticatedRoutes />;
    }

    return <UnauthenticatedRoutes />;
};

export { App };
