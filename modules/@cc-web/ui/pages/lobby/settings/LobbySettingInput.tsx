import React, { useCallback } from "react";

import { GamemodeSettings } from "@creature-chess/models/settings";

import { useLobbyPage } from "../LobbyPageContext";

type LobbySettingInputProps = {
	type: "text" | "number";
	settingsKey: keyof GamemodeSettings;
};

export function LobbySettingInput({
	type,
	settingsKey,
}: LobbySettingInputProps) {
	const { settings, onUpdateSetting } = useLobbyPage();

	const value = settings[settingsKey];

	const onChange = useCallback(
		(e: React.ChangeEvent<HTMLInputElement>) => {
			onUpdateSetting(settingsKey, e.target.value);
		},
		[onUpdateSetting, settingsKey]
	);

	return (
		<div>
			<label htmlFor={settingsKey}>{settingsKey}</label>
			<input type={type} id={settingsKey} value={value} onChange={onChange} />
		</div>
	);
}
