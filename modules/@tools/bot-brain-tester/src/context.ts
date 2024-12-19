import { createContext, useContext } from "react";

import { Card } from "@creature-chess/models";
import { GamemodeSettings } from "@creature-chess/models/settings";

import { BotPersonality } from "@cc-server/data";

export type BotBrainTesterContextValue = {
	personality: BotPersonality;
	gamemodeSettings: GamemodeSettings;
	state: {
		cards: Card[];
		health: number;
		money: number;
		level: number;
		xp: number;
	};
};

const BotBrainTesterContext = createContext<BotBrainTesterContextValue>(null!);
BotBrainTesterContext.displayName = "BotBrainTesterContext";

export const BotBrainTesterContextProvider = BotBrainTesterContext.Provider;

export const useBotBrain = () => useContext(BotBrainTesterContext);
