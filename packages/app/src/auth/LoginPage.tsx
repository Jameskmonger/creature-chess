import * as React from "react";
import { useSelector } from "react-redux";
import { signIn } from "./auth0";
import { AppState } from "../store";
import { isCheckingSession } from "./store/selectors";
import { Footer } from "../display/footer";

const LoginPage: React.FunctionComponent = () => {
    const checkingSession = useSelector<AppState, boolean>(isCheckingSession);
    const [loadingSignIn, setLoadingSignIn] = React.useState<boolean>(false);

    const onSignInClick = () => {
        setLoadingSignIn(true);

        signIn();
    };

    const loading = (checkingSession || loadingSignIn);

    return (
        <div className="menu">
            <div className="join-game">
                <h2 className="title">Creature Chess</h2>

                <div className="join-options">
                    <div className="option">
                        {
                            loading
                            && <button className="option-button primary">Loading...</button>
                        }

                        {
                            !loading
                            && <button onClick={onSignInClick} className="option-button primary">Log in / Sign up</button>
                        }

                        <p className="description">
                            Creature Chess is completely free to play.<br /><br />

                            Use the button above to create an account,
                            or to log in if you already have one.
                        </p>
                    </div>
                </div>
            </div>

            <div className="segment">
                <div className="header">Why do I need an account?</div>
                <div className="content">
                    <p>Logging into an account allows the game to keep your session, so that if you get</p>
                    <p>disconnected, you can get right back into the game.</p>
                    <p>&nbsp;</p>
                    <p>I don't store any of your personal data. Your game data might be deleted occasionally as I</p>
                    <p>develop the game further.</p>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export { LoginPage };
