import { put, takeEvery } from "redux-saga/effects";
import { getContext, select } from "typed-redux-saga";
import { playerRunPreparingPhaseEvent, PlayerRunPreparingPhaseEvent } from "../../../game/events";
import { afterRerollCardsEvent } from "../../events";
import { PlayerInfoCommands } from "../../playerInfo";
import { getPlayerLevel, isPlayerShopLocked } from "../../playerSelectors";
import { PlayerBoardSlices } from "../../sagaContext";

export const playerPreparingPhase = function*() {
    const { boardSlice } = yield* getContext<PlayerBoardSlices>("boardSlices");

    yield takeEvery<PlayerRunPreparingPhaseEvent>(
        playerRunPreparingPhaseEvent.toString(),
        function*() {
            const locked = yield* select(isPlayerShopLocked);

            if (!locked) {
                yield put(afterRerollCardsEvent());
            }

            yield put(PlayerInfoCommands.clearOpponentCommand());

            const level = yield* select(getPlayerLevel);

            yield put(boardSlice.commands.setPieceLimitCommand(level));
            yield put(boardSlice.commands.unlockBoardCommand());
        }
    );
};
