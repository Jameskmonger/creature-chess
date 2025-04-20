import React from "react";

import { createUseStyles } from "react-jss";

import { QuickChatOption } from "@creature-chess/models";

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
		"gap": "16px",
		"padding": "4px 8px",

		"@media (orientation: portrait) and (min-width: 431px)": {
			gap: "32px",
			padding: "12px 24px",
		},
	},
});

export function QuickChatButtonArray() {
	const styles = useStyles();

	return (
		<div className={styles.root}>
			<div className={styles.buttons}>
				{Object.values(QuickChatOption).map((chat) => (
					<QuickChatButton chatOption={chat} key={chat} />
				))}
			</div>
		</div>
	);
}
