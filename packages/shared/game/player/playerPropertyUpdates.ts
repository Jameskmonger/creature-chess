import { all, takeLatest } from "@redux-saga/core/effects";
import { SagaMiddleware } from "redux-saga";
import { EventEmitter } from "events";
import { ClearOpponentAction, CLEAR_OPPONENT, HEALTH_UPDATED, STREAK_UPDATED, UpdateHealthAction, UpdateStreakAction } from "../../player/playerInfo";
import { ReadyUpAction, READY_UP } from "../../player/actions";
import { PlayerStreak } from "packages/shared/player/playerInfo/reducer";

enum PlayerPropertyUpdateEvent {
    UPDATE_HEALTH = "UPDATE_HEALTH",
    UPDATE_READY = "UPDATE_READY",
    UPDATE_STREAK = "UPDATE_STREAK"
}

export interface PlayerPropertyUpdateRegistry {
    onHealthUpdate: (fn: (value: number) => void) => void;
    onReadyUpdate: (fn: (value: boolean) => void) => void;
    onStreakUpdate: (fn: (value: PlayerStreak) => void) => void;
}

export const createPropertyUpdateRegistry = (sagaMiddleware: SagaMiddleware): PlayerPropertyUpdateRegistry => {
    const events = new EventEmitter();

    sagaMiddleware.run(function*() {
        yield all([
            yield takeLatest<UpdateHealthAction>(
                HEALTH_UPDATED,
                function*({ payload: { health } }) {
                    events.emit(PlayerPropertyUpdateEvent.UPDATE_HEALTH, health);
                }
            ),
            yield takeLatest<UpdateStreakAction>(
                STREAK_UPDATED,
                function*({ payload: streak }) {
                    events.emit(PlayerPropertyUpdateEvent.UPDATE_STREAK, streak);
                }
            ),

            // todo create a single "READY_UPDATED" action
            yield takeLatest<ReadyUpAction>(
                READY_UP,
                function*() {
                    events.emit(PlayerPropertyUpdateEvent.UPDATE_READY, true);
                }
            ),
            yield takeLatest<ClearOpponentAction>(
                CLEAR_OPPONENT,
                function*() {
                    events.emit(PlayerPropertyUpdateEvent.UPDATE_READY, false);
                }
            )
        ]);
    });

    return {
        onHealthUpdate: (fn: (value: number) => void) =>
            events.on(PlayerPropertyUpdateEvent.UPDATE_HEALTH, fn),
        onReadyUpdate: (fn: (value: boolean) => void) =>
            events.on(PlayerPropertyUpdateEvent.UPDATE_READY, fn),
        onStreakUpdate: (fn: (value: PlayerStreak) => void) =>
            events.on(PlayerPropertyUpdateEvent.UPDATE_STREAK, fn)
    };
};
