import * as React from "react";
import { Route } from "react-router-dom";
import { useSelector } from "react-redux";
import { AppState } from "./store";
import { AuthSelectors, CallbackPage, LoginPage } from "./auth";
import { GameRouter } from "./game";

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
            <Route exact path="/" component={GameRouter} />
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
