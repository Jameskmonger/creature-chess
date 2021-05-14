import { Logger } from "winston";
import { Saga, Task } from "redux-saga";
import { PieceModel, PlayerProfile } from "@creature-chess/models";
import { BoardSlice, createBoardSlice } from "@creature-chess/board";

import { Match } from "../game/match";
import { PlayerStore, createPlayerStore, PlayerState } from "./store";
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
	/**
	 * Run a saga on the Player object.
	 *
	 * @template S The type of Saga to run.
	 *
	 * @param saga - The saga to run, of type {@link S}
	 * @param args - Optional arguments for the saga, of type {@link Parameters<S>}
	 *
	 * @return
	 */
	public readonly runSaga: <S extends Saga>(saga: S, ...args: Parameters<S>) => Task;
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
			{
				logger
			},
			this.id,
			this.name,
			{
				boardSlice: this.boardSlice,
				benchSlice: this.benchSlice
			}
		);
		this.store = store;

		this.runSaga = sagaMiddleware.run;
	}

	/**
	 * Runs a selector on the {@link PlayerState} and returns the result.
	 *
	 * @param selector - The selector to execute.
	 *
	 * @returns The result of the selector.
	 */
	public select = <T>(selector: (state: PlayerState) => T) => selector(this.store.getState());
}
