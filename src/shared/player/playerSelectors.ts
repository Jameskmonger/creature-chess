import { PlayerState } from "./store";

export const getPlayerMoney = (state: PlayerState) => state.gameInfo.money;
