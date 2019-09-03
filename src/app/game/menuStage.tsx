import * as React from "react";
import { connect, MapDispatchToProps, MapStateToProps } from "react-redux";
import { joinGameAction, createGameAction, joinGameError, enableDebugMode, playSoloAction } from "../store/actions/gameActions";
import { AppState } from "../store/state";
import { loadingSelector } from "../store/gameSelector";
import { MAX_NAME_LENGTH, MAX_PLAYERS_IN_GAME } from "@common/constants";

interface DispatchProps {
    onPlaySolo: (serverIP: string, name: string) => void;
    onJoinGame: (serverIP: string, name: string, gameId: string) => void;
    onCreateGame: (serverIP: string, name: string, playerCount: number, botCount: number) => void;
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
    botCount: string;
    playerCount: string;
    gameId: string;
    serverIP: string;
    debugModeClickCount: number;
}

class MenuStageUnconnected extends React.Component<Props, MenuStageState> {
    public state = {
        name: "",
        playerCount: "",
        botCount: "",
        gameId: "",
        serverIP: `https://cc-server.jamesmonger.com`,
        debugModeClickCount: 0
    };

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
                <div className="join-game">
                    {title}

                    <p>Enter your name and select one of the options below to start playing</p>

                    <input
                        value={this.state.name}
                        onChange={this.onNameChange}
                        maxLength={MAX_NAME_LENGTH}
                        placeholder="Your name"
                        className="name-input"
                    />

                    <div className="join-options">
                        <div className="option">
                            <button onClick={this.onPlaySoloClick} className="option-button primary">Play Solo</button>

                            <p className="description">Play a standard game against 7 bots</p> 
                        </div>
                        <div className="option">
                            <input
                                value={this.state.gameId}
                                onChange={this.onGameIdChange}
                                placeholder="Game ID"
                                className="option-input"
                            />

                            <button onClick={this.onJoinGameClick} className="option-button primary">Join Game</button>

                            <p className="description">Join a specific game</p>
                        </div>
                        <div className="option">
                            <input
                                value={this.state.playerCount}
                                onChange={this.onPlayerCountChange}
                                placeholder="Player count"
                                className="option-input"
                            />

                            <input
                                value={this.state.botCount}
                                onChange={this.onBotCountChange}
                                placeholder="Bot count (optional)"
                                className="option-input"
                            />

                            <button onClick={this.onCreateGameClick} className="option-button secondary">Create Game</button>

                            <p className="description">Create a game that others can join.</p>

                            <p className="description">Bots are included in the player count</p>
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

                <div className="github-link"><a href="https://reddit.com/r/creaturechess/">/r/CreatureChess</a> - <a href="https://github.com/Jameskmonger/creature-chess">Source and Licenses on GitHub</a></div>
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

    private onPlayerCountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({
            playerCount: event.target.value
        });
    }

    private onBotCountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({
            botCount: event.target.value
        });
    }

    private onGameIdChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({
            gameId: event.target.value
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

    private onPlaySoloClick = () => {
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

        this.props.onPlaySolo(this.state.serverIP, this.state.name);
    }

    private onJoinGameClick = () => {
        if (!this.state.serverIP) {
            this.props.setError("Server IP field empty");
            return;
        }

        if (!this.state.gameId) {
            this.props.setError("Game ID field empty");
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

        this.props.onJoinGame(this.state.serverIP, this.state.name, this.state.gameId);
    }

    private onCreateGameClick = () => {
        if (!this.state.serverIP) {
            this.props.setError("Server IP field empty");
            return;
        }

        if (!this.state.name) {
            this.props.setError("Name field empty");
            return;
        }

        if (!this.state.playerCount || isNaN(this.state.playerCount as any)) {
            this.props.setError("Non-numeric player count");
            return;
        }

        if (this.state.botCount && isNaN(this.state.botCount as any)) {
            this.props.setError("Non-numeric bot count");
            return;
        }

        const playerCount = parseInt(this.state.playerCount, 10);

        if (playerCount > MAX_PLAYERS_IN_GAME) {
            this.props.setError(`Sorry, there is a maximum of ${MAX_PLAYERS_IN_GAME} players per game`);
            return;
        }

        const botCount = parseInt(this.state.botCount, 10) || 0;

        if (botCount >= playerCount) {
            this.props.setError("You must leave at least 1 free slot for a player");
            return;
        }

        this.props.onCreateGame(this.state.serverIP, this.state.name, playerCount, botCount);
    }
}

const mapStateToProps: MapStateToProps<MenuStageProps, {}, AppState> = state => ({
    loading: loadingSelector(state),
    error: state.game.menuError
});

const mapDispatchToProps: MapDispatchToProps<DispatchProps, {}> = dispatch => ({
    onPlaySolo: (serverIP: string, name: string) => dispatch(playSoloAction(serverIP, name)),
    onCreateGame: (serverIP: string, name: string, playerCount: number, botCount: number) => dispatch(createGameAction(serverIP, name, playerCount, botCount)),
    onJoinGame: (serverIP: string, name: string, gameId: string) => dispatch(joinGameAction(serverIP, name, gameId)),
    enableDebugMode: () => dispatch(enableDebugMode()),
    setError: (error: string) => dispatch(joinGameError(error))
});

const MenuStage = connect(mapStateToProps, mapDispatchToProps)(MenuStageUnconnected);

export {
    MenuStage
};
