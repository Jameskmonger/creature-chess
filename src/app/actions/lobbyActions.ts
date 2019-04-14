import { JOIN_GAME, JOIN_COMPLETE } from "../actiontypes/lobbyActionTypes";

export type LobbyAction =
    ({ type: JOIN_GAME, payload: { name: string } })
    | ({ type: JOIN_COMPLETE });

export const joinGameAction = (name: string) => ({
    type: JOIN_GAME,
    payload: {
        name
    }
});

export const joinCompleteAction = () => ({
    type: JOIN_COMPLETE
});
