import pDefer = require("p-defer");
import { v4 as uuid } from "uuid";
import { all, takeEvery, takeLatest, put } from "@redux-saga/core/effects";
import createSagaMiddleware from "redux-saga";
import { createStore, combineReducers, applyMiddleware, Store, Reducer } from "redux";
import { BoardState, mergeBoards, rotatePiecesAboutCenter, createBoardSlice, BoardPiecesState, BoardSlice, BoardSelectors } from "@creature-chess/board";
import { battleSagaFactory, startBattle, BattleEvents } from "@creature-chess/battle";
import { GRID_SIZE, PieceModel, GameOptions } from "@creature-chess/models";
import { Player, PlayerSelectors } from "../player";
import { playerFinishMatchEvent } from "./events";
import { call } from "redux-saga/effects";

interface MatchState {
	board: BoardState<PieceModel>;
	turn: number;
}

const turnReducer: Reducer<number, BattleEvents.BattleTurnEvent> = (state = 0, event) => (
	event.type === BattleEvents.BATTLE_TURN_EVENT ? event.payload.turn : state
);

export class Match {
	private store: Store<MatchState>;
	private finalBoard!: BoardState<PieceModel>;
	private boardId = uuid();
	private board: BoardSlice<PieceModel> = createBoardSlice<PieceModel>(this.boardId, GRID_SIZE);

	private serverFinishedMatch = pDefer();
	private clientFinishedMatch = pDefer();

	constructor(
		public readonly home: Player,
		public readonly away: Player,
		private awayIsClone: boolean,
		gameOptions: GameOptions
	) {
		this.store = this.createStore(gameOptions);

		const mergedBoard = mergeBoards(this.boardId, home.select(PlayerSelectors.getPlayerBoard), away.select(PlayerSelectors.getPlayerBoard));

		const board: BoardState<PieceModel> = {
			...mergedBoard,
			pieces: Object.entries(mergedBoard.pieces).reduce<BoardPiecesState<PieceModel>>(
				(acc, [id, piece]) => ({
					...acc,
					[id]: {
						...piece,
						facingAway: (piece.ownerId === home.id)
					}
				}),
				{}
			)
		};

		this.store.dispatch(this.board.commands.setBoardPiecesCommand(board));
	}

	public onClientFinishMatch() {
		this.clientFinishedMatch.resolve();
	}

	public getBoardForPlayer(playerId: string): BoardState<PieceModel> {
		const { board } = this.store.getState();

		// rotate the board for the away player, so that their pieces are shown on their own side

		if (playerId === this.away.id) {
			const rotatedBoard = rotatePiecesAboutCenter(board);

			// todo improve this

			const newState: BoardState<PieceModel> = {
				...rotatedBoard,
				pieces: Object.entries(rotatedBoard.pieces).reduce<BoardPiecesState<PieceModel>>(
					(acc, [id, piece]) => ({
						...acc,
						[id]: {
							...piece,
							facingAway: !piece.facingAway
						}
					}),
					{}
				)
			};

			return newState;
		}

		return board;
	}

	public getTurn() {
		return this.store.getState().turn;
	}

	public getFinalBoard() {
		return this.finalBoard;
	}

	public async fight(battleTimeout: Promise<void>) {
		this.store.dispatch(startBattle());

		await Promise.race([
			battleTimeout,
			Promise.all([this.serverFinishedMatch.promise, this.clientFinishedMatch.promise])
		]);

		this.finalBoard = this.store.getState().board;

		const survivingPieces = BoardSelectors.getAllPieces(this.finalBoard).filter(p => p.currentHealth > 0);

		const surviving = {
			home: survivingPieces.filter(p => p.ownerId === this.home.id),
			away: survivingPieces.filter(p => p.ownerId === this.away.id)
		};

		const homeScore = surviving.home.length;
		const awayScore = surviving.away.length;

		this.home.runSaga(function*() {
			yield put(playerFinishMatchEvent({ homeScore, awayScore, isHomePlayer: true }));
		});

		if (!this.awayIsClone) {
			this.away.runSaga(function*() {
				yield put(playerFinishMatchEvent({ homeScore, awayScore, isHomePlayer: false }));
			});
		}

		return this.finalBoard;
	}

	private createStore(gameOptions: GameOptions) {
		// required to preserve inside the generator
		// tslint:disable-next-line:variable-name
		const _this = this;
		const rootSaga = function*() {
			yield all([
				call(
					battleSagaFactory<MatchState>(state => state.board),
					gameOptions, _this.board
				),
				takeEvery<BattleEvents.BattleFinishEvent>(
					BattleEvents.BATTLE_FINISH_EVENT,
					function*() {
						_this.onServerFinishMatch();
					}
				),
				takeLatest<BattleEvents.BattleTurnEvent>(
					BattleEvents.BATTLE_TURN_EVENT,
					function*({ payload: { board } }: BattleEvents.BattleTurnEvent) {
						yield put(_this.board.commands.setBoardPiecesCommand({
							pieces: board.pieces,
							piecePositions: board.piecePositions,
							size: undefined // todo improve this
						}));
					}
				)
			]);
		};

		const sagaMiddleware = createSagaMiddleware();

		const store = createStore(
			combineReducers<MatchState>({
				board: this.board.boardReducer,
				turn: turnReducer
			}),
			applyMiddleware(sagaMiddleware)
		);

		sagaMiddleware.run(rootSaga);

		return store;
	}

	private onServerFinishMatch() {
		this.serverFinishedMatch.resolve();
	}
}
