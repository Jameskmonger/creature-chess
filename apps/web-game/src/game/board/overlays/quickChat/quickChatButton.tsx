/* eslint-disable react/jsx-no-bind */
import React from "react";

import { useDispatch } from "react-redux";

import { usePlayerId } from "@creature-chess/auth-web";
import { PlayerActions } from "@creature-chess/gamemode";
import { QuickChatOption } from "@creature-chess/models";

const QuickChatButton: React.FunctionComponent<{
	chatOption: QuickChatOption;
}> = ({ chatOption }) => {
	const dispatch = useDispatch();

	const sendingPlayerId = usePlayerId();

	const onClick = () => {
		dispatch(
			PlayerActions.quickChatPlayerAction({
				sendingPlayerId,
				chatValue: chatOption,
			})
		);
	};
	return <button onClick={onClick}>{chatOption.toString()}</button>;
};
export { QuickChatButton };
