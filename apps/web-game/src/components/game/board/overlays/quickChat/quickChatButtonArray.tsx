import React from "react";

import { createUseStyles } from "react-jss";
import { useSelector } from "react-redux";
import { AppState } from "~/store";

import { GamePhase } from "@creature-chess/models";
import { getQuickChatOptions } from "@creature-chess/models/src/quickChat";

import { QuickChatButton } from "./quickChatButton";

const useStyles = createUseStyles({
	root: {
		display: "flex",
		flexDirection: "row",
		justifyContent: "center",
	},
	buttons: {
		"background": "#1d1d1d",
		"display": "flex",
		"flexDirection": "row",
		"gap": "12px",

		"@media (orientation: portrait) and (min-width: 431px)": {
			gap: "32px",
			padding: "12px 24px",
		},
	},
});

export function QuickChatButtonArray() {
	const styles = useStyles();
	const phase = useSelector<AppState, GamePhase | null>(
		(state) => state.game.roundInfo.phase
	);
	const options = getQuickChatOptions(phase);
	return (
		<div className={styles.root}>
			<div className={styles.buttons}>
				{options &&
					Object.values(options).map((chat) => (
						<QuickChatButton chatOption={chat} key={chat} />
					))}
			</div>
		</div>
	);
}
