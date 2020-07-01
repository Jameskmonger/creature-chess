import * as React from "react";
import { connect, MapDispatchToProps, MapStateToProps, useSelector } from "react-redux";
import { joinGameError, enableDebugMode, findGameAction } from "../../store/actions/gameActions";
import { AppState } from "@app/store";
import { loadingSelector } from "../../store/gameSelector";
import { MAX_NAME_LENGTH, MAX_PLAYERS_IN_GAME } from "@common/models/constants";
import { getUrlParameter } from "../../get-url-parameter";
import { signOut } from "@app/auth/auth0";

interface DispatchProps {
    onFindGame: (serverIP: string, name: string) => void;
    enableDebugMode: () => void;
    setError: (error: string) => void;
}

interface MenuStageProps {
    loading: boolean;
    error: string;
}

type Props = MenuStageProps & DispatchProps;

interface MenuStageState {
    name: string;
    serverIP: string;
    debugModeClickCount: number;
}

const PlayerInfo: React.FunctionComponent = () => {
    const email = useSelector<AppState, any>(state => state.auth.profile.email);

    return (
        <div className="player-info">
            <span className="welcome">Logged in (<span className="email">{email}</span>)</span>

            <button className="sign-out" onClick={signOut}>Log out</button>
        </div>
    );
};

class MenuStageUnconnected extends React.Component<Props, MenuStageState> {
    public state = {
        name: "",
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
            return (
                <div className="menu">
                    <div className="join-game">
                        {title}

                        <p>Loading game...</p>
                    </div>
                </div>
            );
        }

        return (
            <div className="menu">
                <PlayerInfo />

                <div className="join-game">
                    {title}

                    <p>Enter your name and click "Find Game" to start playing</p>

                    <input
                        value={this.state.name}
                        onChange={this.onNameChange}
                        maxLength={MAX_NAME_LENGTH}
                        placeholder="Your name"
                        className="name-input"
                    />

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

                <div className="how-to-play">
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

                <div className="github-link">
                    <a href="https://reddit.com/r/creaturechess/">/r/CreatureChess</a>
                    {" - "}
                    <a href="https://github.com/Jameskmonger/creature-chess">Source and Licenses on GitHub</a>
                </div>
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

    private onNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({
            name: event.target.value
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

        if (!this.state.name) {
            this.props.setError("Name field empty");
            return;
        }

        if (this.state.name.length > MAX_NAME_LENGTH) {
            this.props.setError(`Name too long. Max ${MAX_NAME_LENGTH} characters`);
            return;
        }

        this.props.onFindGame(this.state.serverIP, this.state.name);
    }
}

const mapStateToProps: MapStateToProps<MenuStageProps, {}, AppState> = state => ({
    loading: loadingSelector(state),
    error: state.game.menuError
});

const mapDispatchToProps: MapDispatchToProps<DispatchProps, {}> = dispatch => ({
    onFindGame: (serverIP: string, name: string) => dispatch(findGameAction(serverIP, name)),
    enableDebugMode: () => dispatch(enableDebugMode()),
    setError: (error: string) => dispatch(joinGameError(error))
});

const MenuStage = connect(mapStateToProps, mapDispatchToProps)(MenuStageUnconnected);

export {
    MenuStage
};
