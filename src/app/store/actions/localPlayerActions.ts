import { JOIN_COMPLETE, LEVEL_UPDATE, BUY_XP, READY_UP } from "../actiontypes/localPlayerActionTypes";

export type JoinCompleteAction = ({ type: JOIN_COMPLETE, payload: { playerId: string, gameId: string, name: string } });
export type LevelUpdateAction = ({ type: LEVEL_UPDATE, payload: { level: number, xp: number } });
export type BuyXpAction = ({ type: BUY_XP });
export type ReadyUpAction = ({ type: READY_UP });

export type LocalPlayerAction = JoinCompleteAction | LevelUpdateAction | BuyXpAction | ReadyUpAction;

export const joinCompleteAction = (payload: { playerId: string, gameId: string, name: string }): JoinCompleteAction => ({
    type: JOIN_COMPLETE,
    payload
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
