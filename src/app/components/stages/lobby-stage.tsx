import * as React from "react";
import { connect, MapDispatchToProps } from "react-redux";
import { joinGame } from "../../actions/lobbyActions";

interface DispatchProps {
    onJoinGame: (name: string) => void;
}

type Props = DispatchProps;

class LobbyStageUnconnected extends React.Component<Props> {
    public render() {
        return (
            <div className="lobby">
                <div className="join-game">
                    <h2 className="title">Pokemon Auto Chess</h2>

                    <input placeholder="Your name" className="name-input" />
                    <button onClick={this.onJoinGameClick} className="join-button">Join Game</button>
                </div>
            </div>
        );
    }

    private onJoinGameClick = () => {
        this.props.onJoinGame("Player");
    }
}

const mapDispatchToProps: MapDispatchToProps<DispatchProps, {}> = dispatch => ({
    onJoinGame: (name: string) => dispatch(joinGame(name))
});

const LobbyStage = connect(null, mapDispatchToProps)(LobbyStageUnconnected);

export {
    LobbyStage
};
