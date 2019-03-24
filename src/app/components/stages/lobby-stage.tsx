import * as React from "react";
import { connect, MapDispatchToProps } from "react-redux";
import { joinLobby } from "../../actions/lobbyAction";

interface DispatchProps {
    onJoinLobby: (name: string) => void;
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
        this.props.onJoinLobby("Player");
    }
}

const mapDispatchToProps: MapDispatchToProps<DispatchProps, {}> = dispatch => ({
    onJoinLobby: (name: string) => dispatch(joinLobby(name))
});

const LobbyStage = connect(null, mapDispatchToProps)(LobbyStageUnconnected);

export {
    LobbyStage
};
