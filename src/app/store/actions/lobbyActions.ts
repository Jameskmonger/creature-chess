import { JOIN_LOBBY, UPDATE_LOBBY_PLAYER, UPDATE_LOBBY_SECONDS_REMAINING } from '../actiontypes/lobbyActionTypes';
import { LobbyPlayer } from '@common/models';

export type JoinLobbyAction = ({
    type: JOIN_LOBBY,
    payload: {
        localPlayerId: string;
        lobbyId: string;
        players: LobbyPlayer[];
        startTimestamp: number;
    }
});

export type UpdateLobbyPlayerAction = ({
    type: UPDATE_LOBBY_PLAYER,
    payload: {
        index: number;
        player: LobbyPlayer;
    }
});

export type UpdateLobbySecondsRemainingAction = ({
    type: UPDATE_LOBBY_SECONDS_REMAINING,
    payload: {
        secondsRemaining: number
    }
});

export type LobbyAction = JoinLobbyAction | UpdateLobbyPlayerAction | UpdateLobbySecondsRemainingAction;

export const joinLobbyAction = (localPlayerId: string, lobbyId: string, players: LobbyPlayer[], startTimestamp: number): JoinLobbyAction => ({
    type: JOIN_LOBBY,
    payload: {
        localPlayerId,
        lobbyId,
        players,
        startTimestamp
    }
});

export const updateLobbyPlayerAction = (index: number, player: LobbyPlayer): UpdateLobbyPlayerAction => ({
    type: UPDATE_LOBBY_PLAYER,
    payload: {
        index,
        player
    }
});

export const updateLobbySecondsRemaining = (secondsRemaining: number): UpdateLobbySecondsRemainingAction => ({
    type: UPDATE_LOBBY_SECONDS_REMAINING,
    payload: {
        secondsRemaining
    }
});