import * as React from "react";
import { connect, MapDispatchToProps, MapStateToProps } from "react-redux";
import { AppState } from "../store";
import { getUrlParameter } from "./get-url-parameter";
import { signOut } from "../auth/auth0";
import { Footer } from "../ui/display/footer";
import { Leaderboard } from "./leaderboard";
import { enableDebugMode, findGameAction, joinGameError } from "../ui/actions";
import { Loading } from "../ui/display/loading";

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

const PlayerInfo: React.FunctionComponent = () => {
    return (
        <div className="player-info">
            <span className="welcome">Logged in</span>

            <button className="sign-out" onClick={signOut}>Log out</button>
        </div>
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
            serverIP: serverParam || "https://cc-server.jamesmonger.com"
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
                <PlayerInfo />

                <div className="join-game">
                    {title}

                    <p>Click "Find Game" to start playing. If you haven't set a nickname, you will be prompted to choose one.</p>

                    <div className="join-options">
                        <div className="option">
                            <button onClick={this.onFindGameClick} className="option-button primary">Find Game</button>
                        </div>
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

                <div className="segment">
                    <div className="header">How to play</div>
                    <div className="content">
                        <p>This game is a strategy game where you have to arrange pieces on a chess board</p>
                        <p>Every turn, these pieces will be matched against an opponent's board, to fight to the winner</p>
                        <p>Losing will decrease your health bar, when you reach 0 health you will be knocked out</p>
                        <p>&nbsp;</p>
                        <p>You can buy pieces from the shop on the right - this refreshes every turn</p>
                        <p>When you have 3 identical pieces, they will combine and upgrade - each piece has 3 levels</p>
                        <p>There is also an XP shop, where you can buy XP to level up and place more pieces on the board</p>
                        <p>&nbsp;</p>
                        <p>Good luck!</p>
                    </div>
                </div>

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
