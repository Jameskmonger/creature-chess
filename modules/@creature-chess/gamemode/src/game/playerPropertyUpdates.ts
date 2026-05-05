import { PlayerBattle, PlayerStatus, PlayerStreak } from "@creature-chess/models";

import { Player } from "../entities/player/player";
import { playerInfoCommands } from "../entities/player/state/playerInfo/reducer";

type PropertyEmitters = {
	health?: (health: number) => void;
	streak?: (streak: PlayerStreak) => void;
	status?: (status: PlayerStatus) => void;
	battle?: (battle: PlayerBattle | null) => void;
	ready?: (ready: boolean) => void;
};

export const listenForPropertyUpdates = (
	player: Player,
	{ health, streak, status, battle, ready }: PropertyEmitters
) => {
	const unsubscribes: (() => void)[] = [];

	if (health) {
		health(player.health);
		unsubscribes.push(
			player.addListener({
				actionCreator: playerInfoCommands.updateHealthCommand,
				effect: async ({ payload }) => health(payload),
			})
		);
	}

	if (streak) {
		streak(player.streak);
		unsubscribes.push(
			player.addListener({
				actionCreator: playerInfoCommands.updateStreakCommand,
				effect: async ({ payload }) => streak(payload),
			})
		);
	}

	if (status) {
		status(player.status);
		unsubscribes.push(
			player.addListener({
				actionCreator: playerInfoCommands.updateStatusCommand,
				effect: async ({ payload }) => status(payload),
			})
		);
	}

	if (battle) {
		battle(player.battle);
		unsubscribes.push(
			player.addListener({
				actionCreator: playerInfoCommands.updateBattleCommand,
				effect: async ({ payload }) => battle(payload),
			})
		);
	}

	if (ready) {
		ready(player.ready);
		unsubscribes.push(
			player.addListener({
				actionCreator: playerInfoCommands.updateReadyCommand,
				effect: async ({ payload }) => ready(payload),
			})
		);
	}

	return () => unsubscribes.forEach((fn) => fn());
};
