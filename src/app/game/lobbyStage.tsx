import * as React from "react";
import { connect, MapDispatchToProps, MapStateToProps } from "react-redux";
import { joinGameAction, createGameAction, joinGameError } from "../store/actions/gameActions";
import { AppState } from "../store/store";
import { loadingSelector } from "../store/gameSelector";
import { MAX_NAME_LENGTH } from "@common/constants";

interface DispatchProps {
    onJoinGame: (serverIP: string, name: string, gameId: string) => void;
    onCreateGame: (serverIP: string, name: string, playerCount: number, botCount: number) => void;
    setError: (error: string) => void;
}

interface LobbyStageProps {
    loading: boolean;
    error: string;
}

type Props = LobbyStageProps & DispatchProps;

interface LobbyStageState {
    name: string;
    botCount: string;
    playerCount: string;
    gameId: string;
    serverIP: string;
}

class LobbyStageUnconnected extends React.Component<Props, LobbyStageState> {
    public state = {
        name: "",
        playerCount: "",
        botCount: "",
        gameId: "",
        serverIP: `http://${window.location.hostname}:3000`
    };

    public render() {
        if (this.props.loading) {
            return (
                <div className="lobby">
                    <div className="join-game">
                        <h2 className="title">Creature Chess</h2>

                        <p>Loading game...</p>
                    </div>
                </div>
            );
        }

        return (
            <div className="lobby">
                <div className="join-game">
                    <h2 className="title">Creature Chess</h2>

                    <input
                        value={this.state.name}
                        onChange={this.onNameChange}
                        maxLength={MAX_NAME_LENGTH}
                        placeholder="Your name"
                        className="name-input"
                    />

                    <div className="join-options">
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
                                placeholder="Bot count"
                                className="option-input"
                            />

                            <button onClick={this.onCreateGameClick} className="option-button create-button">Create Game</button>
                        </div>
                        <div className="option">
                            <input
                                value={this.state.gameId}
                                onChange={this.onGameIdChange}
                                placeholder="Game ID"
                                className="option-input"
                            />

                            <button onClick={this.onJoinGameClick} className="option-button join-button">Join Game</button>
                        </div>
                    </div>

                    {
                        this.props.error
                        && <div className="error"><p>{this.props.error}</p></div>
                    }

                    <input
                        value={this.state.serverIP}
                        onChange={this.onServerIPChange}
                        placeholder="Server IP"
                    />
                </div>
            </div>
        );
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
        this.setState({
            serverIP: event.target.value
        });
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

        if (!this.state.botCount || isNaN(this.state.botCount as any)) {
            this.props.setError("Non-numeric bot count");
            return;
        }

        const playerCount = parseInt(this.state.playerCount, 10);
        const botCount = parseInt(this.state.botCount, 10);

        this.props.onCreateGame(this.state.serverIP, this.state.name, playerCount, botCount);
    }
}

const mapStateToProps: MapStateToProps<LobbyStageProps, {}, AppState> = state => ({
    loading: loadingSelector(state),
    error: state.game.lobbyError
});

const mapDispatchToProps: MapDispatchToProps<DispatchProps, {}> = dispatch => ({
    onCreateGame: (serverIP: string, name: string, playerCount: number, botCount: number) => dispatch(createGameAction(serverIP, name, playerCount, botCount)),
    onJoinGame: (serverIP: string, name: string, gameId: string) => dispatch(joinGameAction(serverIP, name, gameId)),
    setError: (error: string) => dispatch(joinGameError(error))
});

const LobbyStage = connect(mapStateToProps, mapDispatchToProps)(LobbyStageUnconnected);

export {
    LobbyStage
};
