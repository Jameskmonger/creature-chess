import { Entity, entityFactory } from "../entity";

import { roundInfoReducer } from "../../game/roundInfo";
import { PlayerEntityDependencies } from "./dependencies";
import { setupPlayerListeners } from "./listeners/root";
import { PlayerState, playerReducers } from "./state";
import { PlayerVariables } from "./variables";

export const playerEntity = entityFactory<
	PlayerState,
	PlayerEntityDependencies,
	PlayerVariables
>({
	reducers: {
		...playerReducers,
		roundInfo: roundInfoReducer,
	},
	setupListeners(startListening, extra) {
		setupPlayerListeners(startListening, extra);
	},
});

export type PlayerEntity = Entity<PlayerState, PlayerEntityDependencies, PlayerVariables>;
