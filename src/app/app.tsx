import * as React from "react";
import { Route } from "react-router-dom";
import { Game } from "./display/stages/game";
import { CallbackPage } from "./auth/CallbackPage";

const App: React.FunctionComponent = () => {
    return (
        <>
            <Route exact path="/" component={Game} />
            <Route exact path="/callback" component={CallbackPage} />
        </>
    );
};

export { App };
