import { put, takeEvery } from "redux-saga/effects";
import { select } from "typed-redux-saga";
import { playerRunPreparingPhaseEvent, PlayerRunPreparingPhaseEvent } from "../../../../game/events";
import { afterRerollCardsEvent, playerMatchRewardsEvent } from "../../../../player/events";
import { PlayerInfoCommands } from "../../../../player/playerInfo";
import { updateMoneyCommand } from "../../../../player/playerInfo/commands";
import { getPlayerLevel, getPlayerMoney, isPlayerAlive, isPlayerShopLocked } from "../../../../player/playerSelectors";
import { PlayerState } from "../../state";
import { getBoardSlice } from "../../selectors";
import { addXpCommand } from "../xp";

export const playerPreparingPhase = function*() {
	const boardSlice = yield* getBoardSlice();

	yield takeEvery<PlayerRunPreparingPhaseEvent>(
		playerRunPreparingPhaseEvent.toString(),
		function*() {
			const alive = yield* select(isPlayerAlive);

			if (!alive) {
				return;
			}

			const matchRewards = yield* select((state: PlayerState) => state.playerInfo.matchRewards);

			if (matchRewards) {
				const currentMoney = yield* select(getPlayerMoney);
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
				yield put(PlayerInfoCommands.updateOpponentCommand(null));
			}

			const level = yield* select(getPlayerLevel);

			yield put(boardSlice.commands.setPieceLimitCommand(level));
			yield put(boardSlice.commands.unlockBoardCommand());
		}
	);
};
