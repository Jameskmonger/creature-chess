import { JOIN_COMPLETE, LEVEL_UPDATE } from "../actiontypes/localPlayerActionTypes";

export type JoinCompleteAction = ({
    type: JOIN_COMPLETE,
    payload: {
        playerId: string,
        gameId: string,
        name: string
    }
});
export type LevelUpdateAction = ({ type: LEVEL_UPDATE, payload: { level: number, xp: number } });

export type LocalPlayerAction = JoinCompleteAction | LevelUpdateAction;

export const joinCompleteAction = (playerId: string, gameId: string, name: string): JoinCompleteAction => ({
    type: JOIN_COMPLETE,
    payload: {
        playerId,
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
