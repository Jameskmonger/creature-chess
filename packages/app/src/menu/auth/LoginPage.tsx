import * as React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Footer } from "../../ui/display/footer";
import { Loading } from "../../ui/display/loading";

type SegmentProps = {
    open: boolean;
    onHeaderClick: () => void;
    header: string;
    children: React.ReactNode;
};

const Segment: React.FunctionComponent<SegmentProps> = ({ open, onHeaderClick, header, children }) => {
    return (
        <div className={`segment ${open ? "" : "closed"}`}>
            <div className="header" onClick={onHeaderClick}>{header} {open ? "-" : "+"}</div>
            <div className="content">
                {children}
            </div>
        </div>
    );
};

const LoginPage: React.FunctionComponent = () => {
    const { loginWithRedirect, isLoading } = useAuth0();
    const [loadingSignIn, setLoadingSignIn] = React.useState<boolean>(false);
    const [demoOpen, setDemoOpen] = React.useState<boolean>(false);

    const onSignInClick = () => {
        setLoadingSignIn(true);

        loginWithRedirect();
    };

    const onDemoClick = () => setDemoOpen(!demoOpen);

    if (isLoading || loadingSignIn) {
        return <Loading />;
    }

    return (
        <div className="login">
            <div className="banner"><img src="https://i.imgur.com/7FAcFwZ.png" /></div>

            <div className="groups">
                <div className="group main">
                    <p className="subtext">Creature Chess is a multiplayer game, so you need an account to play. Watch the demo video to see a preview</p>

                    <button onClick={onSignInClick} className="login-button">Log in / Sign up</button>

                    <p className="subtext">Join us on Discord to find other players and give feedback on the game</p>

                    <a href="https://discord.gg/FhMm6saehb"><img src="https://i.imgur.com/YNyTNuw.png" className="discord-button" /></a>
                </div>

                <div className="group">
                    <Segment
                        header="Watch a demo video"
                        open={demoOpen}
                        onHeaderClick={onDemoClick}
                    >
                        <div className="video-container">
                            <video controls autoPlay className="video">
                                <source src="https://i.imgur.com/EAwP0Qm.mp4" type="video/mp4" />
                                Your browser does not support videos.
                            </video>
                        </div>
                    </Segment>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export { LoginPage };
