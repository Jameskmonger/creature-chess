import * as React from "react";
import { connect, useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router";
import { AppState } from "@app/store";
import { handleAuthenticationCallback } from "@app/store/actions/authActions";

const CallbackPage: React.FunctionComponent = () => {
    const userExists = useSelector<AppState>(state => state.auth !== null);
    const dispatch = useDispatch();

    React.useEffect(() => {
        if (userExists) {
            return;
        }

        dispatch(handleAuthenticationCallback());
    }, []);

    if (userExists) {
        return <Redirect to="/" />;
    }

    return <div className="text-center">Loading user profile.</div>;
};

export { CallbackPage };
