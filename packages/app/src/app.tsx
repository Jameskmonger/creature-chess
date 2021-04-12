import * as React from "react";
import ReactModal from "react-modal";
import { Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useAuth0 } from "@auth0/auth0-react";
import { AppState } from "./store";
import { GamePage } from "./game";
import { LobbyPage } from "./lobby";
import { MenuPage } from "./menu";
import { LoginPage, RegistrationPage } from "./menu/auth";
import { SanitizedUser } from "packages/models/lib";
import { Loading } from "./ui/display/loading";
import { userAuthenticated } from "./menu/auth/store/actions";

const UnauthenticatedRoutes: React.FunctionComponent = () => {
    return (
        <>
            <Route exact path="/" component={LoginPage} />
        </>
    );
};

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
    const gameState = useSelector<AppState, GameState>(gameStateSelector);
    const registered = useSelector<AppState, boolean>(state => state.user.user.registered);

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
        </>
    );
};

ReactModal.setAppElement('#approot');

const App: React.FunctionComponent = () => {
    const { isAuthenticated, getAccessTokenSilently } = useAuth0();
    const dispatch = useDispatch();
    const userFetched = useSelector<AppState, boolean>(state => state.user.fetched);
    const user = useSelector<AppState, SanitizedUser | null>(state => state.user.user);

    React.useEffect(() => {
        if (isAuthenticated && !userFetched) {
            getAccessTokenSilently().then(token => {
                dispatch(userAuthenticated(token));
            }).catch(e => {
                console.log("error getting token", e);
                // todo display this back to the user
            });
        }
    }, [ isAuthenticated ]);

    if (isAuthenticated && !userFetched) {
        return <Loading />;
    }

    if (isAuthenticated && user) {
        return <AuthenticatedRoutes />;
    }

    return <UnauthenticatedRoutes />;
};

export { App };
