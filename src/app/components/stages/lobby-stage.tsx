import * as React from "react";
import { connect, MapDispatchToProps, MapStateToProps } from "react-redux";
import { joinGameAction } from "../../actions/lobbyActions";
import { AppState } from "../../store/store";

interface DispatchProps {
    onJoinGame: (name: string) => void;
}

interface LobbyStageProps {
    loading: boolean;
}

type Props = LobbyStageProps & DispatchProps;

class LobbyStageUnconnected extends React.Component<Props> {
    public state = {
        name: ""
    };

    public render() {
        if (this.props.loading) {
            return (
                <div className="lobby">
                    <div className="join-game">
                        <h2 className="title">Pokemon Auto Chess</h2>

                        <p>Loading game...</p>
                    </div>
                </div>
            );
        }

        return (
            <div className="lobby">
                <div className="join-game">
                    <h2 className="title">Pokemon Auto Chess</h2>

                    <input
                        value={this.state.name}
                        onChange={this.onNameChange}
                        placeholder="Your name"
                        className="name-input"
                    />
                    <button onClick={this.onJoinGameClick} className="join-button">Join Game</button>
                </div>
            </div>
        );
    }

    private onNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({
            name: event.target.value
        });
    }

    private onJoinGameClick = () => {
        this.props.onJoinGame(this.state.name);
    }
}

const mapStateToProps: MapStateToProps<LobbyStageProps, {}, AppState> = state => ({
    loading: state.lobby.loading
});

const mapDispatchToProps: MapDispatchToProps<DispatchProps, {}> = dispatch => ({
    onJoinGame: (name: string) => dispatch(joinGameAction(name))
});

const LobbyStage = connect(mapStateToProps, mapDispatchToProps)(LobbyStageUnconnected);

export {
    LobbyStage
};
