import {
	PlayerStatus,
	PlayerBattle,
} from "@creature-chess/models";
import { PlayerStreak } from "@creature-chess/models";

import { Player } from "../entities/player/player";
import { PlayerCommands, PlayerStateSelectors } from "../entities/player";

export const listenForPropertyUpdates = (
	player: Player,
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
	const unsubscribes: (() => void)[] = [];

	if (emitHealth) {
		emitHealth(player.select(PlayerStateSelectors.getPlayerHealth));

		unsubscribes.push(
			player.addListener({
				actionCreator: PlayerCommands.playerInfoCommands.updateHealthCommand,
				effect: async ({ payload: health }) => {
					emitHealth(health);
				},
			})
		);
	}

	if (emitStreak) {
		emitStreak(player.select(PlayerStateSelectors.getPlayerStreak));

		unsubscribes.push(
			player.addListener({
				actionCreator: PlayerCommands.playerInfoCommands.updateStreakCommand,
				effect: async ({ payload: streak }) => {
					emitStreak(streak);
				},
			})
		);
	}

	if (emitStatus) {
		emitStatus(player.select(PlayerStateSelectors.getPlayerStatus));

		unsubscribes.push(
			player.addListener({
				actionCreator: PlayerCommands.playerInfoCommands.updateStatusCommand,
				effect: async ({ payload: status }) => {
					emitStatus(status);
				},
			})
		);
	}

	if (emitBattle) {
		emitBattle(player.select(PlayerStateSelectors.getPlayerBattle));

		unsubscribes.push(
			player.addListener({
				actionCreator: PlayerCommands.playerInfoCommands.updateBattleCommand,
				effect: async ({ payload: battle }) => {
					emitBattle(battle);
				},
			})
		);
	}

	if (emitReady) {
		emitReady(player.select(PlayerStateSelectors.isPlayerReady));

		unsubscribes.push(
			player.addListener({
				actionCreator: PlayerCommands.playerInfoCommands.updateReadyCommand,
				effect: async ({ payload: ready }) => {
					emitReady(ready);
				},
			})
		);
	}

	return () => unsubscribes.forEach((fn) => fn());
};
