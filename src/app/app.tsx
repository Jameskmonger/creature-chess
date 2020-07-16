import * as React from "react";
import { Route } from "react-router-dom";
import { useSelector } from "react-redux";
import { Game } from "./display/stages/game";
import { CallbackPage } from "./pages/CallbackPage";
import { AppState } from "./store";
import { LoginPage } from "./pages/LoginPage";

const UnauthenticatedRoutes: React.FunctionComponent = () => {
    return (
        <>
            <Route exact path="/" component={LoginPage} />
            <Route exact path="/callback" component={CallbackPage} />
        </>
    );
};

const AuthenticatedRoutes: React.FunctionComponent = () => {
    return (
        <>
            <Route exact path="/" component={Game} />
            <Route exact path="/callback" component={CallbackPage} />
        </>
    );
};

const App: React.FunctionComponent = () => {
    const isLoggedIn = useSelector<AppState, boolean>(state => state.auth !== null);

    if (isLoggedIn) {
        return <AuthenticatedRoutes />;
    }

    return <UnauthenticatedRoutes />;
};

export { App };
