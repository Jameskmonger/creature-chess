import { JOIN_COMPLETE } from "../actiontypes/localPlayerActionTypes";

export type JoinCompleteAction = ({
    type: JOIN_COMPLETE,
    payload: {
        playerId: string
    }
});

export const joinCompleteAction = (playerId: string): JoinCompleteAction => ({
    type: JOIN_COMPLETE,
    payload: {
        playerId
    }
});
