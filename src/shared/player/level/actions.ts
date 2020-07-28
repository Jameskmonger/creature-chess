export const LEVEL_UPDATE = "LEVEL_UPDATE";
export type LEVEL_UPDATE = typeof LEVEL_UPDATE;

export type LevelUpdateAction = ({
    type: LEVEL_UPDATE;
    payload: {
        level: number;
        xp: number;
    };
});

export const setLevelAction = (level: number, xp: number): LevelUpdateAction => ({
    type: LEVEL_UPDATE,
    payload: {
        level, xp
    }
});
