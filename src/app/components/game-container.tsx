import * as React from "react";
import { MapStateToProps, connect } from "react-redux";
import { Game } from "./stages/game-stage";
import { AppState, LobbyState } from "../store/store";

interface Props {
    lobby: LobbyState;
}

class GameContainerUnconnected extends React.Component<{}, {}> {
    public render() {
        return <Game />;
    }
}

const mapStateToProps: MapStateToProps<Props, {}, AppState> = state => ({
    lobby: state.lobby
});

const GameContainer = connect(mapStateToProps)(GameContainerUnconnected);

export {
    GameContainer
};
