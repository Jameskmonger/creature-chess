import { JOIN_COMPLETE } from "../actiontypes/localPlayerActionTypes";

export type JoinCompleteAction = ({
    type: JOIN_COMPLETE,
    payload: {
        playerId: string,
        gameId: string,
        name: string
    }
});

export const joinCompleteAction = (playerId: string, gameId: string, name: string): JoinCompleteAction => ({
    type: JOIN_COMPLETE,
    payload: {
        playerId,
        gameId,
        name
    }
});
