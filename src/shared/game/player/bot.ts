import { FeedMessage } from "../../feed-message";
import { createTileCoordinates } from "../../position";
import { Player } from "./player";
import { GRID_SIZE } from "../../constants";
import { PlayerListPlayer } from "../../models/player-list-player";
import { Card, Piece, LobbyPlayer } from "../../models";

// TODO: Make this use Constants.GRID_SIZE
const PREFERRED_COLUMN_ORDER = [3, 4, 2, 5, 1, 6, 0, 7];

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

export class Bot extends Player {
    public readonly isBot: boolean = true;

    public onPlayerListUpdate(players: PlayerListPlayer[]) { /* nothing required, we're a bot */ }

    public onNewFeedMessage(message: FeedMessage) { }

    public onLobbyPlayerUpdate(index: number, player: LobbyPlayer) {
        /* nothing required, we're a bot */
    }

    protected onEnterPreparingPhase() {
        this.buyBestPieces();
        this.putBenchOnBoard();

        this.readyUp();
    }

    protected onEnterReadyPhase() { /* nothing required, we're a bot */ }

    protected onEnterPlayingPhase() {
        this.finishMatch();
    }

    protected onDeath() { /* nothing required, we're a bot */ }

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

            const moneyAfterSelling = this.money.getValue() + worstPiece.cost;

            // if we still can't afford, move to the next card
            if (moneyAfterSelling < card.cost) {
                continue;
            }

            // sell a piece to make room
            if (this.atPieceLimit()) {
                this.sellPiece(worstPiece.id);
            }

            this.buyCardIfBelowLimit(card);
        }
    }

    private buyCardIfBelowLimit(card: CardView) {
        if (this.atPieceLimit()) {
            return;
        }

        this.buyCard(card.index);
    }

    private atPieceLimit() {
        return this.getTotalPieceCount() >= this.getLevel();
    }

    private putBenchOnBoard() {
        while (true) {
            const firstBenchPiece = this.getFirstBenchPiece();
            const firstEmptyPosition = this.getFirstEmptyPosition();

            if (firstBenchPiece === null || firstEmptyPosition === null) {
                break;
            }

            this.movePieceToBoard({
                id: firstBenchPiece.id,
                from: firstBenchPiece.position,
                to: firstEmptyPosition
            });
        }
    }

    private getTotalPieceCount() {
        return this.getBoard().length + this.getBench().length;
    }

    private getCardViews(): CardView[] {
        const cards = this.cards.getValue();

        const views = cards.map(this.getCardView);

        views.sort(this.compareCardPieceViews);

        return views;
    }

    private getPieceViews(): PieceView[] {
        const board = this.getBoard();
        const bench = this.getBench();

        const pieces = [...board, ...bench];

        const views = pieces.map(this.getPieceView);

        views.sort(this.compareCardPieceViews);

        return views;
    }

    private getCardView = (card: Card, index: number): CardView => {
        const amountOwned = this.getSameCardCount(card.definitionId);

        return {
            source: "shop",
            index,
            amountOwned,
            cost: card.cost,
            definitionId: card.definitionId
        };
    }

    private getPieceView = (piece: Piece): PieceView => {
        const { cost } = this.definitionProvider.get(piece.definitionId);
        const amountOwned = this.getSameCardCount(piece.definitionId);

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

    private getSameCardCount(definitionId: number) {
        const board = this.getBoard();
        const bench = this.getBench();

        return board.filter(p => p.definitionId === definitionId).length
            + bench.filter(p => p.definitionId === definitionId).length;
    }

    private getFirstBenchPiece() {
        const benchPieces = this.getBench();

        for (let x = 0; x < GRID_SIZE; x++) {
            const piece = benchPieces.find(p => p.position.x === x);

            if (piece !== undefined) {
                return piece;
            }
        }

        return null;
    }

    private getFirstEmptyPosition() {
        const boardPieces = this.getBoard();

        for (let y = 4; y < GRID_SIZE; y++) {
            for (const x of PREFERRED_COLUMN_ORDER) {
                const boardPiece = boardPieces.find(p => p.position.x === x && p.position.y === y);

                if (boardPiece === undefined) {
                    return createTileCoordinates(x, y);
                }
            }
        }

        return null;
    }
}
