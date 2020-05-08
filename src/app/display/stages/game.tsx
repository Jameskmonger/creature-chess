import * as React from "react";
import { useSelector } from "react-redux";
import { GameStage } from "./gameStage";
import { AppState } from "@app/store";
import { MenuStage } from "./menuStage";
import { LobbyStage } from "./lobbyStage";

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

    if (gameState === GameState.GAME) {
        return <GameStage />;
    }

    if (gameState === GameState.LOBBY) {
        return <LobbyStage />;
    }

    return <MenuStage />;
};

export {
    Game
};
