import * as React from "react";
import { connect, useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router";
import { AppState } from "../store";
import { handleAuthenticationCallback } from "./store/actions";
import { isLoggedIn } from "./store/selectors";

const CallbackPage: React.FunctionComponent = () => {
    const loggedIn = useSelector<AppState>(isLoggedIn);
    const dispatch = useDispatch();

    React.useEffect(() => {
        if (loggedIn) {
            return;
        }

        dispatch(handleAuthenticationCallback());
    }, []);

    if (loggedIn) {
        return <Redirect to="/" />;
    }

    return <div className="text-center">Loading user profile.</div>;
};

export { CallbackPage };
