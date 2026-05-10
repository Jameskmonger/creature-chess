import { GamePhase } from "@creature-chess/models";

import { getBoardSurfaceConfig } from "./boardSurfaceConfig";

describe("getBoardSurfaceConfig", () => {
	const SPECTATED = "other-player";

	describe("not spectating", () => {
		it("PREPARING is preparing + interactive (no match)", () => {
			expect(
				getBoardSurfaceConfig({
					phase: GamePhase.PREPARING,
					spectatingId: null,
				})
			).toEqual({
				isMatch: false,
				isPreparing: true,
				isInteractive: true,
			});
		});

		it("READY is match + interactive", () => {
			expect(
				getBoardSurfaceConfig({ phase: GamePhase.READY, spectatingId: null })
			).toEqual({
				isMatch: true,
				isPreparing: false,
				isInteractive: true,
			});
		});

		it("PLAYING is match + interactive", () => {
			expect(
				getBoardSurfaceConfig({ phase: GamePhase.PLAYING, spectatingId: null })
			).toEqual({
				isMatch: true,
				isPreparing: false,
				isInteractive: true,
			});
		});

		it("null phase is preparing + interactive (pre-first-round seed)", () => {
			expect(
				getBoardSurfaceConfig({ phase: null, spectatingId: null })
			).toEqual({
				isMatch: false,
				isPreparing: true,
				isInteractive: true,
			});
		});
	});

	describe("spectating", () => {
		it("PREPARING shows the spectated half-board, read-only", () => {
			expect(
				getBoardSurfaceConfig({
					phase: GamePhase.PREPARING,
					spectatingId: SPECTATED,
				})
			).toEqual({
				isMatch: false,
				isPreparing: true,
				isInteractive: false,
			});
		});

		it("READY shows the spectated full match-board, read-only", () => {
			expect(
				getBoardSurfaceConfig({
					phase: GamePhase.READY,
					spectatingId: SPECTATED,
				})
			).toEqual({
				isMatch: true,
				isPreparing: false,
				isInteractive: false,
			});
		});

		it("PLAYING shows the spectated full match-board, read-only", () => {
			expect(
				getBoardSurfaceConfig({
					phase: GamePhase.PLAYING,
					spectatingId: SPECTATED,
				})
			).toEqual({
				isMatch: true,
				isPreparing: false,
				isInteractive: false,
			});
		});
	});

	it("isMatch and isPreparing are always opposite", () => {
		const phases: (GamePhase | null)[] = [
			null,
			GamePhase.PREPARING,
			GamePhase.READY,
			GamePhase.PLAYING,
		];
		const spectating: (string | null)[] = [null, SPECTATED];

		for (const phase of phases) {
			for (const spectatingId of spectating) {
				const config = getBoardSurfaceConfig({ phase, spectatingId });
				expect(config.isMatch).toBe(!config.isPreparing);
			}
		}
	});
});
