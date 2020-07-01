import * as React from "react";
import { connect, useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router";
import { AppState } from "@app/store";
import { handleAuthenticationCallback } from "@app/store/actions/authActions";

const CallbackPage: React.FunctionComponent = () => {
    const isLoggedIn = useSelector<AppState>(state => state.auth !== null);
    const dispatch = useDispatch();

    React.useEffect(() => {
        if (isLoggedIn) {
            return;
        }

        dispatch(handleAuthenticationCallback());
    }, []);

    if (isLoggedIn) {
        return <Redirect to="/" />;
    }

    return <div className="text-center">Loading user profile.</div>;
};

export { CallbackPage };
