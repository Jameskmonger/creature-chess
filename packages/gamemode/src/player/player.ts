import { Logger } from "winston";
import { Saga, SagaMiddleware, Task } from "redux-saga";
import pDefer = require("p-defer");
import { PieceModel, PlayerListPlayer, PlayerProfile } from "@creature-chess/models";
import { BoardSelectors, BoardSlice, BoardState, createBoardSlice } from "@creature-chess/board";

import { RoundInfoState } from "../game/roundInfo";
import { Match } from "../game/match";
import { playerBattle, playerMatchRewards, fillBoardCommand } from "./sagas";
import { playerFinishMatchEvent, afterRerollCardsEvent } from "./events";
import { PlayerStore, createPlayerStore, PlayerState } from "./store";
import { PlayerInfoCommands } from "./playerInfo";
import { isPlayerAlive } from "./playerSelectors";
import { GameEvent } from "../game/events";

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

export abstract class Player {
    public readonly id: string;
    public readonly name: string;
    public readonly profile: PlayerProfile | null;

    public readonly runSaga: <S extends Saga>(saga: S, ...args: Parameters<S>) => Task;

    public abstract readonly type: PlayerType;

    protected match: Match | null = null;
    protected store: PlayerStore;
    protected sagaMiddleware: SagaMiddleware;

    protected getRoundInfoState!: () => RoundInfoState;
    protected getPlayerListPlayers!: () => PlayerListPlayer[];
    protected readonly boardSlice: BoardSlice<PieceModel>;
    protected readonly benchSlice: BoardSlice<PieceModel>;

    private logger!: Logger;

    constructor(id: string, name: string, profile: PlayerProfile) {
        this.id = id;
        this.name = name;
        this.profile = profile;

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
        this.sagaMiddleware = sagaMiddleware;

        playerBattle(this.sagaMiddleware);
        this.sagaMiddleware.run(playerMatchRewards<PlayerState>(this.id));

        this.runSaga = this.sagaMiddleware.run;
    }

    public setLogger(logger: Logger) {
        this.logger = logger;
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

    public enterPreparingPhase() {
        if (!this.getShopLocked()) {
            this.store.dispatch(afterRerollCardsEvent());
        }

        this.store.dispatch(PlayerInfoCommands.clearOpponentCommand());

        this.store.dispatch(this.boardSlice.commands.setPieceLimitCommand(this.getLevel()));
        this.store.dispatch(this.boardSlice.commands.unlockBoardCommand());
    }

    public enterReadyPhase(match: Match) {
        this.store.dispatch(fillBoardCommand());

        this.match = match;
        this.store.dispatch(this.boardSlice.commands.lockBoardCommand());

        const opponentId = match.home.id === this.id
            ? match.away.id
            : match.home.id;

        this.store.dispatch(PlayerInfoCommands.updateOpponentCommand(opponentId));
    }

    public onFinishMatch(finalMatchBoard: BoardState<PieceModel>) {
        const survivingPieces = BoardSelectors.getAllPieces(finalMatchBoard).filter(p => p.currentHealth > 0);

        const surviving = {
            home: survivingPieces.filter(p => p.ownerId === this.id),
            away: survivingPieces.filter(p => p.ownerId !== this.id)
        };

        const homeScore = surviving.home.length;
        const awayScore = surviving.away.length;

        this.store.dispatch(playerFinishMatchEvent({ homeScore, awayScore }));

        this.match = null;
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
}
