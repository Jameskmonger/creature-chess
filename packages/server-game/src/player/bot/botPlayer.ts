import { takeLatest, put, take, race, fork, all, select } from "@redux-saga/core/effects";
import { Card, PieceModel, LobbyPlayer, PlayerPieceLocation, GamePhase, DefinitionClass, TileCoordinates } from "@creature-chess/models";
import { Player, PlayerGameActions, PlayerState, PlayerEvents, GameEvents, getDefinitionById, getAllPieces } from "@creature-chess/gamemode";
import { BoardSelectors } from "@creature-chess/board";
import uuid = require("uuid");
import delay from "delay";
import { shouldBuyXp } from "./shop/shouldBuyXp";

const SORT_A_FIRST = -1;
const SORT_A_SECOND = 1;
// todo tie this into GRID_SIZE
const ARCANE_ROW_PREFERENCE = {
    [3]: 2,
    [4]: 0,
    [5]: 1
};
const PREFERRED_LOCATIONS: {
    [key in DefinitionClass]: (a: TileCoordinates, b: TileCoordinates) => -1 | 1
} = {
    [DefinitionClass.VALIANT]: (a, b) => {
        if (a.y < b.y) {
            return SORT_A_FIRST;
        }

        if (a.y > b.y) {
            return SORT_A_SECOND;
        }

        // todo tie this into GRID_SIZE
        const distanceFromMiddleA = Math.abs(a.x - 3);
        const distanceFromMiddleB = Math.abs(b.x - 3);

        if (distanceFromMiddleA < distanceFromMiddleB) {
            return SORT_A_FIRST;
        }

        if (distanceFromMiddleA > distanceFromMiddleB) {
            return SORT_A_SECOND;
        }

        return SORT_A_FIRST;
    },
    [DefinitionClass.CUNNING]: (a, b) => {
        if (a.y < b.y) {
            return SORT_A_FIRST;
        }

        if (a.y > b.y) {
            return SORT_A_SECOND;
        }

        // todo tie this into GRID_SIZE
        const distanceFromMiddleA = Math.abs(a.x - 3);
        const distanceFromMiddleB = Math.abs(b.x - 3);

        if (distanceFromMiddleA > distanceFromMiddleB) {
            return SORT_A_FIRST;
        }

        if (distanceFromMiddleA < distanceFromMiddleB) {
            return SORT_A_SECOND;
        }

        return SORT_A_FIRST;
    },
    [DefinitionClass.ARCANE]: (a, b) => {
        if (ARCANE_ROW_PREFERENCE[a.y] < ARCANE_ROW_PREFERENCE[b.y]) {
            return SORT_A_FIRST;
        }

        if (ARCANE_ROW_PREFERENCE[a.y] > ARCANE_ROW_PREFERENCE[b.y]) {
            return SORT_A_SECOND;
        }

        // todo tie this into GRID_SIZE
        const distanceFromMiddleA = Math.abs(a.x - 3);
        const distanceFromMiddleB = Math.abs(b.x - 3);

        if (distanceFromMiddleA < distanceFromMiddleB) {
            return SORT_A_FIRST;
        }

        if (distanceFromMiddleA > distanceFromMiddleB) {
            return SORT_A_SECOND;
        }

        return SORT_A_FIRST;
    },
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

const getFirstBenchPiece = (state: PlayerState): PieceModel => {
    for (let x = 0; x < state.bench.size.width; x++) {
        if (state.bench.piecePositions[`${x},0`]) {
            return state.bench.pieces[state.bench.piecePositions[`${x},0`]];
        }
    }

    return null;
};
const getBenchSlotForPiece = (state: PlayerState, pieceId: string): number => {
    for (let x = 0; x < state.bench.size.width; x++) {
        if (state.bench.piecePositions[`${x},0`] === pieceId) {
            return x;
        }
    }

    return null;
};
const getPieceCountForDefinition =
    (state: PlayerState, definitionId: number): number => getAllPieces(state).filter(p => p.definitionId === definitionId).length;
const getPieceCount = (state: PlayerState): number => getAllPieces(state).length;

const BOT_ACTION_TIME_MS = 400;

export class BotPlayer extends Player {
    public readonly isBot = true;

    constructor(id: string, name: string, picture: number) {
        // todo fix typing
        super(id, name, picture);

        this.sagaMiddleware.run(this.botLogicSaga());
    }

    public onLobbyPlayerUpdate(index: number, player: LobbyPlayer) {
        /* nothing required, we're a bot */
    }

    private async spendExcessMoneyOnXp() {
        while (true) {
            const money = this.getMoney();
            const level = this.getLevel();
            const xp = this.getXp();

            if (shouldBuyXp(money, level, xp) === false) {
                return;
            }

            this.store.dispatch(PlayerGameActions.buyXpPlayerAction());
            await delay(BOT_ACTION_TIME_MS);
        }
    }

    private async buyBestPieces() {
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
                await this.buyCardIfBelowLimit(card);
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
                this.store.dispatch(PlayerGameActions.sellPiecePlayerAction({ pieceId: worstPiece.id }));
                await delay(BOT_ACTION_TIME_MS);
            }

            await this.buyCardIfBelowLimit(card);
        }
    }

    private async buyCardIfBelowLimit(card: CardView) {
        if (this.atPieceLimit()) {
            return;
        }

        const definition = getDefinitionById(card.definitionId);

        this.store.dispatch(PlayerGameActions.buyCardPlayerAction({
            index: card.index,
            sortPositions: PREFERRED_LOCATIONS[definition.class]
        }));
        await delay(BOT_ACTION_TIME_MS);
    }

    private atPieceLimit() {
        return getPieceCount(this.store.getState()) >= this.getLevel();
    }

    private async putBenchOnBoard() {
        while (true) {
            const firstBenchPiece = getFirstBenchPiece(this.store.getState());

            if (firstBenchPiece === null) {
                break;
            }

            const firstEmptyPosition = BoardSelectors.getFirstEmptySlot(this.store.getState().board, PREFERRED_LOCATIONS[firstBenchPiece.definition.class]);

            if (firstEmptyPosition === null) {
                break;
            }

            const boardPiecePosition: PlayerPieceLocation = {
                type: "board",
                location: firstEmptyPosition
            };

            const benchPieceSlot = getBenchSlotForPiece(this.store.getState(), firstBenchPiece.id);

            const benchPiecePosition: PlayerPieceLocation = {
                type: "bench",
                location: {
                    x: benchPieceSlot,
                    y: 0
                }
            };

            this.store.dispatch(PlayerGameActions.dropPiecePlayerAction({
                pieceId: firstBenchPiece.id,
                from: benchPiecePosition,
                to: boardPiecePosition
            }));
            await delay(BOT_ACTION_TIME_MS);
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
        const { cost } = getDefinitionById(piece.definitionId);
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

    private botLogicSaga() {
        const preparingPhase = async () => {
            await this.buyBestPieces();
            await this.spendExcessMoneyOnXp();
            await this.putBenchOnBoard();

            this.store.dispatch(PlayerGameActions.readyUpPlayerAction());
            await delay(BOT_ACTION_TIME_MS);
        };

        return function*() {
            // take first event manually to allow for a delay
            const event: GameEvents.GamePhaseStartedEvent = yield take(GameEvents.gamePhaseStartedEvent.toString());

            yield delay(500);

            if (event.payload.phase === GamePhase.PREPARING) {
                preparingPhase();
            } else if (event.payload.phase === GamePhase.PLAYING) {
                yield put(PlayerEvents.clientFinishMatchEvent());
            }

            yield takeLatest<GameEvents.GamePhaseStartedEvent>(
                GameEvents.gamePhaseStartedEvent.toString(),
                function*({ payload: { phase } }) {
                    if (phase === GamePhase.PREPARING) {
                        preparingPhase();
                    } else if (phase === GamePhase.PLAYING) {
                        yield put(PlayerEvents.clientFinishMatchEvent());
                    }
                }
            );
        };
    }
}
