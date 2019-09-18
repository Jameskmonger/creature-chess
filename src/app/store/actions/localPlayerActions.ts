import { JOIN_COMPLETE, LEVEL_UPDATE, BUY_XP, READY_UP, UPDATE_RECONNECT_SECRET } from "../actiontypes/localPlayerActionTypes";

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
export type BuyXpAction = ({ type: BUY_XP });
export type ReadyUpAction = ({ type: READY_UP });
export type UpdateReconnectSecretAction = ({ type: UPDATE_RECONNECT_SECRET, payload: { secret: string } });

export type LocalPlayerAction = JoinCompleteAction | LevelUpdateAction | BuyXpAction | ReadyUpAction | UpdateReconnectSecretAction;

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

export const buyXpAction = () => ({
    type: BUY_XP
});

export const readyUpAction = () => ({
    type: READY_UP
});

export const updateReconnectSecret = (secret: string): UpdateReconnectSecretAction => ({
    type: UPDATE_RECONNECT_SECRET,
    payload: {
        secret
    }
});
