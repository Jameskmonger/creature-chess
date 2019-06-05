import { Reducer } from "react";

const LOCK_EVOLUTIONS = "LOCK_EVOLUTIONS";
type LOCK_EVOLUTIONS = typeof LOCK_EVOLUTIONS;
export const UNLOCK_EVOLUTIONS = "UNLOCK_EVOLUTIONS";
type UNLOCK_EVOLUTIONS = typeof UNLOCK_EVOLUTIONS;

type LockEvolutionsAction =
    ({ type: LOCK_EVOLUTIONS })
    | ({ type: UNLOCK_EVOLUTIONS });

export const LockEvolutionActions = {
    lockEvolutionAction: () => ({ type: LOCK_EVOLUTIONS }),
    unlockEvolutionAction: () => ({ type: UNLOCK_EVOLUTIONS })
};

const initialState = false;

export const evolutionLockedReducer: Reducer<boolean, LockEvolutionsAction> = (state = initialState, action) => {
    switch (action.type) {
        case LOCK_EVOLUTIONS:
            return true;
        case UNLOCK_EVOLUTIONS:
            return false;
        default: {
            return state;
        }
    }
};
