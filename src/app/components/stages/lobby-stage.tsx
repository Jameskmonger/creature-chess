import * as React from "react";
import { connect, MapDispatchToProps } from "react-redux";
import { joinGame } from "../../actions/lobbyActions";

interface DispatchProps {
    onJoinGame: (name: string) => void;
}

interface LobbyStageProps {
    name: string;
}

type Props = DispatchProps;

class LobbyStageUnconnected extends React.Component<Props> {
    public state = {
        name: ""
    };

    public render() {
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

const mapDispatchToProps: MapDispatchToProps<DispatchProps, {}> = dispatch => ({
    onJoinGame: (name: string) => dispatch(joinGame(name))
});

const LobbyStage = connect(null, mapDispatchToProps)(LobbyStageUnconnected);

export {
    LobbyStage
};
