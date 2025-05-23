import { all, takeEvery, takeLatest, put } from "@redux-saga/core/effects";
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
	BoardState,
	mergeBoards,
	createBoardSlice,
	BoardPiecesState,
	BoardSlice,
	BoardSelectors,
	cloneBoard,
} from "@shoki/board";

import {
	battleSaga,
	BattleEvents,
	BattleCommands,
} from "@creature-chess/battle";
import { battleTurnEvent } from "@creature-chess/battle/src/events";
import { PieceModel } from "@creature-chess/models";
import { GamemodeSettings } from "@creature-chess/models/settings";
import { rotateBoard } from "@creature-chess/utils/board";

import { PlayerEntity } from "../entities";
import { PlayerStateSelectors } from "../entities/player";
import { playerFinishMatchEvent } from "../entities/player/events";

interface MatchState {
	board: BoardState<PieceModel>;
	turn: number;
}

const turnReducer: Reducer<number, BattleEvents.BattleTurnEvent> = (
	state = 0,
	event
) => (event.type === battleTurnEvent.toString() ? event.payload.turn : state);

export class Match {
	private store: Store<MatchState>;
	private finalBoard!: BoardState<PieceModel>;
	private boardId = uuid();
	private board: BoardSlice<PieceModel>;

	private serverFinishedMatch = pDefer();
	private clientFinishedMatchHome = pDefer();
	private clientFinishedMatchAway = pDefer();

	public constructor(
		public readonly home: PlayerEntity,
		public readonly away: PlayerEntity,
		public readonly awayIsClone: boolean,
		private logger: Logger,
		settings: GamemodeSettings,
		private onTurnComplete?: (timeMs: number) => void
	) {
		this.board = createBoardSlice<PieceModel>(this.boardId, {
			width: settings.boardWidth,
			height: settings.boardHalfHeight * 2,
		});

		this.store = this.createStore(settings);

		const mergedBoard = mergeBoards(
			this.boardId,
			home.select(PlayerStateSelectors.getPlayerBoard),
			away.select(PlayerStateSelectors.getPlayerBoard)
		);

		const board: BoardState<PieceModel> = {
			...mergedBoard,
			pieces: Object.entries(mergedBoard.pieces).reduce<
				BoardPiecesState<PieceModel>
			>(
				(acc, [id, piece]) => ({
					...acc,
					[id]: {
						...piece,
						facingAway: piece.ownerId === home.id,
					},
				}),
				{}
			),
		};

		this.store.dispatch(this.board.commands.setBoardPiecesCommand(board));

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

	public getBoardForPlayer(playerId: string): BoardState<PieceModel> {
		const { board } = this.store.getState();

		// rotate the board for the away player, so that their pieces are shown on their own side

		if (playerId === this.away.id) {
			return rotateBoard(cloneBoard(board));
		}

		return cloneBoard(board);
	}

	public getTurn() {
		return this.store.getState().turn;
	}

	public getFinalBoard() {
		return this.finalBoard;
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

		this.finalBoard = this.store.getState().board;

		const survivingPieces = BoardSelectors.getAllPieces(this.finalBoard).filter(
			(p) => p.currentHealth > 0
		);

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

		return this.finalBoard;
	}

	private createStore(settings: GamemodeSettings) {
		// required to preserve inside the generator
		// eslint-disable-next-line no-underscore-dangle
		const _this = this;
		const rootSaga = function* () {
			yield all([
				call(
					battleSaga,
					(state: MatchState) => state.board,
					settings,
					_this.board
				),
				takeEvery<BattleEvents.BattleFinishEvent>(
					BattleEvents.battleFinishEvent,
					function* ({ payload: { turn } }) {
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
				takeLatest<BattleEvents.BattleTurnEvent>(
					BattleEvents.battleTurnEvent,
					function* ({
						payload: { board, timeMs },
					}: BattleEvents.BattleTurnEvent) {
						if (_this.onTurnComplete) {
							_this.onTurnComplete(timeMs);
						}

						yield put(
							_this.board.commands.setBoardPiecesCommand({
								pieces: board.pieces,
								piecePositions: board.piecePositions,
								size: undefined, // todo improve this
							})
						);
					}
				),
			]);
		};

		const sagaMiddleware = createSagaMiddleware();

		const store = configureStore<MatchState>({
			reducer: {
				board: this.board.boardReducer,
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
