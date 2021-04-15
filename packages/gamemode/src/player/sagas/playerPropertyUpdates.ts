import { all, takeLatest } from "@redux-saga/core/effects";
import { SagaMiddleware } from "redux-saga";
import { EventEmitter } from "events";
import { PlayerStreak } from "../playerInfo/reducer";
import { PlayerBattle, PlayerStatus } from "@creature-chess/models";
import { PlayerInfoCommands } from "../playerInfo";
import { readyUpPlayerAction, ReadyUpPlayerAction } from "../playerGameActions";

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
            yield takeLatest<PlayerInfoCommands.UpdateHealthCommand>(
                PlayerInfoCommands.UPDATE_HEALTH_COMMAND,
                function*({ payload: { health } }) {
                    events.emit(PlayerPropertyUpdateEvent.UPDATE_HEALTH, health);
                }
            ),
            yield takeLatest<PlayerInfoCommands.UpdateStreakCommand>(
                PlayerInfoCommands.UPDATE_STREAK_COMMAND,
                function*({ payload: streak }) {
                    events.emit(PlayerPropertyUpdateEvent.UPDATE_STREAK, streak);
                }
            ),
            yield takeLatest<PlayerInfoCommands.UpdateStatusCommand>(
                PlayerInfoCommands.UPDATE_STATUS_COMMAND,
                function*({ payload: { status } }) {
                    events.emit(PlayerPropertyUpdateEvent.UPDATE_STATUS, status);
                }
            ),
            yield takeLatest<PlayerInfoCommands.UpdateBattleCommand>(
                PlayerInfoCommands.UPDATE_BATTLE_COMMAND,
                function*({ payload: { battle } }) {
                    events.emit(PlayerPropertyUpdateEvent.UPDATE_BATTLE, battle);
                }
            ),

            // todo create a single "READY_UPDATED" action
            yield takeLatest<ReadyUpPlayerAction>(
                readyUpPlayerAction.toString(),
                function*() {
                    events.emit(PlayerPropertyUpdateEvent.UPDATE_READY, true);
                }
            ),
            yield takeLatest<PlayerInfoCommands.ClearOpponentCommand>(
                PlayerInfoCommands.CLEAR_OPPONENT_COMMAND,
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
