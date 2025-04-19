import React from "react";

import { Text } from "apps/web-game/src/components/ui/text";
import { useSelector } from "react-redux";

import { AppState } from "../../../../../store";

export function QuickChatBox({ sendingPlayerId }: { sendingPlayerId: string }) {
	const currentChat = useSelector<AppState, any>(
		(state) => state.game.quickChat[sendingPlayerId]
	);

	if (!currentChat) {
		return null;
	}

	return <Text>{currentChat.value}</Text>;
}
