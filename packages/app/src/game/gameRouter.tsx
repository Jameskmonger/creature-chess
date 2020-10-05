import * as React from "react";
import { useSelector } from "react-redux";
import { AppState } from "../store";
import { MenuPage } from "./pages/menuPage";
import { LobbyPage } from "./pages/lobbyPage";
import { GamePage } from "./pages/gamePage";
import { NicknameRequestPage } from "./pages/nicknameRequestPage";

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

const GameRouter: React.FunctionComponent = () => {
    const gameState = useSelector<AppState, GameState>(gameStateSelector);
    const requestNicknameMessage = useSelector<AppState, string>(state => state.lobby.requestNicknameMessage);

    if (gameState === GameState.GAME) {
        return <GamePage />;
    }

    if (gameState === GameState.LOBBY) {
        return <LobbyPage />;
    }

    if (requestNicknameMessage) {
        return <NicknameRequestPage message={requestNicknameMessage} />;
    }

    return <MenuPage />;
};

export {
    GameRouter
};
