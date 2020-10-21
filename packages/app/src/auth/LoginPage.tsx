import * as React from "react";
import { useSelector } from "react-redux";
import { signIn } from "./auth0";
import { AppState } from "../store";
import { isCheckingSession } from "./store/selectors";
import { Footer } from "../ui/display/footer";
import { Loading } from "../ui/display/loading";

const LoginPage: React.FunctionComponent = () => {
    const checkingSession = useSelector<AppState, boolean>(isCheckingSession);
    const [loadingSignIn, setLoadingSignIn] = React.useState<boolean>(false);
    const [whyNeedAccountOpen, setWhyNeedAccountOpen] = React.useState<boolean>(false);

    const onSignInClick = () => {
        setLoadingSignIn(true);

        signIn();
    };

    const onWhyNeedAccountClick = () => setWhyNeedAccountOpen(!whyNeedAccountOpen);

    if (checkingSession) {
        return <Loading />;
    }

    return (
        <div className="login">
            <h2 className="title">Creature Chess</h2>
            {
                loadingSignIn
                && <button className="login-button">Loading...</button>
            }

            {
                !loadingSignIn
                && <button onClick={onSignInClick} className="login-button">Log in / Sign up</button>
            }

            <div className={`segment ${whyNeedAccountOpen ? "" : "closed"}`}>
                <div className="header" onClick={onWhyNeedAccountClick}>Why do I need an account? {whyNeedAccountOpen ? "-" : "+"}</div>
                <div className="content">
                    <p>
                        Logging into an account allows the game to keep your session, so that if you get
                        disconnected, you can get right back into the game.
                    </p>
                    <p>&nbsp;</p>
                    <p>
                        I don't store any of your personal data. Your game data might be deleted occasionally as I
                        develop the game further.
                    </p>
                </div>
            </div>

            <div className="video-container">
                <h3 className="demo">Demo</h3>
                <video controls autoPlay className="video">
                    <source src="https://i.imgur.com/EAwP0Qm.mp4" type="video/mp4" />
                    Your browser does not support videos.
                </video>
            </div>

            <Footer />
        </div>
    );
};

export { LoginPage };
