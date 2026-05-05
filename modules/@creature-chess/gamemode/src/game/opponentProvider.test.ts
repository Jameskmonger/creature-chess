import { createRng } from "@shoki/random";

import { PlayerStatus } from "@creature-chess/models";

import { Player } from "../entities/player/player";
import { OpponentProvider } from "./opponentProvider";

const stubPlayer = (id: string, alive = true): Player =>
	({
		id,
		status: alive ? PlayerStatus.CONNECTED : PlayerStatus.DEAD,
		alive,
	}) as unknown as Player;

const makeProvider = (ids: string[], seed = 1) => {
	const provider = new OpponentProvider(createRng(seed));
	provider.setPlayers(ids.map((id) => stubPlayer(id)));
	return provider;
};

const collectPairs = (
	matchups: { homeId: string; awayId: string; awayIsClone: boolean }[]
) =>
	matchups
		.filter((m) => !m.awayIsClone)
		.map((m) => [m.homeId, m.awayId].sort().join("|"));

describe("OpponentProvider", () => {
	describe("even player counts", () => {
		it("covers every unique pair exactly once across one rotation cycle (4 players)", () => {
			const provider = makeProvider(["A", "B", "C", "D"]);
			const seen = new Map<string, number>();
			for (let r = 0; r < 3; r++) {
				for (const pair of collectPairs(provider.getMatchups())) {
					seen.set(pair, (seen.get(pair) ?? 0) + 1);
				}
			}
			// 6 unique pairs in 4 players, each appears exactly once
			expect(seen.size).toBe(6);
			for (const count of seen.values()) {
				expect(count).toBe(1);
			}
		});

		it("covers every unique pair exactly once across one rotation cycle (6 players)", () => {
			const provider = makeProvider(["A", "B", "C", "D", "E", "F"]);
			const seen = new Map<string, number>();
			for (let r = 0; r < 5; r++) {
				for (const pair of collectPairs(provider.getMatchups())) {
					seen.set(pair, (seen.get(pair) ?? 0) + 1);
				}
			}
			// 15 unique pairs in 6 players
			expect(seen.size).toBe(15);
			for (const count of seen.values()) {
				expect(count).toBe(1);
			}
		});

		it("never repeats an opponent for any player within a pool cycle (8 players)", () => {
			const provider = makeProvider(["A", "B", "C", "D", "E", "F", "G", "H"]);
			const opponentsByPlayer = new Map<string, Set<string>>();
			for (let r = 0; r < 7; r++) {
				const matchups = provider.getMatchups();
				for (const m of matchups) {
					const a = opponentsByPlayer.get(m.homeId) ?? new Set();
					const b = opponentsByPlayer.get(m.awayId) ?? new Set();
					expect(a.has(m.awayId)).toBe(false);
					expect(b.has(m.homeId)).toBe(false);
					a.add(m.awayId);
					b.add(m.homeId);
					opponentsByPlayer.set(m.homeId, a);
					opponentsByPlayer.set(m.awayId, b);
				}
			}
			// each player has played all 7 others
			for (const set of opponentsByPlayer.values()) {
				expect(set.size).toBe(7);
			}
		});
	});

	describe("odd player counts", () => {
		it("distributes ghost recipient slots evenly", () => {
			const provider = makeProvider(["A", "B", "C", "D", "E"]);
			const recipientCounts = new Map<string, number>();
			for (let r = 0; r < 25; r++) {
				const matchups = provider.getMatchups();
				const ghost = matchups.find((m) => m.awayIsClone);
				expect(ghost).toBeDefined();
				recipientCounts.set(
					ghost!.homeId,
					(recipientCounts.get(ghost!.homeId) ?? 0) + 1
				);
			}
			for (const id of ["A", "B", "C", "D", "E"]) {
				expect(recipientCounts.get(id)).toBe(5);
			}
		});

		it("distributes ghost source slots evenly", () => {
			const provider = makeProvider(["A", "B", "C", "D", "E"]);
			const sourceCounts = new Map<string, number>();
			for (let r = 0; r < 25; r++) {
				const matchups = provider.getMatchups();
				const ghost = matchups.find((m) => m.awayIsClone);
				sourceCounts.set(
					ghost!.awayId,
					(sourceCounts.get(ghost!.awayId) ?? 0) + 1
				);
			}
			for (const id of ["A", "B", "C", "D", "E"]) {
				const count = sourceCounts.get(id) ?? 0;
				expect(count).toBeGreaterThanOrEqual(3);
				expect(count).toBeLessThanOrEqual(7);
			}
		});

		const opponentsEachRound = (
			provider: OpponentProvider,
			rounds: number
		): Map<string, string>[] => {
			const out: Map<string, string>[] = [];
			for (let r = 0; r < rounds; r++) {
				const matchups = provider.getMatchups();
				const opponentByPlayer = new Map<string, string>();
				for (const m of matchups) {
					opponentByPlayer.set(m.homeId, m.awayId);
					if (!m.awayIsClone) {
						opponentByPlayer.set(m.awayId, m.homeId);
					}
				}
				out.push(opponentByPlayer);
			}
			return out;
		};

		it("never shows a player the same opponent three rounds in a row (3 players)", () => {
			for (let seed = 1; seed <= 100; seed++) {
				const provider = makeProvider(["A", "B", "C"], seed);
				const history = opponentsEachRound(provider, 50);
				for (let r = 2; r < history.length; r++) {
					for (const [player, opponent] of history[r]) {
						const a = history[r - 1].get(player);
						const b = history[r - 2].get(player);
						const triple = a === opponent && b === opponent;
						expect(triple).toBe(false);
					}
				}
			}
		});

		it("never shows a player the same opponent three rounds in a row (5 players)", () => {
			for (let seed = 1; seed <= 100; seed++) {
				const provider = makeProvider(["A", "B", "C", "D", "E"], seed);
				const history = opponentsEachRound(provider, 50);
				for (let r = 2; r < history.length; r++) {
					for (const [player, opponent] of history[r]) {
						const a = history[r - 1].get(player);
						const b = history[r - 2].get(player);
						const triple = a === opponent && b === opponent;
						expect(triple).toBe(false);
					}
				}
			}
		});
	});
});
