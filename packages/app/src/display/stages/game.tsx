import * as React from "react";
import { useSelector } from "react-redux";
import { GameStage } from "./gameStage";
import { AppState } from "../../store";
import { MenuStage } from "./menuStage";
import { LobbyStage } from "./lobbyStage";
import { NicknameRequest } from "./nicknameRequest";

enum GameState {
    MENU = 0,
    LOBBY = 1,
    GAME = 2
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

const Game: React.FunctionComponent = () => {
    const gameState = useSelector<AppState, GameState>(gameStateSelector);
    const requestNicknameMessage = useSelector<AppState, string>(state => state.lobby.requestNicknameMessage);

    if (gameState === GameState.GAME) {
        return <GameStage />;
    }

    if (gameState === GameState.LOBBY) {
        return <LobbyStage />;
    }

    if (requestNicknameMessage) {
        return <NicknameRequest message={requestNicknameMessage} />;
    }

    return <MenuStage />;
};

export {
    Game
};
