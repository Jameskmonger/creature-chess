import { Player } from "@creature-chess/shared/game/player/player";
import { GRID_SIZE, BUY_XP_COST } from "@creature-chess/models/src/constants";
import { Card, PieceModel, LobbyPlayer, PlayerListPlayer, PlayerPieceLocation, GamePhase } from "@creature-chess/models";
import { getAllPieces, getBoardPieceForPosition } from "@creature-chess/shared/player/pieceSelectors";
import { PlayerActions } from "@creature-chess/shared/player";
import { buyCard } from "@creature-chess/shared/player/actions";
import { PlayerState } from "@creature-chess/shared/player/store";
import { PhaseUpdatePacket } from "@creature-chess/shared/networking/server-to-client";
import uuid = require("uuid");
import { gamePhaseUpdate } from "@creature-chess/shared/game/store/actions";

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
    public readonly isBot: boolean = true;
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

    protected onEnterPreparingPhase(startedAt: number, round: number) {
        // todo rework this, it's a quick fix to make bots aware of game state
        const { board, bench, playerInfo: { cards } } = this.store.getState();

        const packet: PhaseUpdatePacket = {
            startedAt,
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
        this.spendExcessMoneyOnXp();
        this.putBenchOnBoard();

        this.readyUp();
    }

    protected onEnterReadyPhase(startedAt: number) {
        // todo rework this, it's a quick fix to make bots aware of game state
        const packet: PhaseUpdatePacket = {
            startedAt,
            phase: GamePhase.READY,
            payload: {
                board: this.match.getBoard(),
                bench: this.getBench(),
                opponentId: this.match.away.id
            }
        };
        this.store.dispatch(gamePhaseUpdate(packet));
    }

    protected onEnterPlayingPhase(phaseStartedAt: number) {
        const packet: PhaseUpdatePacket = { startedAt: phaseStartedAt, phase: GamePhase.PLAYING };
        this.store.dispatch(gamePhaseUpdate(packet));

        this.finishMatch();
    }

    protected onDeath(startedAt: number) {
        // todo rework this, it's a quick fix to make bots aware of game state
        const packet: PhaseUpdatePacket = { startedAt, phase: GamePhase.DEAD };
        this.store.dispatch(gamePhaseUpdate(packet));
    }

    protected onShopLockUpdate() { /* nothing required, we're a bot */ }

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

            this.buyXp();
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
