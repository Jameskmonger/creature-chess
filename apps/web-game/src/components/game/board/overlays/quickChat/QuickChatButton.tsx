/* eslint-disable react/jsx-no-bind */
import * as React from "react";

import { createUseStyles } from "react-jss";
import { useDispatch } from "react-redux";

import { quickChatPlayerAction, type QuickChatOption } from "@creature-chess/models";

const useStyles = createUseStyles({
	button: {
		"fontSize": "1em",

		"@media (orientation: portrait) and (min-width: 431px)": {
			gap: "32px",
			padding: "12px 24px",
			fontSize: "1.5em",
		},
	},
});

export function QuickChatButton({
	chatOption,
	sendingPlayerId,
}: {
	chatOption: QuickChatOption;
	sendingPlayerId: string | null;
}) {
	const styles = useStyles();
	const dispatch = useDispatch();

	const onClick = () => {
		dispatch(quickChatPlayerAction({ sendingPlayerId, chatValue: chatOption }));
	};

	return (
		<button onClick={onClick} className={styles.button}>
			{chatOption.toString()}
		</button>
	);
}
