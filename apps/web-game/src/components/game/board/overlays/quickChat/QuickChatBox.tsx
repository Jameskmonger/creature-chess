import * as React from "react";

import { createUseStyles } from "react-jss";
import { useSelector } from "react-redux";

import { selectPlayerQuickChat } from "~/store/game/quickChat";

const useStyles = createUseStyles({
	box: {
		textAlign: "center",
		fontWeight: 700,
	},
});

/** Renders the emote a given player most recently sent. */
export function QuickChatBox({ playerId }: { playerId?: string }) {
	const styles = useStyles();
	const currentChat = useSelector(selectPlayerQuickChat(playerId ?? ""));

	if (!playerId || !currentChat) {
		return null;
	}

	return <div className={styles.box}>{currentChat.value}</div>;
}
