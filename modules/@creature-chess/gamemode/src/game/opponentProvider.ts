import { Rng, pickRandom, shuffleInPlace } from "@shoki/random";

import { PlayerStatus } from "@creature-chess/models";

import { PlayerStateSelectors } from "../entities/player";
import { Player } from "../entities/player/player";

type Matchup = { homeId: string; awayId: string; awayIsClone: boolean };

export class OpponentProvider {
	private remainingRotations: number[] | null = null;
	private lastLivingPlayerCount: number = 0;

	private ghostRecipientCount: Map<string, number> = new Map();
	private ghostSourceCount: Map<string, number> = new Map();
	private lastOpponent: Map<string, string> = new Map();
	private lastGhostRecipientId: string | null = null;
	private lastGhostSourceId: string | null = null;

	private players: Player[] | null = null;
	private rng: Rng;

	public constructor(rng: Rng = Math.random) {
		this.rng = rng;
	}

	public setPlayers(players: Player[]) {
		this.players = players;
	}

	public getMatchups = (): Matchup[] => {
		const livingPlayers = this.getLivingPlayers();
		const livingPlayerCount = livingPlayers.length;

		if (livingPlayerCount !== this.lastLivingPlayerCount) {
			this.lastLivingPlayerCount = livingPlayerCount;
			this.remainingRotations = null;
		}

		if (livingPlayerCount < 2) {
			return [];
		}

		const isOdd = livingPlayers.length % 2 !== 0;
		let cloneMatchup: Matchup | null = null;
		let innerPlayers = livingPlayers;

		if (isOdd) {
			const recipient = this.pickGhostRecipient(livingPlayers);
			innerPlayers = livingPlayers.filter((p) => p.id !== recipient.id);
			const source = this.pickGhostSource(recipient, innerPlayers);

			this.ghostRecipientCount.set(
				recipient.id,
				(this.ghostRecipientCount.get(recipient.id) ?? 0) + 1
			);
			this.ghostSourceCount.set(
				source.id,
				(this.ghostSourceCount.get(source.id) ?? 0) + 1
			);
			this.lastGhostRecipientId = recipient.id;
			this.lastGhostSourceId = source.id;

			cloneMatchup = {
				homeId: recipient.id,
				awayId: source.id,
				awayIsClone: true,
			};
		}

		const rotation = isOdd
			? this.pickBestRotationFreely(innerPlayers)
			: this.takeRotationFromPool(innerPlayers);
		const innerMatchups = this.getMatchupsEven(innerPlayers, rotation);

		const matchups = cloneMatchup
			? [cloneMatchup, ...innerMatchups]
			: innerMatchups;

		this.recordLastOpponents(matchups);

		return matchups;
	};

	private takeRotationFromPool(innerPlayers: Player[]): number {
		if (
			this.remainingRotations === null ||
			this.remainingRotations.length === 0
		) {
			this.generateRotations(innerPlayers);
		}
		const pool = this.remainingRotations!;
		let bestIdx = 0;
		let bestScore = Infinity;
		for (let i = 0; i < pool.length; i++) {
			const score = this.countRepeats(innerPlayers, pool[i]);
			if (score < bestScore) {
				bestScore = score;
				bestIdx = i;
				if (score === 0) {
					break;
				}
			}
		}
		return pool.splice(bestIdx, 1)[0];
	}

	private pickBestRotationFreely(innerPlayers: Player[]): number {
		const ringSize = Math.max(1, innerPlayers.length - 1);
		const candidates: number[] = [];
		for (let i = 0; i < ringSize; i++) {
			candidates.push(i);
		}
		shuffleInPlace(candidates, this.rng);

		let best = candidates[0];
		let bestScore = Infinity;
		for (const r of candidates) {
			const score = this.countRepeats(innerPlayers, r);
			if (score < bestScore) {
				bestScore = score;
				best = r;
				if (score === 0) {
					break;
				}
			}
		}
		return best;
	}

