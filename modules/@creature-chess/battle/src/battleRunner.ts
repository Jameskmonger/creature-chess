import { PieceModel } from "@creature-chess/models";
import { GamemodeSettings } from "@creature-chess/models/settings";
import { Board } from "@creature-chess/board";
import { PieceRegistry } from "@creature-chess/utils/piece";

import { BattleEvent, BattleEventLog } from "./battleEventLog";
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
	private eventLog = new BattleEventLog();

	public constructor(
		private board: Board,
		private pieceRegistry: PieceRegistry,
		private settings: GamemodeSettings,
		startingTurn: number = 0,
		private onEvents?: (events: BattleEvent[]) => void,
	) {
		this.turn = startingTurn;
	}

	public getTurn() {
		return this.turn;
	}

	public pause() {
		this.controls.paused = true;
	}

	public resume() {
		this.controls.paused = false;
	}

	public async run(): Promise<{ turn: number }> {
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
				// Emit dying events and remove any pieces that died on the final turn
				const deadPieceIds: string[] = [];
				for (const p of this.board.getAllPieces()) {
					const piece = this.pieceRegistry.getPieceById(p.id);
					if (piece && piece.currentHealth <= 0) {
						this.eventLog.append({ type: "piece_dying", pieceId: p.id });
						deadPieceIds.push(p.id);
					}
				}

				const finalEvents = this.eventLog.consume();
				if (finalEvents.length > 0 && this.onEvents) {
					this.onEvents(finalEvents);
				}

				for (const id of deadPieceIds) {
					this.board.removePiece(id);
				}

				await duration(1000).remaining().promise;
				return { turn: this.turn };
			}

			while (this.controls.paused) {
				await duration(1000).remaining().promise;
			}

			const turnTimer = duration(this.settings.battleTurnDuration);

			simulateTurn(++this.turn, this.board, this.pieceRegistry, { combatStore, eventLog: this.eventLog });

			const events = this.eventLog.consume();
			if (events.length > 0 && this.onEvents) {
				this.onEvents(events);
			}

			await turnTimer.remaining().promise;
		}
	}
}
