import { JOIN_LOBBY, UPDATE_LOBBY_PLAYER } from '../actiontypes/lobbyActionTypes';

export type JoinLobbyAction = ({
    type: JOIN_LOBBY,
    payload: {
        localPlayerId: string;
        lobbyId: string;
        players: ({ id: string, name: string })[]
    }
});

export type UpdateLobbyPlayerAction = ({
    type: UPDATE_LOBBY_PLAYER,
    payload: {
        index: number;
        player: { id: string, name: string };
    }
});

export type LobbyAction = JoinLobbyAction | UpdateLobbyPlayerAction;