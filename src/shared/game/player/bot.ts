import { Player } from "./player";
import { GRID_SIZE } from "../../models/constants";
import { Card, PieceModel, LobbyPlayer, PlayerListPlayer, PlayerPieceLocation, GamePhase } from "@common/models";
import { getAllPieces, getBoardPieceForPosition } from "@common/player/pieceSelectors";
import { PlayerActions } from "@common/player";
import { buyCard } from "@common/player/actions";
import { PlayerState } from "@common/player/store";
import { PhaseUpdatePacket } from "@common/networking/server-to-client";
import { gamePhaseUpdate } from "@common/player/gameInfo";
import uuid = require("uuid");

const PREFERRED_COLUMN_ORDER = [3, 4, 2, 5, 1, 6, 0, 7].filter(col => col < GRID_SIZE.width);

interface CardView {
    source: "shop";
    index: number;

    cost: number;
    amountOwned: number;
    definitionId: number;
}

interface PieceView {
    source: "board";
    id: string;

    cost: number;
    amountOwned: number;
    definitionId: number;
}

type CardPieceView = CardView | PieceView;

const getFirstBenchPiece = (state: PlayerState): PieceModel => state.bench.pieces.find(p => p !== null) || null;
const getPieceCountForDefinition =
    (state: PlayerState, definitionId: number): number => getAllPieces(state).filter(p => p.definitionId === definitionId).length;
const getPieceCount = (state: PlayerState): number => getAllPieces(state).length;

export class Bot extends Player {
    public readonly isBot: boolean = true;

    constructor(name: string) {
        super(uuid(), name);
    }

    public onStartGame(gameId: string) { /* nothing required, we're a bot */ }

    public onPlayerListUpdate(players: PlayerListPlayer[]) { /* nothing required, we're a bot */ }

    public onLobbyPlayerUpdate(index: number, player: LobbyPlayer) {
        /* nothing required, we're a bot */
    }

    public onPlayersResurrected() { /* nothing required, we're a bot */ }

    protected onEnterPreparingPhase(round: number) {
        // todo rework this, it's a quick fix to make bots aware of game state
        const { board, bench, cards } = this.store.getState();

        const packet: PhaseUpdatePacket = {
            phase: GamePhase.PREPARING,
            payload: {
                round,
                pieces: {
                    board,
                    bench
                },
                cards
            }
        };
        this.store.dispatch(gamePhaseUpdate(packet));

        this.buyBestPieces();
        this.putBenchOnBoard();

        this.readyUp();
    }

    protected onEnterReadyPhase() {
        // todo rework this, it's a quick fix to make bots aware of game state
        const packet: PhaseUpdatePacket = {
            phase: GamePhase.READY,
            payload: {
                board: this.match.getBoard(),
                opponentId: this.match.away.id
            }
        };
        this.store.dispatch(gamePhaseUpdate(packet));
    }

    protected onEnterPlayingPhase() {
        const packet: PhaseUpdatePacket = { phase: GamePhase.PLAYING };
        this.store.dispatch(gamePhaseUpdate(packet));

        this.finishMatch();
    }

    protected onDeath() {
        // todo rework this, it's a quick fix to make bots aware of game state
        const packet: PhaseUpdatePacket = { phase: GamePhase.DEAD };
        this.store.dispatch(gamePhaseUpdate(packet));
    }

    protected onShopLockUpdate() { /* nothing required, we're a bot */ }

    private buyBestPieces() {
        const cards = this.getCardViews();

        for (const card of cards) {
            const pieces = this.getPieceViews();
            const worstPiece = pieces.pop();

            const pieceIsBetter = () => this.compareCardPieceViews(card, worstPiece) === 1;

            if (
                !worstPiece
                || worstPiece.definitionId === card.definitionId
                || pieceIsBetter()
            ) {
                this.buyCardIfBelowLimit(card);
                continue;
            }

            const currentMoney = this.store.getState().gameInfo.money;
            const moneyAfterSelling = currentMoney + worstPiece.cost;

            // if we still can't afford, move to the next card
            if (moneyAfterSelling < card.cost) {
                continue;
            }

            const canCurrentlyAfford = currentMoney >= worstPiece.cost;

            // sell a piece to make room
            if (this.atPieceLimit() || !canCurrentlyAfford) {
                this.sellPiece(worstPiece.id);
            }

            this.buyCardIfBelowLimit(card);
        }
    }

    private buyCardIfBelowLimit(card: CardView) {
        if (this.atPieceLimit()) {
            return;
        }

        this.store.dispatch(buyCard(card.index));
    }

    private atPieceLimit() {
        return getPieceCount(this.store.getState()) >= this.getLevel();
    }

    private putBenchOnBoard() {
        while (true) {
            const firstBenchPiece = getFirstBenchPiece(this.store.getState());
            const firstEmptyPosition = this.getFirstEmptyPosition();

            if (firstBenchPiece === null || firstEmptyPosition === null) {
                break;
            }

            const benchPiecePosition: PlayerPieceLocation = {
                type: "bench",
                location: {
                    slot: firstBenchPiece.position.x
                }
            };

            this.pieces.dispatchAction(
                PlayerActions.playerDropPiece(firstBenchPiece.id, benchPiecePosition, firstEmptyPosition)
            );
        }
    }

    private getCardViews(): CardView[] {
        const cards = this.store.getState().cards;

        const views = cards.filter(c => c !== null).map(this.getCardView);

        views.sort(this.compareCardPieceViews);

        return views;
    }

    private getPieceViews(): PieceView[] {
        const views = getAllPieces(this.store.getState()).map(this.getPieceView);

        views.sort(this.compareCardPieceViews);

        return views;
    }

    private getCardView = (card: Card, index: number): CardView => {
        const amountOwned = getPieceCountForDefinition(this.store.getState(), card.definitionId);

        return {
            source: "shop",
            index,
            amountOwned,
            cost: card.cost,
            definitionId: card.definitionId
        };
    }

    private getPieceView = (piece: PieceModel): PieceView => {
        const { cost } = this.definitionProvider.get(piece.definitionId);
        const amountOwned = getPieceCountForDefinition(this.store.getState(), piece.definitionId);

        return {
            source: "board",
            cost,
            amountOwned,
            id: piece.id,
            definitionId: piece.definitionId
        };
    }

    private compareCardPieceViews = (a: CardPieceView, b: CardPieceView) => {
        const SORT_A_FIRST = -1;
        const SORT_A_SECOND = 1;

        if (a.cost > b.cost) {
            return SORT_A_FIRST;
        }

        if (a.cost < b.cost) {
            return SORT_A_SECOND;
        }

        if (a.amountOwned > b.amountOwned) {
            return SORT_A_FIRST;
        }

        if (a.amountOwned < b.amountOwned) {
            return SORT_A_SECOND;
        }

        return 0;
    }

    private getFirstEmptyPosition(): PlayerPieceLocation | null {
        for (let y = (GRID_SIZE.height / 2); y < GRID_SIZE.height; y++) {
            for (const x of PREFERRED_COLUMN_ORDER) {
                const boardPiece = getBoardPieceForPosition(this.store.getState(), x, y);

                if (!boardPiece) {
                    return {
                        type: "board",
                        location: {
                            x,
                            y
                        }
                    };
                }
            }
        }

        return null;
    }
}
