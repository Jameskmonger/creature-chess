import { all, takeLatest } from "@redux-saga/core/effects";
import { SagaMiddleware } from "redux-saga";
import { EventEmitter } from "events";
import { PlayerStreak } from "../playerInfo/reducer";
import { PlayerBattle, PlayerStatus } from "@creature-chess/models";
import { PlayerInfoActions } from "../playerInfo";
import { ReadyUpAction, READY_UP_ACTION } from "../actions";

enum PlayerPropertyUpdateEvent {
    UPDATE_HEALTH = "UPDATE_HEALTH",
    UPDATE_READY = "UPDATE_READY",
    UPDATE_STREAK = "UPDATE_STREAK",
    UPDATE_BATTLE = "UPDATE_BATTLE",
    UPDATE_STATUS = "UPDATE_STATUS",
}

export interface PlayerPropertyUpdateRegistry {
    onHealthUpdate: (fn: (value: number) => void) => void;
    onReadyUpdate: (fn: (value: boolean) => void) => (() => void);
    onStreakUpdate: (fn: (value: PlayerStreak) => void) => void;
    onBattleUpdate: (fn: (value: PlayerBattle) => void) => void;
    onStatusUpdate: (fn: (value: PlayerStatus) => void) => void;
}

export const createPropertyUpdateRegistry = (sagaMiddleware: SagaMiddleware): PlayerPropertyUpdateRegistry => {
    const events = new EventEmitter();

    sagaMiddleware.run(function*() {
        yield all([
            yield takeLatest<PlayerInfoActions.UpdateHealthAction>(
                PlayerInfoActions.HEALTH_UPDATED,
                function*({ payload: { health } }) {
                    events.emit(PlayerPropertyUpdateEvent.UPDATE_HEALTH, health);
                }
            ),
            yield takeLatest<PlayerInfoActions.UpdateStreakAction>(
                PlayerInfoActions.STREAK_UPDATED,
                function*({ payload: streak }) {
                    events.emit(PlayerPropertyUpdateEvent.UPDATE_STREAK, streak);
                }
            ),
            yield takeLatest<PlayerInfoActions.UpdateStatusAction>(
                PlayerInfoActions.STATUS_UPDATED,
                function*({ payload: { status } }) {
                    events.emit(PlayerPropertyUpdateEvent.UPDATE_STATUS, status);
                }
            ),
            yield takeLatest<PlayerInfoActions.UpdateBattleAction>(
                PlayerInfoActions.BATTLE_UPDATED,
                function*({ payload: { battle } }) {
                    events.emit(PlayerPropertyUpdateEvent.UPDATE_BATTLE, battle);
                }
            ),

            // todo create a single "READY_UPDATED" action
            yield takeLatest<ReadyUpAction>(
                READY_UP_ACTION,
                function*() {
                    events.emit(PlayerPropertyUpdateEvent.UPDATE_READY, true);
                }
            ),
            yield takeLatest<PlayerInfoActions.ClearOpponentAction>(
                PlayerInfoActions.CLEAR_OPPONENT,
                function*() {
                    events.emit(PlayerPropertyUpdateEvent.UPDATE_READY, false);
                }
            )
        ]);
    });

    return {
        onHealthUpdate: (fn: (value: number) => void) =>
            events.on(PlayerPropertyUpdateEvent.UPDATE_HEALTH, fn),
        onReadyUpdate: (fn: (value: boolean) => void) => {
            events.on(PlayerPropertyUpdateEvent.UPDATE_READY, fn);

            return () => events.off(PlayerPropertyUpdateEvent.UPDATE_READY, fn);
        },
        onStreakUpdate: (fn: (value: PlayerStreak) => void) =>
            events.on(PlayerPropertyUpdateEvent.UPDATE_STREAK, fn),
        onBattleUpdate: (fn: (value: PlayerBattle) => void) =>
            events.on(PlayerPropertyUpdateEvent.UPDATE_BATTLE, fn),
        onStatusUpdate: (fn: (value: PlayerStatus) => void) =>
            events.on(PlayerPropertyUpdateEvent.UPDATE_STATUS, fn)
    };
};
