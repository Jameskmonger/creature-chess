import * as React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import { Loading } from "../display/loading";
import { AppState } from "../store";
import { handleAuthenticationCallback } from "./store/actions";
import { isCheckingSession, isLoggedIn } from "./store/selectors";

const CallbackPage: React.FunctionComponent = () => {
    const loggedIn = useSelector<AppState, boolean>(isLoggedIn);
    const checkingSession = useSelector<AppState, boolean>(isCheckingSession);
    const dispatch = useDispatch();

    React.useEffect(() => {
        if (loggedIn || checkingSession) {
            return;
        }

        dispatch(handleAuthenticationCallback());
    }, [checkingSession]);

    if (loggedIn) {
        return <Redirect to="/" />;
    }

    return <Loading />;
};

export { CallbackPage };
