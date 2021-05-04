import { all, takeLatest } from "@redux-saga/core/effects";
import { PlayerStreak } from "../player/playerInfo/reducer";
import { PlayerBattle, PlayerStatus } from "@creature-chess/models";
import { PlayerInfoCommands } from "../player/playerInfo";
import { readyUpPlayerAction, ReadyUpPlayerAction } from "../player/playerGameActions";
import { Player } from "../player";

export const listenForPropertyUpdates = (
    player: Player,
    fns: {
        health?: (health: number) => void;
        streak?: (streak: PlayerStreak) => void;
        status?: (status: PlayerStatus) => void;
        battle?: (battle: PlayerBattle) => void;
        ready?: (ready: boolean) => void;
    }
) => {
    const saga = player.runSaga(function*() {
        const sagas = [];

        if (fns.health) {
            sagas.push(takeLatest<PlayerInfoCommands.UpdateHealthCommand>(
                PlayerInfoCommands.UPDATE_HEALTH_COMMAND,
                function*({ payload: { health } }) {
                    fns.health(health);
                }
            ));
        }

        if (fns.streak) {
            sagas.push(takeLatest<PlayerInfoCommands.UpdateStreakCommand>(
                PlayerInfoCommands.UPDATE_STREAK_COMMAND,
                function*({ payload: streak }) {
                    fns.streak(streak);
                }
            ));
        }

        if (fns.status) {
            sagas.push(takeLatest<PlayerInfoCommands.UpdateStatusCommand>(
                PlayerInfoCommands.UPDATE_STATUS_COMMAND,
                function*({ payload: { status } }) {
                    fns.status(status);
                }
            ));
        }

        if (fns.battle) {
            sagas.push(takeLatest<PlayerInfoCommands.UpdateBattleCommand>(
                PlayerInfoCommands.UPDATE_BATTLE_COMMAND,
                function*({ payload: { battle } }) {
                    fns.battle(battle);
                }
            ));
        }

        if (fns.ready) {
            // todo create a single "READY_UPDATED" action
            sagas.push(takeLatest<ReadyUpPlayerAction>(
                readyUpPlayerAction.toString(),
                function*() {
                    fns.ready(true);
                }
            ));

            sagas.push(takeLatest<PlayerInfoCommands.ClearOpponentCommand>(
                PlayerInfoCommands.CLEAR_OPPONENT_COMMAND,
                function*() {
                    fns.ready(false);
                }
            ));
        }

        yield all(sagas);
    });

    return () => saga.cancel();
};
