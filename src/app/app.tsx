import * as React from "react";
import { Route } from "react-router-dom";
import { Game } from "./display/stages/game";

const App: React.FunctionComponent = () => {
    return (
        <>
            <Route exact path="/" component={Game} />
        </>
    );
};

export { App };
