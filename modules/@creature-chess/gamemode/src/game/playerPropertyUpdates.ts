import { all, takeLatest } from "redux-saga/effects";
import { select } from "typed-redux-saga";

import {
	PlayerStatus,
	PlayerBattle,
} from "@creature-chess/models/game/playerList";
import { PlayerStreak } from "@creature-chess/models/player";

import { PlayerEntity } from "../entities";
import { PlayerCommands, PlayerStateSelectors } from "../entities/player";

// todo use sagas properly here
export const listenForPropertyUpdates = (
	player: PlayerEntity,
	{
		health: emitHealth,
		streak: emitStreak,
		status: emitStatus,
		battle: emitBattle,
		ready: emitReady,
	}: {
		health?: (health: number) => void;
		streak?: (streak: PlayerStreak) => void;
		status?: (status: PlayerStatus) => void;
		battle?: (battle: PlayerBattle) => void;
		ready?: (ready: boolean) => void;
	}
) => {
	const saga = player.runSaga(function* () {
		const sagas = [];

		if (emitHealth) {
			const initialHealth = yield* select(PlayerStateSelectors.getPlayerHealth);
			emitHealth(initialHealth);

			sagas.push(
				takeLatest<PlayerCommands.UpdateHealthCommand>(
					PlayerCommands.updateHealthCommand.toString(),
					function* ({ payload: health }) {
						emitHealth(health);
					}
				)
			);
		}

		if (emitStreak) {
			const initialStreak = yield* select(PlayerStateSelectors.getPlayerStreak);
			emitStreak(initialStreak);

			sagas.push(
				takeLatest<PlayerCommands.UpdateStreakCommand>(
					PlayerCommands.updateStreakCommand.toString(),
					function* ({ payload: streak }) {
						emitStreak(streak);
					}
				)
			);
		}

		if (emitStatus) {
			const initialStatus = yield* select(PlayerStateSelectors.getPlayerStatus);
			emitStatus(initialStatus);

			sagas.push(
				takeLatest<PlayerCommands.UpdateStatusCommand>(
					PlayerCommands.updateStatusCommand.toString(),
					function* ({ payload: status }) {
						emitStatus(status);
					}
				)
			);
		}

		if (emitBattle) {
			const initialBattle = yield* select(PlayerStateSelectors.getPlayerBattle);
			emitBattle(initialBattle);

			sagas.push(
				takeLatest<PlayerCommands.UpdateBattleCommand>(
					PlayerCommands.updateBattleCommand.toString(),
					function* ({ payload: battle }) {
						emitBattle(battle);
					}
				)
			);
		}

		if (emitReady) {
			const initialReady = yield* select(PlayerStateSelectors.isPlayerReady);
			emitReady(initialReady);

			sagas.push(
				takeLatest<PlayerCommands.UpdateReadyCommand>(
					PlayerCommands.updateReadyCommand.toString(),
					function* ({ payload: ready }) {
						emitReady(ready);
					}
				)
			);
		}

		yield all(sagas);
	});

	return () => saga.cancel();
};
