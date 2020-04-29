import { JOIN_COMPLETE, LEVEL_UPDATE, UPDATE_RECONNECT_SECRET } from "../actiontypes/localPlayerActionTypes";

export type JoinCompleteAction = ({
    type: JOIN_COMPLETE,
    payload: {
        playerId: string,
        reconnectionSecret: string,
        gameId: string,
        name: string
    }
});
export type LevelUpdateAction = ({ type: LEVEL_UPDATE, payload: { level: number, xp: number } });
export type UpdateReconnectSecretAction = ({ type: UPDATE_RECONNECT_SECRET, payload: { secret: string } });

export type LocalPlayerAction = JoinCompleteAction | LevelUpdateAction | UpdateReconnectSecretAction;

export const joinCompleteAction = (playerId: string, reconnectionSecret: string, gameId: string, name: string): JoinCompleteAction => ({
    type: JOIN_COMPLETE,
    payload: {
        playerId,
        reconnectionSecret,
        gameId,
        name
    }
});

export const localPlayerLevelUpdate = (level: number, xp: number): LevelUpdateAction => ({
    type: LEVEL_UPDATE,
    payload: {
        level,
        xp
    }
});

export const updateReconnectSecret = (secret: string): UpdateReconnectSecretAction => ({
    type: UPDATE_RECONNECT_SECRET,
    payload: {
        secret
    }
});
