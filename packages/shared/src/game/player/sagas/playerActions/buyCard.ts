import { Logger } from "winston";
import { take, select, put } from "@redux-saga/core/effects";
import { BuyCardAction, BUY_CARD_ACTION } from "../../actions";
import { GamePhase, PlayerPieceLocation, TileCoordinates } from "@creature-chess/models";
import { BoardCommands } from "../../../../board";
import { DefinitionProvider } from "../../../definitions/definitionProvider";
import { createPieceFromCard } from "../../../../utils/piece-utils";
import { addBenchPieceCommand } from "../../bench/commands";
import { PlayerState } from "../../store";
import { getPlayerBelowPieceLimit, getPlayerFirstEmptyBoardSlot } from "../../playerSelectors";
import { updateCardsCommand, updateMoneyCommand } from "../../playerInfo/commands";
import { getFirstEmptyBenchSlot } from "../../pieceSelectors";

const getCardDestination = (state: PlayerState, playerId: string, sortPositions?: (a: TileCoordinates, b: TileCoordinates) => -1 | 1): PlayerPieceLocation => {
    const belowPieceLimit = getPlayerBelowPieceLimit(state, playerId);
    const inPreparingPhase = state.game.phase === GamePhase.PREPARING;

    if (belowPieceLimit && inPreparingPhase) {
        const boardSlot = getPlayerFirstEmptyBoardSlot(state, sortPositions);

        if (boardSlot) {
            return {
                type: "board",
                location: {
                    x: boardSlot.x,
                    y: boardSlot.y
                }
            };
        }
    }

    const benchSlot = getFirstEmptyBenchSlot(state);

    if (benchSlot !== null) {
        return {
            type: "bench",
            location: {
                slot: benchSlot
            }
        };
    }

    return null;
};

export const buyCardPlayerActionSagaFactory = <TState extends PlayerState>(
    getLogger: () => Logger,
    definitionProvider: DefinitionProvider,
    playerId: string,
    name: string
) => {
    return function*() {
        while (true) {
            const action: BuyCardAction = yield take(BUY_CARD_ACTION);
            const index = action.payload.index;
            const sortPositions = action.meta ? action.meta.sortPositions : undefined;

            const state: TState = yield select();

            const cards = state.playerInfo.cards;
            const money = state.playerInfo.money;

            getLogger().info(
                "BUY_CARD_ACTION received",
                {
                    actor: { playerId, name },
                    details: { index },
                    state: { cards, money }
                }
            );

            const card = cards[index];

            if (!card) {
                getLogger().info(
                    `Player attempted to buy null/undefined card`,
                    { actor: { playerId, name } }
                );

                yield put(updateMoneyCommand(money));
                yield put(updateCardsCommand(state.playerInfo.cards));

                return;
            }

            if (money < card.cost) {
                getLogger().info(
                    "Not enough money to buy card",
                    {
                        actor: { playerId, name },
                        details: { index },
                        state: { cost: card.cost, cards, money }
                    }
                );

                yield put(updateMoneyCommand(money));
                yield put(updateCardsCommand(state.playerInfo.cards));

                return;
            }

            const destination = getCardDestination(state, playerId, sortPositions);

            // no valid slots
            if (destination === null) {
                getLogger().info(
                    `Player attempted to buy a card but has no available destination`,
                    { actor: { playerId, name } }
                );
                return;
            }

            const piece = createPieceFromCard(definitionProvider, playerId, card);
            const remainingCards = state.playerInfo.cards.map(c => c === card ? null : c);

            if (destination.type === "board") {
                yield put(BoardCommands.addBoardPiece(piece, destination.location.x, destination.location.y));
            } else if (destination.type === "bench") {
                yield put(addBenchPieceCommand(piece, destination.location.slot));
            }

            yield put(updateMoneyCommand(money - card.cost));
            yield put(updateCardsCommand(remainingCards));
        }
    };
};
