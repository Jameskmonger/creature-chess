import { put } from "redux-saga/effects";
import { select, takeEvery } from "typed-redux-saga";

import {
	playerRunPreparingPhaseEvent,
	PlayerRunPreparingPhaseEvent,
} from "../../../../game/events";
import { afterRerollCardsEvent } from "../../events";
import { getBoardSlice } from "../../selectors";
import { PlayerState } from "../../state";
import {
	playerInfoCommands,
	updateShopLockCommand,
} from "../../state/commands";
import {
	getPlayerLevel,
	getPlayerMoney,
	isPlayerAlive,
	isPlayerShopLocked,
} from "../../state/selectors";
import { addXpCommand } from "../xp";

export const playerPreparingPhase = function* () {
	const boardSlice = yield* getBoardSlice();

	yield takeEvery<PlayerRunPreparingPhaseEvent>(
		playerRunPreparingPhaseEvent.toString(),
		function* () {
			const alive = yield* select(isPlayerAlive);

			if (!alive) {
				return;
			}

			const matchRewards = yield* select(
				(state: PlayerState) => state.playerInfo.matchRewards
			);

			if (matchRewards) {
				const currentMoney = yield* select(getPlayerMoney);
				const totalMatchReward = matchRewards.rewardMoney.total;

				// todo make addMoneyCommand
				yield put(
					playerInfoCommands.updateMoneyCommand(currentMoney + totalMatchReward)
				);
				yield put(addXpCommand(1));
			}

			const locked = yield* select(isPlayerShopLocked);

			if (!locked) {
				yield put(afterRerollCardsEvent());
			}

			yield put(updateShopLockCommand(false));

			if (matchRewards) {
				yield put(playerInfoCommands.playerMatchRewardsEvent(null));
				yield put(
					playerInfoCommands.updateOpponentCommand({
						id: null,
					})
				);
			}

			const level = yield* select(getPlayerLevel);

			yield put(boardSlice.commands.setPieceLimitCommand(level));
			yield put(boardSlice.commands.unlockBoardCommand());
		}
	);
};
