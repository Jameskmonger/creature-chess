import { Reducer } from "redux";
import { DevPlayerInfoState } from "./store";
import { PlayerInfoUpdateCommand } from "./commands";
import { PlayerEvent } from "./events";


export const initialPlayerInfoState: DevPlayerInfoState = {
	status: 0,
	health: 100,
	streak: {
		type: null,
		amount: 0
	},
	battle: null,
	matchRewards: null,
	opponentId: null,
	money: 3,
	ready: false,
	level: 1,
	xp: 0
};

export const playerInfoReducer: Reducer<DevPlayerInfoState, PlayerInfoUpdateCommand | PlayerEvent> =
	(state = initialPlayerInfoState, command) => {
		switch (command.type) {
			case "updateStatusCommand":
				return {
					...state,
					status: command.payload
				};
			case "updateReadyCommand":
				return {
					...state,
					ready: command.payload
				};
			case "updateHealthCommand":
				return {
					...state,
					health: command.payload
				};
			case "updateLevelCommand":
				return {
					...state,
					level: command.payload.level,
					xp: command.payload.xp
				};
			case "updateMoneyCommand":
				return {
					...state,
					money: command.payload
				};
			case "updateStreakCommand":
				return {
					...state,
					streak: {
						amount: command.payload.amount,
						type: command.payload.type
					}
				};

			default:
				return state;
		}
	};
