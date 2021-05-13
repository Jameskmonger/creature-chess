import { put, takeEvery } from "redux-saga/effects";
import { getContext, select } from "typed-redux-saga";
import { playerRunPreparingPhaseEvent, PlayerRunPreparingPhaseEvent } from "../../../game/events";
import { afterRerollCardsEvent, playerMatchRewardsEvent } from "../../events";
import { PlayerInfoCommands } from "../../playerInfo";
import { updateMoneyCommand } from "../../playerInfo/commands";
import { getPlayerLevel, isPlayerAlive, isPlayerShopLocked } from "../../playerSelectors";
import { PlayerBoardSlices } from "../../sagaContext";
import { PlayerState } from "../../store";
import { addXpCommand } from "../xp";

export const playerPreparingPhase = function*() {
	const { boardSlice } = yield* getContext<PlayerBoardSlices>("boardSlices");

	yield takeEvery<PlayerRunPreparingPhaseEvent>(
		playerRunPreparingPhaseEvent.toString(),
		function*() {
			const alive = yield* select(isPlayerAlive);

			if (!alive) {
				return;
			}

			const matchRewards = yield* select((state: PlayerState) => state.playerInfo.matchRewards);

			if (matchRewards) {
				const currentMoney = yield* select((state: PlayerState) => state.playerInfo.money);
				const totalMatchReward = matchRewards.rewardMoney.total;

				// todo make addMoneyCommand
				yield put(updateMoneyCommand(currentMoney + totalMatchReward));
				yield put(addXpCommand(1));
			}

			const locked = yield* select(isPlayerShopLocked);

			if (!locked) {
				yield put(afterRerollCardsEvent());
			}

			if (matchRewards) {
				yield put(playerMatchRewardsEvent(null));
				yield put(PlayerInfoCommands.clearOpponentCommand());
			}

			const level = yield* select(getPlayerLevel);

			yield put(boardSlice.commands.setPieceLimitCommand(level));
			yield put(boardSlice.commands.unlockBoardCommand());
		}
	);
};
