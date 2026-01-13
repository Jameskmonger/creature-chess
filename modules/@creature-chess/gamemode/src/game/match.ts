import { all, takeEvery } from "@redux-saga/core/effects";
import {
	Store,
	Reducer,
	UnknownAction,
	configureStore,
} from "@reduxjs/toolkit";
import delay from "delay";
import pDefer from "p-defer";
import createSagaMiddleware from "redux-saga";
import { call } from "redux-saga/effects";
import { v4 as uuid } from "uuid";
import { Logger } from "winston";

import {
	battleSaga,
	BattleEvents,
	BattleCommands,
} from "@creature-chess/battle";
import { PieceModel } from "@creature-chess/models";
import { GamemodeSettings } from "@creature-chess/models/settings";

import { PlayerEntity } from "../entities";
import { playerFinishMatchEvent } from "../entities/player/events";
import { Board, mergeBoards, rotateBoard } from "@creature-chess/board";
import { PieceRegistry } from "@creature-chess/utils/piece";

interface MatchState {
	turn: number;
}

const turnReducer: Reducer<number, BattleEvents.BattleTurnEvent> = (
	state = 0,
	event
) => (event.type === BattleEvents.battleTurnEvent.toString() ? event.payload.turn : state);

export class Match {
	private store: Store<MatchState>;
	private boardId = uuid();
	private board: Board;

	private serverFinishedMatch = pDefer();
	private clientFinishedMatchHome = pDefer();
	private clientFinishedMatchAway = pDefer();

	public constructor(
		private readonly pieceRegistry: PieceRegistry,
		public readonly home: PlayerEntity,
		public readonly away: PlayerEntity,
		public readonly awayIsClone: boolean,
		private logger: Logger,
		settings: GamemodeSettings,
		private onTurnComplete?: (timeMs: number) => void
	) {
		this.board = mergeBoards(
			this.boardId,
			home.dependencies.boards.board,
			away.dependencies.boards.board,
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

		this.store = this.createStore(settings);

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
		return this.store.getState().turn;
	}

	public async fight(battleTimeout: Promise<void>) {
		this.store.dispatch(BattleCommands.startBattleCommand({}));

		await Promise.race([
			battleTimeout,
			Promise.all([
				this.serverFinishedMatch.promise,
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

	private createStore(settings: GamemodeSettings) {
		// required to preserve inside the generator
		// eslint-disable-next-line no-underscore-dangle
		const _this = this;
		const rootSaga = function*() {
			yield all([
				call(
					battleSaga,
					settings,
					_this.board,
					_this.pieceRegistry,
				),
				takeEvery<BattleEvents.BattleFinishEvent>(
					BattleEvents.battleFinishEvent,
					function*({ payload: { turn } }) {
						_this.onServerFinishMatch();

						_this.logger.debug("Battle finished", {
							meta: {
								home: _this.home.getVariable((v) => v.name),
								away: _this.away.getVariable((v) => v.name),
								turns: turn,
							},
						});
					}
				),
			]);
		};

		const sagaMiddleware = createSagaMiddleware();

		const store = configureStore({
			reducer: {
				// TODO (jkm) remove cast
				turn: turnReducer as Reducer<number, UnknownAction>,
			},
			middleware: (getDefaultMiddleware) =>
				getDefaultMiddleware({
					thunk: false,
					serializableCheck: false,
				}).concat(sagaMiddleware),
		});

		sagaMiddleware.run(rootSaga);

		return store;
	}

	private onServerFinishMatch() {
		this.serverFinishedMatch.resolve();
	}
}
