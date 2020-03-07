import { JOIN_LOBBY, UPDATE_LOBBY_PLAYER, START_LOBBY_GAME } from "../actiontypes/lobbyActionTypes";
import { LobbyPlayer } from "@common/models";

export type JoinLobbyAction = ({
    type: JOIN_LOBBY,
    payload: {
        localPlayerId: string;
        lobbyId: string;
        players: LobbyPlayer[];
        startTimestamp: number;
        isHost: boolean;
    }
});

export type UpdateLobbyPlayerAction = ({
    type: UPDATE_LOBBY_PLAYER,
    payload: {
        index: number;
        player: LobbyPlayer;
    }
});

export type StartLobbyGameAction = ({ type: START_LOBBY_GAME });

export type LobbyAction = JoinLobbyAction
    | UpdateLobbyPlayerAction
    | StartLobbyGameAction;

export const joinLobbyAction = (localPlayerId: string, lobbyId: string, players: LobbyPlayer[], startTimestamp: number, isHost: boolean): JoinLobbyAction => ({
    type: JOIN_LOBBY,
    payload: {
        localPlayerId,
        lobbyId,
        players,
        startTimestamp,
        isHost
    }
});

export const updateLobbyPlayerAction = (index: number, player: LobbyPlayer): UpdateLobbyPlayerAction => ({
    type: UPDATE_LOBBY_PLAYER,
    payload: {
        index,
        player
    }
});

export const startLobbyGame = () => ({ type: START_LOBBY_GAME });
