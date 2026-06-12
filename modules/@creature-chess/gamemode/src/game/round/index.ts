import delay from "delay";

import { GamePhase } from "@creature-chess/models";

import { Player } from "../../entities/player/player";
import { GameContext } from "../gameContext";
import { Match } from "../match";

export type RoundCallbacks = {
	onTurnComplete?: (timeMs: number) => void;
	onMatchStart?: () => void;
	onMatchEnd?: () => void;
};

/**
 * One iteration of the game's outer loop: preparing -> ready -> playing.
 */
export class Round {
	public constructor(
		public readonly roundNumber: number,
		private context: GameContext,
		private callbacks: RoundCallbacks = {}
	) {}

	public async run(): Promise<void> {
		await this.runPreparing();
		const matches = await this.runReady();
		await this.runPlaying(matches);
	}

	private async runPreparing(): Promise<void> {
		const { gamemode, players, settings, playerRound } = this.context;

		gamemode.setRoundInfo({
			phase: GamePhase.PREPARING,
			startedAt: Date.now() / 1000,
			round: this.roundNumber,
		});

		gamemode.pluginEvents.emit("roundPhaseChange", {
			gameId: gamemode.id,
			roundNumber: this.roundNumber,
			from: null,
			to: "preparing",
		});

		const living = players.getLiving();
		living.forEach((p) => playerRound.prepare(p));

		const wait = this.waitForAllReady(living);
		const timeout = delay(settings.preparingPhaseLengthMs);

		await Promise.race([wait.promise, timeout]);

		wait.dispose();
		timeout.clear();
	}

	private waitForAllReady(players: Player[]): {
		promise: Promise<void>;
		dispose: () => void;
	} {
		if (players.length === 0) {
			return { promise: Promise.resolve(), dispose: () => undefined };
		}

		const readied = new Set<string>();
		const unsubs: (() => void)[] = [];
		let resolve!: () => void;
		const promise = new Promise<void>((r) => {
			resolve = r;
		});

		const dispose = () => {
			unsubs.forEach((fn) => fn());
			unsubs.length = 0;
		};

		const markReady = (playerId: string) => {
			readied.add(playerId);
			if (readied.size === players.length) {
				dispose();
				resolve();
			}
		};

		for (const player of players) {
			unsubs.push(
				player.events.onInfoUpdate(
					"ready",
					(ready) => {
						if (ready) {
							markReady(player.id);
						}
					},
					{ emitInitial: false }
				)
			);

			unsubs.push(
				player.events.onQuit(() => {
					if (player.alive) {
						markReady(player.id);
					}
				})
			);
		}

		return { promise, dispose };
	}

	private async runReady(): Promise<Match[]> {
		const { gamemode, players, getMatchups, logger, settings, playerRound } =
			this.context;

		players.getAll().forEach((p) => playerRound.deploy(p));

		if (settings.readyPhaseSettleMs > 0) {
			await delay(settings.readyPhaseSettleMs);
		}

		const matches: Match[] = [];

		getMatchups().forEach(({ homeId, awayId, awayIsClone }) => {
			const homePlayer = players.getById(homeId);
			const awayPlayer = players.getById(awayId);

			// todo add logging here
			if (!homePlayer || !awayPlayer) {
				return;
			}

			const match = new Match(
				gamemode.id,
				gamemode.pieceRegistry,
				homePlayer,
				awayPlayer,
				awayIsClone,
				logger,
				settings,
				gamemode.pluginEvents,
				gamemode.creatures,
				this.callbacks.onTurnComplete
			);
			matches.push(match);

			playerRound.engage(homePlayer, match);
			if (!awayIsClone) {
				playerRound.engage(awayPlayer, match);
			}
		});

		gamemode.setRoundInfo({
			phase: GamePhase.READY,
			startedAt: Date.now() / 1000,
		});

		gamemode.pluginEvents.emit("roundPhaseChange", {
			gameId: gamemode.id,
			roundNumber: this.roundNumber,
			from: "preparing",
			to: "ready",
		});

		if (settings.readyPhaseLengthMs > 0) {
			await delay(settings.readyPhaseLengthMs);
		}

		return matches;
	}

	private async runPlaying(matches: Match[]): Promise<void> {
		const { gamemode, settings, playerRound } = this.context;

		const battleTimeout =
			settings.playingPhaseMaxLengthMs > 0
				? delay(settings.playingPhaseMaxLengthMs)
				: Promise.resolve();

		gamemode.setRoundInfo({
			phase: GamePhase.PLAYING,
			startedAt: Date.now() / 1000,
		});

		gamemode.pluginEvents.emit("roundPhaseChange", {
			gameId: gamemode.id,
			roundNumber: this.roundNumber,
			from: "ready",
			to: "playing",
		});

		await Promise.all(
			matches.map(async (match) => {
				this.callbacks.onMatchStart?.();
				const { homeScore, awayScore } = await match.fight(battleTimeout);
				this.callbacks.onMatchEnd?.();

				const settle = (player: Player, isHomePlayer: boolean) =>
					playerRound.settle(player, {
						homeScore,
						awayScore,
						isHomePlayer,
					});
				settle(match.home, true);
				if (!match.awayIsClone) {
					settle(match.away, false);
				}

				const winnerId =
					homeScore > awayScore
						? match.home.id
						: awayScore > homeScore
							? match.away.id
							: null;
				const damageToLoser =
					winnerId === null
						? 0
						: winnerId === match.home.id
							? homeScore
							: awayScore;
				gamemode.pluginEvents.emit("matchSettled", {
					gameId: gamemode.id,
					homeId: match.home.id,
					awayId: match.away.id,
					winnerId,
					damageToLoser,
				});
			})
		);

		// some battles go right up to the end, so it's nice to have a delay
		// rather than jumping straight into the next phase
		if (settings.playingPhaseEndDelayMs > 0) {
			await delay(settings.playingPhaseEndDelayMs);
		}
	}
}
