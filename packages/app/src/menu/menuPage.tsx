import * as React from "react";
import { connect, MapDispatchToProps, MapStateToProps } from "react-redux";
import { AppState } from "../store";
import { getUrlParameter } from "./get-url-parameter";
import { signOut } from "../auth/auth0";
import { Footer } from "../ui/display/footer";
import { Leaderboard } from "./leaderboard";
import { enableDebugMode, findGameAction, joinGameError } from "../ui/actions";
import { Loading } from "../ui/display/loading";
import { GAME_SERVER_URL } from "../auth/config";

interface DispatchProps {
    onFindGame: (serverIP: string) => void;
    enableDebugMode: () => void;
    setError: (error: string) => void;
}

interface MenuStageProps {
    loading: boolean;
    error: string;
}

type Props = MenuStageProps & DispatchProps;

interface MenuStageState {
    serverIP: string;
    debugModeClickCount: number;
}

const Navbar: React.FunctionComponent = () => {
    return (
        <nav className="navbar">
            <button className="sign-out" onClick={signOut}>Log Out</button>
        </nav>
    );
};

class MenuPageUnconnected extends React.Component<Props, MenuStageState> {
    public state = {
        serverIP: "",
        debugModeClickCount: 0
    };

    public componentDidMount() {
        const serverParam = getUrlParameter("server");

        this.setState({
            serverIP: serverParam || GAME_SERVER_URL
        });
    }

    public render() {
        const title =
            this.state.debugModeClickCount === 3
                ? <h2 className="title">Creature Chess <span className="debug-mode">(Debug Mode)</span></h2>
                : <h2 className="title" onClick={this.onTitleClick}>Creature Chess</h2>;

        if (this.props.loading) {
            return <Loading />;
        }

        return (
            <div className="menu">
                <Navbar />

                <div className="join-game">
                    {title}

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

                    {
                        this.state.debugModeClickCount === 3
                        && (
                            <input
                                value={this.state.serverIP}
                                onChange={this.onServerIPChange}
                                placeholder="Server IP"
                            />
                        )
                    }
                </div>

                <Leaderboard />

                <Footer />
            </div>
        );
    }

    private onTitleClick = () => {
        if (this.state.debugModeClickCount === 3) {
            return;
        }

        this.setState(prevState => ({
            debugModeClickCount: prevState.debugModeClickCount + 1
        }), () => {
            if (this.state.debugModeClickCount !== 3) {
                return;
            }

            this.props.enableDebugMode();
        });
    }

    private onServerIPChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (this.state.debugModeClickCount !== 3) {
            return;
        }

        this.setState({
            serverIP: event.target.value
        });
    }

    private onFindGameClick = () => {
        if (!this.state.serverIP) {
            this.props.setError("Server IP field empty");
            return;
        }

        this.props.onFindGame(this.state.serverIP);
    }
}

const mapStateToProps: MapStateToProps<MenuStageProps, {}, AppState> = state => ({
    loading: state.ui.loading,
    error: state.ui.menuError
});

const mapDispatchToProps: MapDispatchToProps<DispatchProps, {}> = dispatch => ({
    onFindGame: (serverIP: string) => dispatch(findGameAction(serverIP)),
    enableDebugMode: () => dispatch(enableDebugMode()),
    setError: (error: string) => dispatch(joinGameError(error))
});

const MenuPage = connect(mapStateToProps, mapDispatchToProps)(MenuPageUnconnected);

export {
    MenuPage
};
