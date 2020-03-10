import * as React from "react";
import { MapStateToProps, connect } from "react-redux";
import { GameStage } from "./gameStage";
import { AppState } from "../../store/state";
import { MenuStage } from "./menuStage";
import { LobbyStage } from "./lobbyStage";

enum GameState {
    MENU = 0,
    LOBBY = 1,
    GAME = 2
}

interface Props {
    gameState: GameState;
}

class GameUnconnected extends React.Component<Props> {
    public render() {
        const { gameState } = this.props;

        if (gameState === GameState.GAME) {
            return <GameStage />;
        }

        if (gameState === GameState.LOBBY) {
            return <LobbyStage />;
        }

        return <MenuStage />;
    }
}

const gameStateSelector = (state: AppState) => {
    if (state.localPlayer.id !== null) {
        return GameState.GAME;
    }

    if (state.lobby.lobbyId !== null) {
        return GameState.LOBBY;
    }

    return GameState.MENU;
};

const mapStateToProps: MapStateToProps<Props, {}, AppState> = state => ({
    gameState: gameStateSelector(state)
});

const Game = connect(mapStateToProps)(GameUnconnected);

export {
    Game
};
