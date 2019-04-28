import { JOIN_COMPLETE, JOIN_GAME } from "../actiontypes/gameActionTypes";

export type GameAction =
    ({ type: JOIN_GAME, payload: { name: string } })
    | ({ type: JOIN_COMPLETE, payload: { id: string } });

export const joinGameAction = (name: string) => ({
    type: JOIN_GAME,
    payload: {
        name
    }
});

export const joinCompleteAction = (id: string) => ({
    type: JOIN_COMPLETE,
    payload: {
        id
    }
});
