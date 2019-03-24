import { JOIN_LOBBY, JOIN_LOBBY_SUCCESS } from "../actiontypes/lobbyActionTypes";

export type LobbyAction =
    ({ type: JOIN_LOBBY, payload: { name: string } })
  | ({ type: JOIN_LOBBY_SUCCESS });

export const joinLobby = (name: string) => ({
    type: JOIN_LOBBY,
    payload: {
        name
    }
});

export const joinLobbySuccess = () => ({
    type: JOIN_LOBBY_SUCCESS
});
