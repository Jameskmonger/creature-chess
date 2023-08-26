import React from "react";

import { useSelector } from "react-redux";

import { Text } from "@cc-web/ui/text";

import { AppState } from "../../../../store";

export function QuickChatBox({ sendingPlayerId }: { sendingPlayerId: string }) {
	const currentChat = useSelector<AppState, any>(
		(state) => state.game.quickChat[sendingPlayerId]
	);

	if (!currentChat) {
		return null;
	}

	return <Text>{currentChat.value}</Text>;
}
