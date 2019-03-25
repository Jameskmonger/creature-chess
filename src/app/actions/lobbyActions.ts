import { JOIN_GAME } from "../actiontypes/lobbyActionTypes";

export type LobbyAction = ({ type: JOIN_GAME, payload: { name: string } });

export const joinGame = (name: string) => ({
    type: JOIN_GAME,
    payload: {
        name
    }
});
