import { Logger } from "winston";
import { Saga, Task } from "redux-saga";
import { all, takeEvery } from "redux-saga/effects";
import { PieceModel, PlayerListPlayer, PlayerProfile } from "@creature-chess/models";
import { BoardSlice, createBoardSlice } from "@creature-chess/board";

import { RoundInfoState } from "../game/roundInfo";
import { Match } from "../game/match";
import { PlayerStore, createPlayerStore } from "./store";
import { isPlayerAlive } from "./playerSelectors";
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

	protected getRoundInfoState!: () => RoundInfoState;
	protected getPlayerListPlayers!: () => PlayerListPlayer[];
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
			() => this.match,
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

	public getLogger = () => this.logger;

	public receiveGameEvent(gameEvent: GameEvent) {
		this.store.dispatch(gameEvent);
	}

	public setGetRoundInfoState(fn: () => RoundInfoState) {
		this.getRoundInfoState = fn;
	}

	public setGetPlayerListPlayers(fn: () => PlayerListPlayer[]) {
		this.getPlayerListPlayers = fn;
	}

	public getMatch = () => this.match;

	public getHealth() {
		return this.store.getState().playerInfo.health;
	}

	public getReady() {
		return this.store.getState().playerInfo.ready;
	}

	public getStreak() {
		return this.store.getState().playerInfo.streak;
	}

	public getLevel() {
		return this.store.getState().playerInfo.level;
	}

	public getXp() {
		return this.store.getState().playerInfo.xp;
	}

	public getMoney() {
		return this.store.getState().playerInfo.money;
	}

	public getShopLocked() {
		return this.store.getState().cardShop.locked;
	}

	public getStatus() {
		return this.store.getState().playerInfo.status;
	}

	public getBattle() {
		return this.store.getState().playerInfo.battle;
	}

	public isAlive() {
		return isPlayerAlive(this.store.getState());
	}

	public isDead() {
		return !this.isAlive();
	}

	public getBoard() {
		return this.store.getState().board;
	}

	public getBench() {
		return this.store.getState().bench;
	}

	public getCards() {
		return this.store.getState().cardShop.cards;
	}

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
