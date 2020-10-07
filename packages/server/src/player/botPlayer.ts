import { Card, PieceModel, LobbyPlayer, PlayerListPlayer, PlayerPieceLocation, GRID_SIZE, BUY_XP_COST } from "@creature-chess/models";
import { Player, PlayerActions, PlayerState, getAllPieces, getBoardPieceForPosition } from "@creature-chess/shared";
import uuid = require("uuid");

const PREFERRED_COLUMN_ORDERS = {
    8: [
        [3, 4, 2, 5, 1, 6, 0, 7],
        [4, 3, 1, 6, 2, 5, 7, 0]
    ],
    7: [
        [3, 4, 2, 5, 1, 6, 0],
        [3, 2, 4, 1, 5, 0, 6]
    ]
};

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

export class BotPlayer extends Player {
    private preferredColumnOrder: number[];

    constructor(name: string) {
        super(uuid(), name);

        const columnsForGridSize = PREFERRED_COLUMN_ORDERS[GRID_SIZE.width];
        this.preferredColumnOrder = columnsForGridSize[
            Math.floor(Math.random() * columnsForGridSize.length)
        ];
    }

    public onStartGame(gameId: string) { /* nothing required, we're a bot */ }

    public onPlayerListUpdate(players: PlayerListPlayer[]) { /* nothing required, we're a bot */ }

    public onLobbyPlayerUpdate(index: number, player: LobbyPlayer) {
        /* nothing required, we're a bot */
    }

    public onPlayersResurrected() { /* nothing required, we're a bot */ }

    protected onEnterPreparingPhase() {
        this.buyBestPieces();
        this.spendExcessMoneyOnXp();
        this.putBenchOnBoard();

        this.store.dispatch(PlayerActions.readyUpAction());
    }

    protected onEnterReadyPhase() { /* nothing required, we're a bot */ }

    protected onEnterPlayingPhase(startedAtSeconds: number) {
        this.finishMatch();
    }

    protected onDeath(startedAtSeconds: number) {
        /* nothing required, we're a bot */
    }

    private spendExcessMoneyOnXp() {
        while (true) {
            const hasEnoughMoney = this.getMoney() >= (10 + BUY_XP_COST);

            if (!hasEnoughMoney) {
                return;
            }

            const canLevelUp = this.getLevel() !== 10;

            if (!canLevelUp) {
                return;
            }

            this.store.dispatch(PlayerActions.buyXpAction());
        }
    }

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

            const currentMoney = this.store.getState().playerInfo.money;
            const moneyAfterSelling = currentMoney + worstPiece.cost;

            // if we still can't afford, move to the next card
            if (moneyAfterSelling < card.cost) {
                continue;
            }

            const canCurrentlyAfford = currentMoney >= worstPiece.cost;

            // sell a piece to make room
            if (this.atPieceLimit() || !canCurrentlyAfford) {
                this.store.dispatch(PlayerActions.playerSellPieceAction(worstPiece.id));
            }

            this.buyCardIfBelowLimit(card);
        }
    }

    private buyCardIfBelowLimit(card: CardView) {
        if (this.atPieceLimit()) {
            return;
        }

        this.store.dispatch(PlayerActions.buyCardAction(card.index));
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

            this.store.dispatch(PlayerActions.playerDropPieceAction(firstBenchPiece.id, benchPiecePosition, firstEmptyPosition));
        }
    }

    private getCardViews(): CardView[] {
        const cards = this.getCards();

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
            for (const x of this.preferredColumnOrder) {
                const boardPiece = getBoardPieceForPosition(this.store.getState().board, x, y);

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
