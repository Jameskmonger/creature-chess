import * as React from "react";
import { MapStateToProps, connect, MapDispatchToProps } from "react-redux";
import { GameStage } from "./stages/game-stage";
import { AppState } from "../store/store";
import { LobbyStage } from "./stages/lobby-stage";
import { localPlayerIdSelector } from "../selectors/gameSelector";

interface Props {
    inLobby: boolean;
}

class GameContainerUnconnected extends React.Component<Props, {}> {
    public render() {
        const { inLobby } = this.props;

        if (inLobby) {
            return <LobbyStage />;
        }

        return <GameStage />;
    }
}

const mapStateToProps: MapStateToProps<Props, {}, AppState> = state => ({
    inLobby: localPlayerIdSelector(state) === null
});

const GameContainer = connect(mapStateToProps)(GameContainerUnconnected);

export {
    GameContainer
};
