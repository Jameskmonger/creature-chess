import {
	PieceCombatState,
	PieceInfoStore,
	pieceInfoStore,
} from "@creature-chess/battle";
import { SubscribableBoard } from "@creature-chess/board";
import { GamemodeSettings } from "@creature-chess/models";
import { PieceRegistry } from "@creature-chess/utils";

import { PieceAnimationEventStore } from "../components/game/board/piece/match/animationEventStore";

export class GameSession {
	public readonly settings: GamemodeSettings;
	public readonly board: SubscribableBoard;
	public readonly bench: SubscribableBoard;
	public readonly matchBoard: SubscribableBoard;
	public readonly pieceRegistry: PieceRegistry;
	public readonly animationEventStore: PieceAnimationEventStore;
	public readonly combatStore: PieceInfoStore<PieceCombatState>;

	public constructor(settings: GamemodeSettings) {
		this.settings = settings;
		this.board = new SubscribableBoard(
			settings.boardWidth,
			settings.boardHalfHeight
		);
		this.bench = new SubscribableBoard(settings.benchSize, 1);
		this.matchBoard = new SubscribableBoard(
			settings.boardWidth,
			settings.boardHalfHeight * 2
		);
		this.pieceRegistry = new PieceRegistry();
		this.animationEventStore = new PieceAnimationEventStore();
		this.combatStore = pieceInfoStore<PieceCombatState>();
	}
}
