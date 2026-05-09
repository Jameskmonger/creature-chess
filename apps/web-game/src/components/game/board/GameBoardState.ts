import {
	PieceCombatState,
	PieceInfoStore,
	pieceInfoStore,
} from "@creature-chess/battle";
import { SubscribableBoard } from "@creature-chess/board";
import { GamemodeSettingsPresets } from "@creature-chess/models";
import { PieceRegistry } from "@creature-chess/utils";

import { PieceAnimationEventStore } from "./piece/match/animationEventStore";

export class GameBoardState {
	public readonly board: SubscribableBoard;
	public readonly bench: SubscribableBoard;
	public readonly matchBoard: SubscribableBoard;
	public readonly pieceRegistry: PieceRegistry;
	public readonly animationEventStore: PieceAnimationEventStore;
	public readonly combatStore: PieceInfoStore<PieceCombatState>;

	public constructor() {
		this.board = new SubscribableBoard(
			GamemodeSettingsPresets["default"].boardWidth,
			GamemodeSettingsPresets["default"].boardHalfHeight
		);
		this.bench = new SubscribableBoard(
			GamemodeSettingsPresets["default"].benchSize,
			1
		);
		this.matchBoard = new SubscribableBoard(
			GamemodeSettingsPresets["default"].boardWidth,
			GamemodeSettingsPresets["default"].boardHalfHeight * 2
		);
		this.pieceRegistry = new PieceRegistry();
		this.animationEventStore = new PieceAnimationEventStore();
		this.combatStore = pieceInfoStore<PieceCombatState>();
	}
}
