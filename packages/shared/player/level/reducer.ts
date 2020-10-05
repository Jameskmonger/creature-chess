import { LevelUpdateAction, LEVEL_UPDATE } from "./actions";
import { STARTING_LEVEL } from "@creature-chess/models/src/constants";

export type LevelState = {
    level: number;
    xp: number;
};

const initialState: LevelState = {
    level: STARTING_LEVEL,
    xp: 0
};

export function level(state: LevelState = initialState, action: LevelUpdateAction): LevelState {
    switch (action.type) {
        case LEVEL_UPDATE:
            return {
                level: action.payload.level,
                xp: action.payload.xp
            };
        default:
            return state;
    }
}
