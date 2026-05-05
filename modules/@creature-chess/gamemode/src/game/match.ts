import delay from "delay";
import pDefer from "p-defer";
import { v4 as uuid } from "uuid";
import { Logger } from "winston";

import {
	BattleRunner,
	PieceCombatState,
	PieceInfoStore,
	pieceInfoStore,
	seedCombatStore,
} from "@creature-chess/battle";
import { Board, mergeBoards, rotateBoard } from "@creature-chess/board";
import { GamemodeSettings } from "@creature-chess/models";
import { PieceRegistry } from "@creature-chess/utils";

import { Player } from "../entities/player/player";

export class Match {
	private runner: BattleRunner;
	private boardId = uuid();
	private board: Board;
	private combatStore: PieceInfoStore<PieceCombatState>;

	private serverFinishedMatch = pDefer();
	private clientFinishedMatchHome = pDefer();
	private clientFinishedMatchAway = pDefer();

	public constructor(
		private readonly pieceRegistry: PieceRegistry,
		public readonly home: Player,
		public readonly away: Player,
		public readonly awayIsClone: boolean,
		private logger: Logger,
		private settings: GamemodeSettings,
		private onTurnComplete?: (timeMs: number) => void
	) {
		this.board = mergeBoards(this.boardId, home.board, away.board);

		this.combatStore = pieceInfoStore<PieceCombatState>();
		seedCombatStore(this.combatStore, this.board, this.pieceRegistry);

		this.runner = new BattleRunner(
			this.board,
			this.pieceRegistry,
			this.combatStore,
			this.settings
		);

		// auto-resolve the match from the "away" side if they are a clone
		if (awayIsClone) {
			this.clientFinishedMatchAway.resolve();
		}
	}

	public onClientFinishMatch(playerId: string) {
		if (playerId === this.home.id) {
			this.clientFinishedMatchHome.resolve();
		} else if (playerId === this.away.id) {
			this.clientFinishedMatchAway.resolve();
		}
	}

	public getBoardForPlayer(playerId: string) {
		// rotate the board for the away player, so that their pieces are shown on their own side
		const clone = this.board.clone();

		if (playerId === this.away.id) {
			rotateBoard(clone);
		}

		return {
			board: clone,
			isHome: playerId === this.home.id,
		};
	}

	public getTurn() {
		return this.runner.getTurn();
	}

	public async fight(
		battleTimeout: Promise<void>
	): Promise<{ homeScore: number; awayScore: number }> {
		const battlePromise = this.runner.run().then(({ turn }) => {
			this.logger.debug("Battle finished", {
				meta: {
					home: this.home.name,
					away: this.away.name,
					turns: turn,
				},
			});
			this.serverFinishedMatch.resolve();
		});

		// Always wait for the battle to finish on the server before proceeding to the outcome.
		await battlePromise;

		await Promise.race([
			battleTimeout,
			Promise.all([
				this.clientFinishedMatchHome.promise,
				this.clientFinishedMatchAway.promise,
			]),
		]);

		if (this.settings.postMatchSettleMs > 0) {
			await delay(this.settings.postMatchSettleMs);
		}

		const survivingPieces = this.board
			.getAllPieces()
			.map((p) => this.pieceRegistry.getPieceById(p.id))
			.filter((p) => p !== null)
			.filter((p) => this.combatStore.getPiece(p!.id).currentHealth > 0);

		const surviving = {
			home: survivingPieces.filter((p) => p!.ownerId === this.home.id),
			away: survivingPieces.filter((p) => p!.ownerId === this.away.id),
		};

		const homeScore = surviving.home.length;
		const awayScore = surviving.away.length;

		// Notify spectators that the match has finished.
		this.home.emitFinishMatch({ homeScore, awayScore, isHomePlayer: true });
		if (!this.awayIsClone) {
			this.away.emitFinishMatch({ homeScore, awayScore, isHomePlayer: false });
		}

		return { homeScore, awayScore };
	}
}
