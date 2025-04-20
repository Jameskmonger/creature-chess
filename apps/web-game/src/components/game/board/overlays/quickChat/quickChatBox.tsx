import React from "react";

import { useSelector } from "react-redux";
import { AppState } from "~/store";

import { Text } from "../../../../ui/text";

export function QuickChatBox({ sendingPlayerId }: { sendingPlayerId: string }) {
	const currentChat = useSelector<AppState, any>(
		(state) => state.game.quickChat[sendingPlayerId]
	);

	if (!currentChat) {
		return null;
	}

	return <Text>{currentChat.value}</Text>;
}
