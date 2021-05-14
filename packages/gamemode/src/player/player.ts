import { Logger } from "winston";
import { Saga, Task } from "redux-saga";
import { all, takeEvery } from "redux-saga/effects";
import { PieceModel, PlayerProfile } from "@creature-chess/models";
import { BoardSlice, createBoardSlice } from "@creature-chess/board";

import { Match } from "../game/match";
import { PlayerStore, createPlayerStore, PlayerState } from "./store";
import { GameEvent, playerFinishMatchEvent, PlayerFinishMatchEvent, playerRunReadyPhaseEvent, PlayerRunReadyPhaseEvent } from "../game/events";
import { Game } from "../game";

export interface PlayerMatchResults {
	homePlayer: Player;
	opponentName: string;
	homeScore: number;
	awayScore: number;
}

export enum PlayerType {
	BOT,
	USER
}

export class Player {
	public readonly runSaga: <S extends Saga>(saga: S, ...args: Parameters<S>) => Task;

	protected match: Match | null = null;
	protected store: PlayerStore;

	protected readonly boardSlice: BoardSlice<PieceModel>;
	protected readonly benchSlice: BoardSlice<PieceModel>;

	constructor(
		public readonly type: PlayerType,
		public readonly id: string,
		public readonly name: string,
		public readonly profile: PlayerProfile,
		public readonly game: Game,
		private logger: Logger
	) {
		this.boardSlice = createBoardSlice(`player-${this.id}-board`, { width: 7, height: 3 });
		this.benchSlice = createBoardSlice(`player-${this.id}-bench`, { width: 7, height: 1 });

		const { store, sagaMiddleware } = createPlayerStore(
			this.getLogger,
			this.getMatch,
			this.id,
			this.name,
			{
				boardSlice: this.boardSlice,
				benchSlice: this.benchSlice
			}
		);
		this.store = store;

		this.runSaga = sagaMiddleware.run;

		sagaMiddleware.run(this.matchSaga());
	}

	public select = <T>(selector: (state: PlayerState) => T) => selector(this.store.getState());

	public getLogger = () => this.logger;
	public getMatch = () => this.match;

	private matchSaga() {
		const setMatch = (match: Match) => this.match = match;
		const clearMatch = () => this.match;

		return function*() {
			yield all([
				takeEvery<PlayerRunReadyPhaseEvent>(
					playerRunReadyPhaseEvent.toString(),
					function*({ payload: { match } }) {
						setMatch(match);
					}
				),
				takeEvery<PlayerFinishMatchEvent>(
					playerFinishMatchEvent.toString(),
					function*() {
						clearMatch();
					}
				)
			]);
		};
	}
}