	private countRepeats(players: Player[], rotation: number): number {
		if (players.length < 2) {
			return 0;
		}
		const pairings = this.circlePairings(players, rotation);
		let count = 0;
		for (const { a, b } of pairings) {
			if (this.lastOpponent.get(a.id) === b.id) {
				count += 1;
			}
			if (this.lastOpponent.get(b.id) === a.id) {
				count += 1;
			}
		}
		return count;
	}

	private getLivingPlayers() {
		if (!this.players) {
			return [];
		}
		return this.players.filter(
			(p) =>
				p.select(PlayerStateSelectors.getPlayerStatus) !== PlayerStatus.QUIT &&
				p.select(PlayerStateSelectors.isPlayerAlive)
		);
	}

	private generateRotations(livingPlayers: Player[]) {
		const rotations: number[] = [];
		for (let i = 0; i < livingPlayers.length - 1; i++) {
			rotations.push(i);
		}
		this.remainingRotations = shuffleInPlace(rotations, this.rng);
	}

	private getMatchupsEven(players: Player[], rotation: number): Matchup[] {
		return this.circlePairings(players, rotation).map(({ a, b }) =>
			this.toMatchup(a, b)
		);
	}

	// Circle-method round-robin: fix the last player, rotate the rest.
	private circlePairings(
		players: Player[],
		rotation: number
	): { a: Player; b: Player }[] {
		const n = players.length;
		const ringSize = n - 1;
		const fixed = players[ringSize];
		const r = ((rotation % ringSize) + ringSize) % ringSize;

		const pairings: { a: Player; b: Player }[] = [{ a: fixed, b: players[r] }];
		for (let i = 1; i < n / 2; i++) {
			const aIdx = (r + i) % ringSize;
			const bIdx = (((r - i) % ringSize) + ringSize) % ringSize;
			pairings.push({ a: players[aIdx], b: players[bIdx] });
		}
		return pairings;
	}

	private toMatchup(a: Player, b: Player): Matchup {
		const aIsHome = Math.floor(this.rng() * 2) === 0;
		return aIsHome
			? { homeId: a.id, awayId: b.id, awayIsClone: false }
			: { homeId: b.id, awayId: a.id, awayIsClone: false };
	}

	private pickGhostRecipient(candidates: Player[]): Player {
		// Re-picking the prior recipient freezes the inner set, forcing pair repeats.
		const filtered = candidates.filter(
			(p) => p.id !== this.lastGhostRecipientId
		);
		const pool = filtered.length > 0 ? filtered : candidates;
		return this.pickWithLowestCount(pool, this.ghostRecipientCount);
	}

	private pickGhostSource(recipient: Player, candidates: Player[]): Player {
		const recipientLast = this.lastOpponent.get(recipient.id);
		const blockers = new Set<string>();
		if (recipientLast !== undefined) {
			blockers.add(recipientLast);
		}
		if (this.lastGhostSourceId !== null) {
			blockers.add(this.lastGhostSourceId);
		}
		const filtered = candidates.filter((p) => !blockers.has(p.id));
		const pool = filtered.length > 0 ? filtered : candidates;
		return this.pickWithLowestCount(pool, this.ghostSourceCount);
	}

	private pickWithLowestCount(
		candidates: Player[],
		counts: Map<string, number>
	): Player {
		let lowest = Infinity;
		const tied: Player[] = [];
		for (const p of candidates) {
			const c = counts.get(p.id) ?? 0;
			if (c < lowest) {
				lowest = c;
				tied.length = 0;
				tied.push(p);
			} else if (c === lowest) {
				tied.push(p);
			}
		}
		return pickRandom(tied, this.rng);
	}

	private recordLastOpponents(matchups: Matchup[]) {
		for (const m of matchups) {
			this.lastOpponent.set(m.homeId, m.awayId);
			if (!m.awayIsClone) {
				this.lastOpponent.set(m.awayId, m.homeId);
			}
		}
	}
}
