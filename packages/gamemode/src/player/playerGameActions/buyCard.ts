import { v4 as uuid } from "uuid";
import { createAction } from "@reduxjs/toolkit";
import { take, select, put, getContext } from "@redux-saga/core/effects";
import { Card, GamePhase, PieceModel, PlayerPieceLocation, TileCoordinates } from "@creature-chess/models";
import { BoardSelectors, topLeftToBottomRightSortPositions } from "@creature-chess/board";
import { PlayerState } from "../store";
import { getPlayerBelowPieceLimit } from "../playerSelectors";
import { updateMoneyCommand } from "../playerInfo/commands";
import { updateCardsCommand } from "../cardShop";
import { getDefinitionById } from "../../definitions";

const getCardDestination = (state: PlayerState, playerId: string, sortPositions?: (a: TileCoordinates, b: TileCoordinates) => -1 | 1): PlayerPieceLocation => {
    const belowPieceLimit = getPlayerBelowPieceLimit(state, playerId);
    const inPreparingPhase = state.roundInfo.phase === GamePhase.PREPARING;

    if (belowPieceLimit && inPreparingPhase) {
        const boardSlot = BoardSelectors.getFirstEmptySlot(state.board, sortPositions);

        if (boardSlot) {
            return {
                type: "board",
                location: boardSlot
            };
        }
    }

    const benchSlot = BoardSelectors.getFirstEmptySlot(state.bench, topLeftToBottomRightSortPositions);

    if (benchSlot !== null) {
        return {
            type: "bench",
            location: benchSlot
        };
    }

    return null;
};

const createPieceFromCard = (
    ownerId: string,
    card: Card
): PieceModel => {
    const { id, definitionId } = card;

    const definition = getDefinitionById(definitionId);
    const stats = definition.stages[0];

    return {
        id: id || uuid(),
        ownerId,
        definitionId,
        definition,
        facingAway: true,
        maxHealth: stats.hp,
        currentHealth: stats.hp,
        stage: 0
    };
};

export type BuyCardPlayerAction = ReturnType<typeof buyCardPlayerAction>;
export const buyCardPlayerAction = createAction<{
    index: number,
    sortPositions?: (a: TileCoordinates, b: TileCoordinates) => -1 | 1
}, "buyCardPlayerAction">("buyCardPlayerAction");

export const buyCardPlayerActionSaga = function*() {
    while (true) {
        const playerId = yield getContext("playerId");
        const name = yield getContext("playerName");
        const { getLogger } = yield getContext("dependencies");
        const { boardSlice, benchSlice } = yield getContext("boardSlices");

        const action: BuyCardPlayerAction = yield take(buyCardPlayerAction.toString());
        const index = action.payload.index;
        const sortPositions = action.payload.sortPositions || undefined;

        const state: PlayerState = yield select();

        const {
            cardShop: { cards },
            playerInfo: { money }
        } = state;

        const card = cards[index];

        if (!card) {
            getLogger().warn(
                `Player attempted to buy null/undefined card`,
                { actor: { playerId, name } }
            );

            yield put(updateMoneyCommand(money));
            yield put(updateCardsCommand(cards));

            continue;
        }

        if (money < card.cost) {
            getLogger().warn(
                "Not enough money to buy card",
                {
                    actor: { playerId, name },
                    details: { index }
                }
            );

            yield put(updateMoneyCommand(money));
            yield put(updateCardsCommand(cards));

            continue;
        }

        const destination = getCardDestination(state, playerId, sortPositions);

        // no valid slots
        if (destination === null) {
            getLogger().warn(
                `Player attempted to buy a card but has no available destination`,
                { actor: { playerId, name } }
            );
            continue;
        }

        const piece = createPieceFromCard(playerId, card);
        const remainingCards = cards.map(c => c === card ? null : c);

        if (destination.type === "board") {
            const { x, y } = destination.location;
            yield put(boardSlice.commands.addBoardPieceCommand({ piece, x, y }));
        } else if (destination.type === "bench") {
            yield put(benchSlice.commands.addBoardPieceCommand({ piece, x: destination.location.x, y: 0 }));
        }

        yield put(updateMoneyCommand(money - card.cost));
        yield put(updateCardsCommand(remainingCards));
    }
};
