import {
	playerRunPreparingPhaseEvent,
} from "../../../../game/events";
import { afterRerollCardsEvent } from "../../events";
import { PlayerStartListening } from "../../player";
import { PlayerState } from "../../state";
import {
	playerInfoCommands,
	updateShopLockCommand,
} from "../../state/commands";
import {
	getPlayerMoney,
	isPlayerAlive,
	isPlayerShopLocked,
} from "../../state/selectors";
import { addXpCommand } from "../xp";

export const setupPreparingPhaseListener = (startListening: PlayerStartListening) => {
	startListening({
		actionCreator: playerRunPreparingPhaseEvent,
		effect: async (_action, api) => {
			if (!isPlayerAlive(api.getState())) {
				return;
			}

			const matchRewards = (api.getState() as PlayerState).playerInfo.matchRewards;

			if (matchRewards) {
				const currentMoney = getPlayerMoney(api.getState());
				const totalMatchReward = matchRewards.rewardMoney.total;

				api.dispatch(
					playerInfoCommands.updateMoneyCommand(currentMoney + totalMatchReward)
				);
				api.dispatch(addXpCommand(1));
			}

			const locked = isPlayerShopLocked(api.getState());

			if (!locked) {
				api.dispatch(afterRerollCardsEvent());
			}

			api.dispatch(updateShopLockCommand(false));

			if (matchRewards) {
				api.dispatch(playerInfoCommands.playerMatchRewardsEvent(null));
				api.dispatch(
					playerInfoCommands.updateOpponentCommand({
						id: null,
					})
				);
			}
		},
	});
};
