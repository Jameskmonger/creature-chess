import { FeedMessage } from "../feed-message";
import { createTileCoordinates } from "../position";
import { Player } from "./player";
import { GRID_SIZE } from "../constants";
import { PlayerListPlayer } from "../models/player-list-player";
import { Card } from "../models";
import { getDefinition } from "../models/creatureDefinition";

// TODO: Make this use Constants.GRID_SIZE
const PREFERRED_COLUMN_ORDER = [3, 4, 2, 5, 1, 6, 0, 7];

export class Bot extends Player {
    public onPlayerListUpdate(players: PlayerListPlayer[]) { /* nothing required, we're a bot */ }

    public onNewFeedMessage(message: FeedMessage) { /* nothing required, we're a bot */ }

    protected onEnterPreparingPhase() {
        const cardCosts = this.cards.getValue().map((card, index) => ({ card, index }));
        cardCosts.sort((a, b) => this.compareCards(a.card, b.card));

        for (const { index } of cardCosts) {
            if (this.shouldBuyCard(index)) {
                this.buyCard(index);
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

        this.readyUp();
    }

    protected onEnterReadyPhase() { /* nothing required, we're a bot */ }

    protected onEnterPlayingPhase() {
        this.finishMatch();
    }

    protected onDeath() { /* nothing required, we're a bot */ }

    private compareCards(a: Card, b: Card) {
        const SORT_A_FIRST = -1;
        const SORT_A_SECOND = 1;

        const countA = this.getSameCardCount(a.definitionId);
        const countB = this.getSameCardCount(b.definitionId);

        if (countA > countB) {
            return SORT_A_FIRST;
        }

        if (countA < countB) {
            return SORT_A_SECOND;
        }

        if (a.cost > b.cost) {
            return SORT_A_FIRST;
        }

        if (a.cost < b.cost) {
            return SORT_A_SECOND;
        }

        return 0;
    }

    private getSameCardCount(definitionId: number) {
        const board = this.board.getValue();
        const bench = this.bench.getValue();

        let count = 0;
        let currentDefinitionId = definitionId;

        while (currentDefinitionId) {
            count += board.filter(p => p.definitionId === currentDefinitionId).length;
            count += bench.filter(p => p.definitionId === currentDefinitionId).length;

            const definition = getDefinition(currentDefinitionId);

            currentDefinitionId = definition.evolvedFormId;
        }

        return count;
    }

    private shouldBuyCard(index: number) {
        const card = this.cards.getValue()[index];

        if (
            this.belowPieceLimitIncludingBench() === false
            || card === null
            || this.money.getValue() < card.cost
        ) {
            return false;
        }

        // bots shouldn't buy magikarp until they can wait to combine it
        if (card.definitionId === 129) {
            return false;
        }

        return true;
    }

    private belowPieceLimitIncludingBench() {
        return (this.board.getValue().length + this.bench.getValue().length) < this.level.getValue().level;
    }

    private getFirstBenchPiece() {
        const benchPieces = this.bench.getValue();

        for (let x = 0; x < GRID_SIZE; x++) {
            const piece = benchPieces.find(p => p.position.x === x);

            if (piece !== undefined) {
                return piece;
            }
        }

        return null;
    }

    private getFirstEmptyPosition() {
        const boardPieces = this.board.getValue();

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
