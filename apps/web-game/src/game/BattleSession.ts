import {
	BattleRunner,
	PieceCombatState,
	PieceInfoStore,
	pieceInfoStore,
} from "@creature-chess/battle";
import { SubscribableBoard } from "@creature-chess/board";
import { GamemodeSettings } from "@creature-chess/models";
import { PieceRegistry } from "@creature-chess/utils";

import { PieceAnimationEventStore } from "../components/game/board/piece/match/animationEventStore";

export class BattleSession {
	public readonly board: SubscribableBoard;
	public readonly combatStore: PieceInfoStore<PieceCombatState>;
	public readonly animationEventStore: PieceAnimationEventStore;

	private runner: BattleRunner | null = null;

	public constructor(
		private readonly pieceRegistry: PieceRegistry,
		private readonly settings: GamemodeSettings
	) {
		this.board = new SubscribableBoard(
			settings.boardWidth,
			settings.boardHalfHeight * 2
		);
		this.combatStore = pieceInfoStore<PieceCombatState>();
		this.animationEventStore = new PieceAnimationEventStore();
	}

	public start(turn: number = 0): Promise<{ turn: number }> {
		this.runner?.stop();

		const runner = new BattleRunner(
			this.board,
			this.pieceRegistry,
			this.combatStore,
			this.settings,
			turn,
			(events) => this.animationEventStore.pushEvents(events)
		);
		this.runner = runner;

		return runner.run();
	}

	public pause() {
		this.runner?.pause();
	}

	public resume() {
		this.runner?.resume();
	}
}
