import * as React from "react";
import { signIn } from "../auth/auth0";

const LoginPage: React.FunctionComponent = () => {
    const [loading, setLoading] = React.useState<boolean>(false);

    const onLoginClick = () => {
        setLoading(true);

        signIn();
    };

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
                            && <button onClick={onLoginClick} className="option-button primary">Log in / Sign up</button>
                        }

                        <p className="description">
                            Creature Chess is completely free to play.<br /><br />

                            Use the button above to create an account,
                            or to log in if you already have one.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export { LoginPage };
