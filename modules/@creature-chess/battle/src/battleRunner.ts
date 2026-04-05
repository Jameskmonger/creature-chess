import { PieceModel } from "@creature-chess/models";
import { GamemodeSettings } from "@creature-chess/models/settings";
import { Board } from "@creature-chess/board";
import { PieceRegistry } from "@creature-chess/utils/piece";

import { simulateTurn } from "./simulator";
import { PieceCombatState } from "./state/state";
import { pieceInfoStore } from "./state/store";
import { duration } from "./utils/duration";

const isATeamDefeated = (board: Board, pieceRegistry: PieceRegistry) => {
	const survivingPieces = board.getAllPieces()
		.map(p => pieceRegistry.getPieceById(p.id))
		.filter((p): p is PieceModel => p !== null)
		.filter(p => p.currentHealth > 0);

	const pieceOwnerIds = survivingPieces
		.map((p) => p.ownerId);

	return new Set(pieceOwnerIds).size <= 1;
};

export class BattleRunner {
	private controls = { paused: false };
	private turn = 0;

	constructor(
		private board: Board,
		private pieceRegistry: PieceRegistry,
		private settings: GamemodeSettings,
		startingTurn: number = 0,
	) {
		this.turn = startingTurn;
	}

	getTurn() {
		return this.turn;
	}

	pause() {
		this.controls.paused = true;
	}

	resume() {
		this.controls.paused = false;
	}

	async run(): Promise<{ turn: number }> {
		const combatStore = pieceInfoStore<PieceCombatState>({
			state: { type: "wandering" },
			canMoveAtTurn: 15,
			canBeAttackedAtTurn: 0,
			canAttackAtTurn: 15,
		});

		while (true) {
			const shouldStop =
				this.turn >= this.settings.battleTurnCount || isATeamDefeated(this.board, this.pieceRegistry);

			if (shouldStop) {
				await duration(1000).remaining().promise;
				return { turn: this.turn };
			}

			while (this.controls.paused) {
				await duration(1000).remaining().promise;
			}

			const turnTimer = duration(this.settings.battleTurnDuration);

			simulateTurn(++this.turn, this.board, this.pieceRegistry, { combatStore });

			await turnTimer.remaining().promise;
		}
	}
}
