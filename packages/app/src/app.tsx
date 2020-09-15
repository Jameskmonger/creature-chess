import * as React from "react";
import { Route } from "react-router-dom";
import { useSelector } from "react-redux";
import { Game } from "./display/stages/game";
import { AppState } from "./store";
import { AuthSelectors, CallbackPage, LoginPage } from "./auth";

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
    const loggedIn = useSelector<AppState, boolean>(AuthSelectors.isLoggedIn);

    if (loggedIn) {
        return <AuthenticatedRoutes />;
    }

    return <UnauthenticatedRoutes />;
};

export { App };
