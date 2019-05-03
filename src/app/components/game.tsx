import * as React from "react";
import { MapStateToProps, connect, MapDispatchToProps } from "react-redux";
import { GameStage } from "./stages/gameStage";
import { AppState } from "../store/store";
import { LobbyStage } from "./stages/lobbyStage";
import { localPlayerIdSelector } from "../selectors/gameSelector";

interface Props {
    inLobby: boolean;
}

class GameUnconnected extends React.Component<Props, {}> {
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

const Game = connect(mapStateToProps)(GameUnconnected);

export {
    Game
};
