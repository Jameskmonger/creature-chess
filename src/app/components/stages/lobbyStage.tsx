import * as React from "react";
import { connect, MapDispatchToProps, MapStateToProps } from "react-redux";
import { joinGameAction } from "../../actions/gameActions";
import { AppState } from "../../store/store";
import { loadingSelector } from "../../selectors/gameSelector";

interface DispatchProps {
    onJoinGame: (serverIP: string, name: string) => void;
}

interface LobbyStageProps {
    loading: boolean;
}

type Props = LobbyStageProps & DispatchProps;

interface LobbyStageState {
    name: string;
    serverIP: string;
}

class LobbyStageUnconnected extends React.Component<Props, LobbyStageState> {
    public state = {
        name: "",
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
                                value={"18asd83"}
                                placeholder="Lobby ID"
                                className="option-input"
                            />

                            <button onClick={this.onJoinGameClick} className="option-button create-button">Create Game</button>
                        </div>
                        <div className="option">
                            <input
                                value={"18asd83"}
                                placeholder="Lobby ID"
                                className="option-input"
                            />

                            <button onClick={this.onJoinGameClick} className="option-button join-button">Join Game</button>
                        </div>
                    </div>

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

    private onServerIPChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({
            serverIP: event.target.value
        });
    }

    private onJoinGameClick = () => {
        if (!this.state.serverIP || !this.state.name) {
            return;
        }

        this.props.onJoinGame(this.state.serverIP, this.state.name);
    }
}

const mapStateToProps: MapStateToProps<LobbyStageProps, {}, AppState> = state => ({
    loading: loadingSelector(state)
});

const mapDispatchToProps: MapDispatchToProps<DispatchProps, {}> = dispatch => ({
    onJoinGame: (serverIP: string, name: string) => dispatch(joinGameAction(serverIP, name))
});

const LobbyStage = connect(mapStateToProps, mapDispatchToProps)(LobbyStageUnconnected);

export {
    LobbyStage
};
