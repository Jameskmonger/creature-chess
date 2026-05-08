import { createReducer } from "@reduxjs/toolkit";

import {
	type CardShopState,
	type PlayerInfoState,
	type SpectatingState,
	GameEvents,
	initialCardShopState,
	initialPlayerInfoState,
	initialSpectatingState,
	PlayerCommands,
} from "@creature-chess/gamemode";
import { GamePhase } from "@creature-chess/models";

export const playerInfoReducer = createReducer<PlayerInfoState>(
	initialPlayerInfoState,
	(builder) => {
		builder
			.addCase(PlayerCommands.playerInfoCommands.playerMatchRewardsEvent, (state, action) => {
				state.matchRewards = action.payload;
			})
			.addCase(PlayerCommands.playerInfoCommands.updateStatusCommand, (state, action) => {
				state.status = action.payload;
			})
			.addCase(PlayerCommands.playerInfoCommands.updateReadyCommand, (state, action) => {
				state.ready = action.payload;
			})
			.addCase(PlayerCommands.playerInfoCommands.updateOpponentCommand, (state, action) => {
				state.opponentId = action.payload.id;
				state.opponentIsClone = action.payload.isClone ?? false;
			})
			.addCase(PlayerCommands.playerInfoCommands.updateBattleCommand, (state, action) => {
				state.battle = action.payload;
			})
			.addCase(PlayerCommands.playerInfoCommands.updateHealthCommand, (state, action) => {
				state.health = action.payload;
			})
			.addCase(PlayerCommands.playerInfoCommands.updateStreakCommand, (state, action) => {
				state.streak = action.payload;
			})
			.addCase(PlayerCommands.playerInfoCommands.updateLevelCommand, (state, action) => {
				state.level = action.payload.level;
				state.xp = action.payload.xp;
			})
			.addCase(PlayerCommands.playerInfoCommands.updateMoneyCommand, (state, action) => {
				state.money = action.payload;
			})
			.addCase(GameEvents.gamePhaseStartedEvent, (state, action) => {
				if (action.payload.phase === GamePhase.PREPARING) {
					state.opponentId = null;
					state.opponentIsClone = false;
				}
			});
	}
);

export const cardShopReducer = createReducer<CardShopState>(
	initialCardShopState,
	(builder) => {
		builder
			.addCase(PlayerCommands.updateCardsCommand, (state, action) => {
				state.cards = action.payload;
			})
			.addCase(PlayerCommands.updateShopLockCommand, (state, action) => {
				state.locked = action.payload;
			});
	}
);

export const spectatingReducer = createReducer<SpectatingState>(
	initialSpectatingState,
	(builder) => {
		builder.addCase(
			PlayerCommands.setSpectatingIdCommand,
			(state, action) => {
				state.id = action.payload;
			}
		);
	}
);

export const playerReducers = {
	playerInfo: playerInfoReducer,
	cardShop: cardShopReducer,
	spectating: spectatingReducer,
};
