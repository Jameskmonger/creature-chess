import { packPosition } from "@creature-chess/board";
import { GamePhase } from "@creature-chess/models";

import { createTestPlayer } from "../testUtils";
import { runEvolutions } from "./evolution";

const definitionId = 1;
const makePiece = (id: string, stage: number) => ({
	id,
	ownerId: "p1",
	definitionId,
	stage,
	traits: [],
	maxHealth: 100,
});

const lockBoard = (player: ReturnType<typeof createTestPlayer>) => {
	player.gamemode.setRoundInfo({ phase: GamePhase.PLAYING, startedAt: 0 });
};

const unlockBoard = (player: ReturnType<typeof createTestPlayer>) => {
	player.gamemode.setRoundInfo({ phase: GamePhase.PREPARING, startedAt: 0 });
};

describe("evolution", () => {
	test("adding 3 pieces of same definition+stage while unlocked auto-combines into stage+1", () => {
		const player = createTestPlayer();
		unlockBoard(player);

		player.addPiece(makePiece("a", 0), { type: "bench", location: packPosition(0, 0) });
		player.addPiece(makePiece("b", 0), { type: "bench", location: packPosition(1, 0) });
		player.addPiece(makePiece("c", 0), { type: "bench", location: packPosition(2, 0) });

		const benchPieces = player.bench.getAllPieces();
		expect(benchPieces).toHaveLength(1);

		const evolved = player.gamemode.pieceRegistry.getPieceById(benchPieces[0].id)!;
		expect(evolved.definitionId).toBe(definitionId);
		expect(evolved.stage).toBe(1);
	});

	test("adding pieces while board locked defers — runEvolutions on unlock combines them", () => {
		const player = createTestPlayer();
		lockBoard(player);

		player.addPiece(makePiece("a", 0), { type: "bench", location: packPosition(0, 0) });
		player.addPiece(makePiece("b", 0), { type: "bench", location: packPosition(1, 0) });
		player.addPiece(makePiece("c", 0), { type: "bench", location: packPosition(2, 0) });

		expect(player.bench.getAllPieces()).toHaveLength(3);

		unlockBoard(player);
		runEvolutions(player);

		expect(player.bench.getAllPieces()).toHaveLength(1);
	});

	test("evolution combines pieces split across board+bench when sufficient total", () => {
		const player = createTestPlayer();
		unlockBoard(player);

		player.addPiece(makePiece("a", 0), { type: "board", location: packPosition(0, 0) });
		player.addPiece(makePiece("b", 0), { type: "board", location: packPosition(1, 0) });
		player.addPiece(makePiece("c", 0), { type: "bench", location: packPosition(0, 0) });

		expect(player.board.getAllPieces()).toHaveLength(1);
		expect(player.bench.getAllPieces()).toHaveLength(0);

		const evolved = player.gamemode.pieceRegistry.getPieceById(
			player.board.getAllPieces()[0].id
		)!;
		expect(evolved.stage).toBe(1);
	});
});
