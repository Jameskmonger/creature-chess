import { all, takeLatest } from "redux-saga/effects";
import { PlayerBattle, PlayerStatus } from "@creature-chess/models";
import { PlayerStreak } from "../player/playerInfo/reducer";
import { PlayerInfoCommands } from "../player";
import { PlayerEntity } from "../entities";

// todo use sagas properly here
export const listenForPropertyUpdates = (
	player: PlayerEntity,
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
				PlayerInfoCommands.updateStatusCommand.toString(),
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
			sagas.push(takeLatest<PlayerInfoCommands.UpdateReadyCommand>(
				PlayerInfoCommands.updateReadyCommand.toString(),
				function*({ payload: { ready } }) {
					emitReady(ready);
				}
			));
		}

		yield all(sagas);
	});

	return () => saga.cancel();
};
