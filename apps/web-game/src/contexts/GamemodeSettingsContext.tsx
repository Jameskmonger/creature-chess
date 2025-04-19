import { createContext, useContext } from "react";

import { GamemodeSettings } from "@creature-chess/models/settings";

export const GamemodeSettingsContext = createContext<GamemodeSettings>(
	null as unknown as GamemodeSettings
);
GamemodeSettingsContext.displayName = "GamemodeSettingsContext";

export const GamemodeSettingsContextProvider = GamemodeSettingsContext.Provider;

export const useGamemodeSettings = () => {
	const settings = useContext(GamemodeSettingsContext);

	if (!settings) {
		throw new Error(
			"No valid GamemodeSettingsContext found for useGamemodeSettings"
		);
	}

	return settings;
};
