import { JOIN_LOBBY } from "../actiontypes/lobbyActionTypes";

export type LobbyAction = ({ type: JOIN_LOBBY, payload: { name: string } });

export const joinLobby = (name: string) => ({
    type: JOIN_LOBBY,
    payload: {
        name
    }
});
