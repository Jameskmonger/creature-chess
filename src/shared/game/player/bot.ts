import { createTileCoordinates } from "../../models/position";
import { Player } from "./player";
import { GRID_SIZE } from "../../models/constants";
import { Card, Piece, LobbyPlayer, PlayerListPlayer, FeedMessage, PlayerPieceLocation } from "@common/models";
import { getAllPieces, getBoardPieceForPosition } from "@common/player/pieceSelectors";
import { PlayerPiecesState } from "@common/player";

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

const getFirstBenchPiece = (state: PlayerPiecesState): Piece => state.bench.pieces.find(p => p !== null) || null;
const getPieceCountForDefinition =
    (state: PlayerPiecesState, definitionId: number): number => getAllPieces(state).filter(p => p.definitionId === definitionId).length;
const getPieceCount = (state: PlayerPiecesState): number => getAllPieces(state).length;

export class Bot extends Player {
    public readonly isBot: boolean = true;

    public onStartGame(gameId: string) { /* nothing required, we're a bot */ }

    public onPlayerListUpdate(players: PlayerListPlayer[]) { /* nothing required, we're a bot */ }

    public onNewFeedMessage(message: FeedMessage) { /* nothing required, we're a bot */ }

    public onLobbyPlayerUpdate(index: number, player: LobbyPlayer) {
        /* nothing required, we're a bot */
    }

    public onPlayersResurrected() { /* nothing required, we're a bot */ }

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

            const currentMoney = this.money.getValue();
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

        this.buyCard(card.index);
    }

    private atPieceLimit() {
        return getPieceCount(this.pieces.getState()) >= this.getLevel();
    }

    private putBenchOnBoard() {
        while (true) {
            const firstBenchPiece = getFirstBenchPiece(this.pieces.getState());
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

            this.pieces.playerDropPiece(firstBenchPiece.id, benchPiecePosition, firstEmptyPosition);
        }
    }

    private getCardViews(): CardView[] {
        const cards = this.cards.getValue();

        const views = cards.filter(c => c !== null).map(this.getCardView);

        views.sort(this.compareCardPieceViews);

        return views;
    }

    private getPieceViews(): PieceView[] {
        const views = getAllPieces(this.pieces.getState()).map(this.getPieceView);

        views.sort(this.compareCardPieceViews);

        return views;
    }

    private getCardView = (card: Card, index: number): CardView => {
        const amountOwned = getPieceCountForDefinition(this.pieces.getState(), card.definitionId);

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
        const amountOwned = getPieceCountForDefinition(this.pieces.getState(), piece.definitionId);

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
        for (let y = 4; y < GRID_SIZE; y++) {
            for (const x of PREFERRED_COLUMN_ORDER) {
                const boardPiece = getBoardPieceForPosition(this.pieces.getState(), x, y);

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
