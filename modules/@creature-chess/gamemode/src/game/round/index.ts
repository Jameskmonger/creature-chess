import delay from "delay";

import { GamePhase } from "@creature-chess/models";

import { Player } from "../../entities/player/player";
import { GameContext } from "../gameContext";
import { Match } from "../match";
import { readyNotifier } from "../readyNotifier";

export type RoundCallbacks = {
	onTurnComplete?: (timeMs: number) => void;
	onMatchStart?: () => void;
	onMatchEnd?: () => void;
};

/**
 * One iteration of the game's outer loop: preparing → ready → playing.
 *
 * Round owns phase orchestration: timing, cross-player coordination, match
 * fan-out. What each phase *does* to a player lives in PhaseRules — Round
 * calls into it.
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
		const { gamemode, players, settings, phaseRules } = this.context;

		gamemode.setRoundInfo({
			phase: GamePhase.PREPARING,
			startedAt: Date.now() / 1000,
			round: this.roundNumber,
		});

		players.getLiving().forEach((p) => phaseRules.onPreparingPhaseStart(p));

		const notifier = readyNotifier(players.getLiving());

		await Promise.race([
			notifier.promise,
			delay(settings.preparingPhaseLengthMs),
		]);

		notifier.dispose();
	}

	private async runReady(): Promise<Match[]> {
		const { gamemode, players, getMatchups, logger, settings, phaseRules } =
			this.context;

		players.getAll().forEach((p) => phaseRules.onBeforeReadyPhaseStart(p));

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
				gamemode.pieceRegistry,
				homePlayer,
				awayPlayer,
				awayIsClone,
				logger,
				settings,
				this.callbacks.onTurnComplete
			);
			matches.push(match);

			phaseRules.onReadyPhaseStart(homePlayer, match);
			if (!awayIsClone) {
				phaseRules.onReadyPhaseStart(awayPlayer, match);
			}
		});

		gamemode.setRoundInfo({
			phase: GamePhase.READY,
			startedAt: Date.now() / 1000,
		});

		if (settings.readyPhaseLengthMs > 0) {
			await delay(settings.readyPhaseLengthMs);
		}

		return matches;
	}

	private async runPlaying(matches: Match[]): Promise<void> {
		const { gamemode, settings, phaseRules } = this.context;

		const battleTimeout =
			settings.playingPhaseMaxLengthMs > 0
				? delay(settings.playingPhaseMaxLengthMs)
				: Promise.resolve();

		gamemode.setRoundInfo({
			phase: GamePhase.PLAYING,
			startedAt: Date.now() / 1000,
		});

		await Promise.all(
			matches.map(async (match) => {
				this.callbacks.onMatchStart?.();
				const { homeScore, awayScore } = await match.fight(battleTimeout);
				this.callbacks.onMatchEnd?.();

				const settle = (player: Player, isHomePlayer: boolean) =>
					phaseRules.onMatchSettled(player, {
						homeScore,
						awayScore,
						isHomePlayer,
					});
				settle(match.home, true);
				if (!match.awayIsClone) {
					settle(match.away, false);
				}
			})
		);

		// some battles go right up to the end, so it's nice to have a delay
		// rather than jumping straight into the next phase
		if (settings.playingPhaseEndDelayMs > 0) {
			await delay(settings.playingPhaseEndDelayMs);
		}
	}
}
