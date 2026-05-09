import { SubscribableBoard } from "@creature-chess/board";
import { GamemodeSettings } from "@creature-chess/models";
import { PieceRegistry } from "@creature-chess/utils";

import { BattleSession } from "./BattleSession";

export class GameSession {
	public readonly settings: GamemodeSettings;
	public readonly board: SubscribableBoard;
	public readonly bench: SubscribableBoard;
	public readonly pieceRegistry: PieceRegistry;
	public readonly battle: BattleSession;

	public constructor(settings: GamemodeSettings) {
		this.settings = settings;
		this.board = new SubscribableBoard(
			settings.boardWidth,
			settings.boardHalfHeight
		);
		this.bench = new SubscribableBoard(settings.benchSize, 1);
		this.pieceRegistry = new PieceRegistry();
		this.battle = new BattleSession(this.pieceRegistry, this.settings);
	}
}
