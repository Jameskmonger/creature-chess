import React, { useCallback } from "react";

import { useDispatch, useSelector } from "react-redux";

import { GamemodeSettings } from "@creature-chess/models/settings";

import { AppState } from "../../store";
import { lobbyUpdateSettingEvent } from "../../store/lobby/actions";

type LobbySettingInputProps = {
	type: "text" | "number";
	settingsKey: keyof GamemodeSettings;
};

export function LobbySettingInput({
	type,
	settingsKey,
}: LobbySettingInputProps) {
	const dispatch = useDispatch();
	const value = useSelector(
		(state: AppState) => state.lobby?.settings[settingsKey] ?? null
	);

	const onInputChange = useCallback(
		(e: React.ChangeEvent<HTMLInputElement>) => {
			dispatch(
				lobbyUpdateSettingEvent({ key: settingsKey, value: e.target.value })
			);
		},
		[dispatch, settingsKey]
	);

	if (value === null) {
		return null;
	}

	return (
		<div>
			<label htmlFor={settingsKey}>{settingsKey}</label>
			<input
				type={type}
				id={settingsKey}
				value={value}
				onChange={onInputChange}
			/>
		</div>
	);
}
