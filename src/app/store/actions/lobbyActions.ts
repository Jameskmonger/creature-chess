import { JOIN_LOBBY, UPDATE_LOBBY_PLAYER } from '../actiontypes/lobbyActionTypes';
import { LobbyPlayer } from '@common/models';

export type JoinLobbyAction = ({
    type: JOIN_LOBBY,
    payload: {
        localPlayerId: string;
        lobbyId: string;
        players: LobbyPlayer[]
    }
});

export type UpdateLobbyPlayerAction = ({
    type: UPDATE_LOBBY_PLAYER,
    payload: {
        index: number;
        player: LobbyPlayer;
    }
});

export type LobbyAction = JoinLobbyAction | UpdateLobbyPlayerAction;

export const joinLobbyAction = (localPlayerId: string, lobbyId: string, players: (LobbyPlayer)[]) => ({
    type: JOIN_LOBBY,
    payload: {
        localPlayerId,
        lobbyId,
        players
    }
});

export const updateLobbyPlayerAction = (index: number, player: LobbyPlayer) => ({
    type: UPDATE_LOBBY_PLAYER,
    payload: {
        index,
        player
    }
});