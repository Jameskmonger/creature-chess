import { all, takeLatest } from "@redux-saga/core/effects";
import { PlayerStreak } from "../player/playerInfo/reducer";
import { PlayerBattle, PlayerStatus } from "@creature-chess/models";
import { PlayerInfoCommands } from "../player/playerInfo";
import { readyUpPlayerAction, ReadyUpPlayerAction } from "../player/playerGameActions";
import { Player } from "../player";

export const listenForPropertyUpdates = (
    player: Player,
    { health: emitHealth, streak: emitStreak, status: emitStatus, battle: emitBattle, ready: emitReady }: {
        health?: (health: number) => void;
        streak?: (streak: PlayerStreak) => void;
        status?: (status: PlayerStatus) => void;
        battle?: (battle: PlayerBattle) => void;
        ready?: (ready: boolean) => void;
    }
) => {
    const saga = player.runSaga(function*() {
        const sagas = [];

        if (emitHealth) {
            sagas.push(takeLatest<PlayerInfoCommands.UpdateHealthCommand>(
                PlayerInfoCommands.UPDATE_HEALTH_COMMAND,
                function*({ payload: { health } }) {
                    emitHealth(health);
                }
            ));
        }

        if (emitStreak) {
            sagas.push(takeLatest<PlayerInfoCommands.UpdateStreakCommand>(
                PlayerInfoCommands.UPDATE_STREAK_COMMAND,
                function*({ payload: streak }) {
                    emitStreak(streak);
                }
            ));
        }

        if (emitStatus) {
            sagas.push(takeLatest<PlayerInfoCommands.UpdateStatusCommand>(
                PlayerInfoCommands.UPDATE_STATUS_COMMAND,
                function*({ payload: { status } }) {
                    emitStatus(status);
                }
            ));
        }

        if (emitBattle) {
            sagas.push(takeLatest<PlayerInfoCommands.UpdateBattleCommand>(
                PlayerInfoCommands.UPDATE_BATTLE_COMMAND,
                function*({ payload: { battle } }) {
                    emitBattle(battle);
                }
            ));
        }

        if (emitReady) {
            // todo create a single "READY_UPDATED" action
            sagas.push(takeLatest<ReadyUpPlayerAction>(
                readyUpPlayerAction.toString(),
                function*() {
                    emitReady(true);
                }
            ));

            sagas.push(takeLatest<PlayerInfoCommands.ClearOpponentCommand>(
                PlayerInfoCommands.CLEAR_OPPONENT_COMMAND,
                function*() {
                    emitReady(false);
                }
            ));
        }

        yield all(sagas);
    });

    return () => saga.cancel();
};
