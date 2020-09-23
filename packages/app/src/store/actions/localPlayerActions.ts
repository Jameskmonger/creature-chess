import { JOIN_COMPLETE } from "../actiontypes/localPlayerActionTypes";

export type JoinCompleteAction = ({
    type: JOIN_COMPLETE,
    payload: {
        playerId: string,
        name: string
    }
});

export const joinCompleteAction = (playerId: string, name: string): JoinCompleteAction => ({
    type: JOIN_COMPLETE,
    payload: {
        playerId,
        name
    }
});
