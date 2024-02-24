import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { GamemodeSettings } from "modules/@creature-chess/models/settings";

const initialState: GamemodeSettings = null as unknown as GamemodeSettings;

export const { reducer, actions: commands } = createSlice({
	name: "settings",
	initialState,
	reducers: {
		setSettingsCommand: (
			state,
			{ payload: settings }: PayloadAction<GamemodeSettings>
		) => settings,
	},
});
