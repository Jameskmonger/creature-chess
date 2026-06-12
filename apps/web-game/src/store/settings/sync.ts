import { createAction } from "@reduxjs/toolkit";
import { GameSession } from "~/game/GameSession";
import { ClientStartListening } from "~/store/listenerContext";

import { GamemodeSettings } from "@creature-chess/models";

export const setSettingsAction =
	createAction<GamemodeSettings>("setSettingsAction");

export const setupSettingsListener = (startListening: ClientStartListening) => {
	startListening({
		actionCreator: setSettingsAction,
		effect: ({ payload }, api) => {
			api.extra.sessionHolder.set(new GameSession(payload));
		},
	});
};
