import { PokemonPiece, PokemonCard, Constants } from "@common";
import { FeedMessage } from "@common/feed-message";
import { Player } from "./player";
import { createTileCoordinates } from "../../shared/position";

const PREFERRED_COLUMN_ORDER = [ 3, 4, 2, 5, 1, 6, 0, 7 ];

export class Bot extends Player {
    public onPlayerListUpdate(players: Player[]) { /* nothing required, we're a bot */ }

    public onNewFeedMessage(message: FeedMessage) { /* nothing required, we're a bot */ }

    protected onEnterPreparingPhase(board: PokemonPiece[]) {
        const cardCosts = this.cards.getValue().map(({ cost }, index) => ({ cost, index }));
        cardCosts.sort((a, b) => b.cost - a.cost);

        for (const { index } of cardCosts) {
            if (this.shouldBuyCard(index)) {
                this.purchaseCard(index);
                break;
            }
        }

        // put pieces on the board until it's full (or we're out of pieces)
        while (this.belowPieceLimit() && this.bench.getValue().length !== 0) {
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

    protected onEnterPlayingPhase(seed: number) {
        this.finishMatch();
    }

    protected onLevelUpdate(level: number, xp: number) { /* nothing required, we're a bot */ }

    protected onEnterReadyPhase(board: PokemonPiece[], opponentId: string) { /* nothing required, we're a bot */ }

    protected onEnterDeadPhase() { /* nothing required, we're a bot */ }

    private shouldBuyCard(index: number) {
        const card = this.cards.getValue()[index];

        if (
            this.belowPieceLimitIncludingBench() === false
            || card === null
            || this.wallet.getValue() < card.cost
        ) {
            return false;
        }

        // bots shouldn't buy magikarp until they can wait to combine it
        if (card.id === 129) {
            return false;
        }

        return true;
    }

    private belowPieceLimitIncludingBench() {
        return (this.board.getValue().length + this.bench.getValue().length) < this.level;
    }

    private getFirstBenchPiece() {
        const benchPieces = this.bench.getValue();

        for (let x = 0; x < Constants.GRID_SIZE; x++) {
            const piece = benchPieces.find(p => p.position.x === x);

            if (piece !== undefined) {
                return piece;
            }
        }

        return null;
    }

    private getFirstEmptyPosition() {
        const boardPieces = this.board.getValue();

        for (let y = 4; y < Constants.GRID_SIZE; y++) {
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
