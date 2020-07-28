import { PlayerState } from "./store";

export const getPlayerMoney = (state: PlayerState) => state.gameInfo.money;
export const getPlayerLevel = (state: PlayerState) => state.level.level;
export const getPlayerXp = (state: PlayerState) => state.level.xp;
