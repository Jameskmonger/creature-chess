import delay from "delay";
import pDefer from "p-defer";
import { v4 as uuid } from "uuid";
import { Logger } from "winston";

import { BattleRunner } from "@creature-chess/battle";
import { PieceModel } from "@creature-chess/models";
import { GamemodeSettings } from "@creature-chess/models";

import { Player } from "../entities/player/player";
import { playerFinishMatchEvent } from "../entities/player/events";
import { Board, mergeBoards, rotateBoard } from "@creature-chess/board";
import { PieceRegistry } from "@creature-chess/utils";

export class Match {
	private runner: BattleRunner;
	private boardId = uuid();
	private board: Board;

	private serverFinishedMatch = pDefer();
	private clientFinishedMatchHome = pDefer();
	private clientFinishedMatchAway = pDefer();

	public constructor(
		private readonly pieceRegistry: PieceRegistry,
		public readonly home: Player,
		public readonly away: Player,
		public readonly awayIsClone: boolean,
		private logger: Logger,
		settings: GamemodeSettings,
		private onTurnComplete?: (timeMs: number) => void
	) {
		this.board = mergeBoards(
			this.boardId,
			home.board,
			away.board,
		);

		for (const piece of this.board.getAllPieces()) {
			const pieceModel = this.pieceRegistry.getPieceById(piece.id);

			if (!pieceModel) {
				continue;
			}

			pieceModel.lastBattleStats = {
				damageDealt: 0,
				damageTaken: 0,
				turnsSurvived: 0,
			};

			pieceModel.currentHealth = pieceModel.maxHealth;

			if (pieceModel.ownerId === this.home.id) {
				pieceModel.facingAway = true;
			} else {
				pieceModel.facingAway = false;
			}
		}

		this.runner = new BattleRunner(this.board, this.pieceRegistry, settings);

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

	public async fight(battleTimeout: Promise<void>) {
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

		await Promise.race([
			battleTimeout,
			Promise.all([
				battlePromise,
				this.clientFinishedMatchHome.promise,
				this.clientFinishedMatchAway.promise,
			]),
		]);

		await delay(500);

		const survivingPieces = this.board.getAllPieces()
			.map(p => this.pieceRegistry.getPieceById(p.id))
			.filter((p): p is PieceModel => p !== null)
			.filter(p => p.currentHealth > 0);

		const surviving = {
			home: survivingPieces.filter((p) => p.ownerId === this.home.id),
			away: survivingPieces.filter((p) => p.ownerId === this.away.id),
		};

		const homeScore = surviving.home.length;
		const awayScore = surviving.away.length;

		this.home.put(
			playerFinishMatchEvent({ homeScore, awayScore, isHomePlayer: true })
		);

		if (!this.awayIsClone) {
			this.away.put(
				playerFinishMatchEvent({ homeScore, awayScore, isHomePlayer: false })
			);
		}
	}
}
