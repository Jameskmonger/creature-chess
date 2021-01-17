import * as React from "react";
import { connect, MapDispatchToProps, MapStateToProps } from "react-redux";
import { AppState } from "../store";
import { getUrlParameter } from "./get-url-parameter";
import { signOut } from "../auth/auth0";
import { Footer } from "../ui/display/footer";
import { Leaderboard } from "./leaderboard";
import { findGameAction, joinGameError } from "../ui/actions";
import { Loading } from "../ui/display/loading";
import { GAME_SERVER_URL } from "../auth/config";

interface DispatchProps {
    onFindGame: (serverIP: string) => void;
    setError: (error: string) => void;
}

interface MenuStageProps {
    loading: boolean;
    error: string;
}

type Props = MenuStageProps & DispatchProps;

const Navbar: React.FunctionComponent = () => {
    return (
        <nav className="navbar">
            <button className="sign-out" onClick={signOut}>Log Out</button>
        </nav>
    );
};

class MenuPageUnconnected extends React.Component<Props> {
    public render() {
        if (this.props.loading) {
            return <Loading />;
        }

        return (
            <div className="menu">
                <Navbar />

                <div className="join-game">
                    <h2 className="title">Creature Chess</h2>

                    <div className="blurb">
                        <p>More fun with friends! Press "Find Game" at the same time to play together</p>
                    </div>

                    <button onClick={this.onFindGameClick} className="find-game">Find Game</button>

                    <div className="blurb">
                        <p>Join us on Discord to receive notifications when someone starts a lobby, and more!</p>
                    </div>

                    <a href="https://discord.gg/FhMm6saehb"><img src="https://i.imgur.com/YNyTNuw.png" className="discord-button" /></a>

                    <div className="blurb">
                        <p>This is a <span className="highlight">multiplayer strategy game</span> in which you configure creatures on a board.</p>
                        <p>Each round, your board is matched against an opponent's board. Defeat all their pieces to win the round.</p>
                        <p>Every loss decreases your health bar. When your health reaches zero, you're out!</p>
                        <p>Players will battle against eachother until only one player remains.</p>
                        <p>Good luck! <span className="highlight">~ jkm</span></p>
                    </div>

                    {
                        this.props.error
                        && <div className="error"><p>{this.props.error}</p></div>
                    }
                </div>

                <Leaderboard />

                <Footer />
            </div>
        );
    }

    private onFindGameClick = () => {
        const serverIP = getUrlParameter("server") || GAME_SERVER_URL;

        this.props.onFindGame(serverIP);
    }
}

const mapStateToProps: MapStateToProps<MenuStageProps, {}, AppState> = state => ({
    loading: state.ui.loading,
    error: state.ui.menuError
});

const mapDispatchToProps: MapDispatchToProps<DispatchProps, {}> = dispatch => ({
    onFindGame: (serverIP: string) => dispatch(findGameAction(serverIP)),
    setError: (error: string) => dispatch(joinGameError(error))
});

const MenuPage = connect(mapStateToProps, mapDispatchToProps)(MenuPageUnconnected);

export {
    MenuPage
};
