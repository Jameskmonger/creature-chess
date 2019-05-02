import { JOIN_COMPLETE, JOIN_GAME, GAME_STATE_PLAYING, MONEY_UPDATE } from "../actiontypes/gameActionTypes";

export type GameAction =
    ({ type: JOIN_GAME, payload: { name: string } })
    | ({ type: JOIN_COMPLETE, payload: { id: string } })
    | ({ type: GAME_STATE_PLAYING, payload: { opponentId: string } })
    | ({ type: MONEY_UPDATE, payload: { money: number } });

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

export const gameStatePlayingAction = (opponentId: string) => ({
    type: GAME_STATE_PLAYING,
    payload: {
        opponentId
    }
});

export const moneyUpdateAction = (money: number) => ({
    type: MONEY_UPDATE,
    payload: {
        money
    }
});
