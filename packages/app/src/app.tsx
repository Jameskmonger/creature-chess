import * as React from "react";
import { Route } from "react-router-dom";
import { useSelector } from "react-redux";
import { AppState } from "./store";
import { AuthSelectors, CallbackPage, LoginPage } from "./auth";
import { GamePage } from "./game";
import { LobbyPage } from "./lobby";
import { MenuPage, NicknameRequestPage } from "./menu";

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
    const requestNicknameMessage = useSelector<AppState, string>(state => state.lobby.requestNicknameMessage);

    if (gameState === GameState.GAME) {
        return <GamePage />;
    }

    if (gameState === GameState.LOBBY) {
        return <LobbyPage />;
    }

    if (requestNicknameMessage) {
        return <NicknameRequestPage message={requestNicknameMessage} />;
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
