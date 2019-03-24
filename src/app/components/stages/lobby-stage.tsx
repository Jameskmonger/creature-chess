import * as React from "react";
import { connect, MapDispatchToProps } from "react-redux";
import { joinGame } from "../../actions/lobbyAction";

interface DispatchProps {
    onJoinGame: (name: string) => void;
}

type Props = DispatchProps;

class LobbyStageUnconnected extends React.Component<Props> {
    public render() {
        return (
            <>
                <p>You are currently in the lobby.</p>

                <button onClick={this.onJoinGameClick}>Join Game</button>
            </>
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
