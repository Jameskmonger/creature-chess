import { Board } from "@creature-chess/board";
import { GamemodeSettings } from "@creature-chess/models";
import { ReadablePieceRegistry } from "@creature-chess/utils";

import { BattleEvent, BattleEventLog } from "./battleEventLog";
import { simulateTurn } from "./simulator";
import { PieceCombatState, PieceInfoStore } from "./state";
import { duration } from "./utils/duration";

const isATeamDefeated = (
	board: Board,
	pieceRegistry: ReadablePieceRegistry,
	combatStore: PieceInfoStore<PieceCombatState>
) => {
	const survivingPieces = board
		.getAllPieces()
		.map((p) => pieceRegistry.getPieceById(p.id))
		.filter((p) => p !== null)
		.filter((p) => combatStore.getPiece(p!.id).currentHealth > 0);

	const pieceOwnerIds = survivingPieces.map((p) => p!.ownerId);

	return new Set(pieceOwnerIds).size <= 1;
};

export class BattleRunner {
	private controls = { paused: false, stopped: false };
	private turn = 0;
	private eventLog = new BattleEventLog();

	public constructor(
		private board: Board,
		private pieceRegistry: ReadablePieceRegistry,
		private combatStore: PieceInfoStore<PieceCombatState>,
		private settings: GamemodeSettings,
		startingTurn: number = 0,
		private onEvents?: (events: BattleEvent[]) => void
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

	public stop() {
		this.controls.stopped = true;
	}

	public async run(): Promise<{ turn: number }> {
		while (true) {
			if (this.controls.stopped) {
				return { turn: this.turn };
			}

			const shouldStop =
				this.turn >= this.settings.battleTurnCount ||
				isATeamDefeated(this.board, this.pieceRegistry, this.combatStore);

			if (shouldStop) {
				// Emit dying events and remove any pieces that died on the final turn
				const deadPieceIds: string[] = [];
				for (const p of this.board.getAllPieces()) {
					const piece = this.pieceRegistry.getPieceById(p.id);
					if (piece && this.combatStore.getPiece(p.id).currentHealth <= 0) {
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

				if (this.settings.postBattleSettleMs > 0) {
					await duration(this.settings.postBattleSettleMs).remaining().promise;
				}

				return { turn: this.turn };
			}

			while (this.controls.paused) {
				if (this.controls.stopped) {
					return { turn: this.turn };
				}
				await duration(1000).remaining().promise;
			}

			const turnTimer =
				this.settings.battleTurnDuration > 0
					? duration(this.settings.battleTurnDuration)
					: null;

			simulateTurn(++this.turn, this.board, this.pieceRegistry, {
				combatStore: this.combatStore,
				eventLog: this.eventLog,
			});

			const events = this.eventLog.consume();
			if (events.length > 0 && this.onEvents) {
				this.onEvents(events);
			}

			if (turnTimer !== null) {
				await turnTimer.remaining().promise;
			}
		}
	}
}
