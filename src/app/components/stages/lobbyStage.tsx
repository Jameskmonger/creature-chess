import * as React from "react";
import { connect, MapDispatchToProps, MapStateToProps } from "react-redux";
import { joinGameAction, createGameAction } from "../../actions/gameActions";
import { AppState } from "../../store/store";
import { loadingSelector } from "../../selectors/gameSelector";

interface DispatchProps {
    onJoinGame: (serverIP: string, name: string, gameId: string) => void;
    onCreateGame: (serverIP: string, name: string, playerCount: number, botCount: number) => void;
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
        if (!this.state.serverIP || !this.state.name || !this.state.gameId) {
            return;
        }

        this.props.onJoinGame(this.state.serverIP, this.state.name, this.state.gameId);
    }

    private onCreateGameClick = () => {
        if (
            !this.state.serverIP
            || !this.state.name
            || isNaN(this.state.playerCount as any)
            || isNaN(this.state.botCount as any)
        ) {
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
    onJoinGame: (serverIP: string, name: string, gameId: string) => dispatch(joinGameAction(serverIP, name, gameId))
});

const LobbyStage = connect(mapStateToProps, mapDispatchToProps)(LobbyStageUnconnected);

export {
    LobbyStage
};
