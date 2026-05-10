import { GamePhase } from "@creature-chess/models";

import { getBoardSurfaceConfig } from "./boardSurfaceConfig";

describe("getBoardSurfaceConfig", () => {
	const SPECTATED = "other-player";

	describe("not spectating", () => {
		it("PREPARING is preparing + interactive, both surfaces draggable", () => {
			expect(
				getBoardSurfaceConfig({
					phase: GamePhase.PREPARING,
					spectatingId: null,
				})
			).toEqual({
				isMatch: false,
				isPreparing: true,
				isInteractive: true,
				boardDraggable: true,
				benchDraggable: true,
			});
		});

		it("READY is match + interactive, board locked but bench still draggable", () => {
			expect(
				getBoardSurfaceConfig({ phase: GamePhase.READY, spectatingId: null })
			).toEqual({
				isMatch: true,
				isPreparing: false,
				isInteractive: true,
				boardDraggable: false,
				benchDraggable: true,
			});
		});

		it("PLAYING is match + interactive, board locked but bench still draggable", () => {
			expect(
				getBoardSurfaceConfig({ phase: GamePhase.PLAYING, spectatingId: null })
			).toEqual({
				isMatch: true,
				isPreparing: false,
				isInteractive: true,
				boardDraggable: false,
				benchDraggable: true,
			});
		});

		it("null phase is preparing + interactive, both surfaces draggable", () => {
			expect(
				getBoardSurfaceConfig({ phase: null, spectatingId: null })
			).toEqual({
				isMatch: false,
				isPreparing: true,
				isInteractive: true,
				boardDraggable: true,
				benchDraggable: true,
			});
		});
	});

	describe("spectating", () => {
		it("PREPARING shows the spectated half-board, nothing draggable", () => {
			expect(
				getBoardSurfaceConfig({
					phase: GamePhase.PREPARING,
					spectatingId: SPECTATED,
				})
			).toEqual({
				isMatch: false,
				isPreparing: true,
				isInteractive: false,
				boardDraggable: false,
				benchDraggable: false,
			});
		});

		it("READY shows the spectated full match-board, nothing draggable", () => {
			expect(
				getBoardSurfaceConfig({
					phase: GamePhase.READY,
					spectatingId: SPECTATED,
				})
			).toEqual({
				isMatch: true,
				isPreparing: false,
				isInteractive: false,
				boardDraggable: false,
				benchDraggable: false,
			});
		});

		it("PLAYING shows the spectated full match-board, nothing draggable", () => {
			expect(
				getBoardSurfaceConfig({
					phase: GamePhase.PLAYING,
					spectatingId: SPECTATED,
				})
			).toEqual({
				isMatch: true,
				isPreparing: false,
				isInteractive: false,
				boardDraggable: false,
				benchDraggable: false,
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

	it.each([
		[null],
		[GamePhase.PREPARING],
		[GamePhase.READY],
		[GamePhase.PLAYING],
	])("board and bench are not draggable when spectating, regardless of phase (%s)", (phase) => {
		const config = getBoardSurfaceConfig({ phase, spectatingId: SPECTATED });
		expect(config.boardDraggable).toBe(false);
		expect(config.benchDraggable).toBe(false);
	});
});
