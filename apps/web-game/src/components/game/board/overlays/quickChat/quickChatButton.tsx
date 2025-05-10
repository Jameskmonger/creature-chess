/* eslint-disable react/jsx-no-bind */
import React from "react";

import { createUseStyles } from "react-jss";
import { useDispatch } from "react-redux";
import { useLocalPlayerId } from "~/auth/context";

import { PlayerActions } from "@creature-chess/gamemode";
import { QuickChatOption } from "@creature-chess/models";

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

const QuickChatButton: React.FunctionComponent<{
	chatOption: QuickChatOption;
}> = ({ chatOption }) => {
	const styles = useStyles();
	const dispatch = useDispatch();

	const sendingPlayerId = useLocalPlayerId();

	const onClick = () => {
		dispatch(
			PlayerActions.quickChatPlayerAction({
				sendingPlayerId,
				chatValue: chatOption,
			})
		);
	};
	return (
		<button onClick={onClick} className={styles.button}>
			{chatOption.toString()}
		</button>
	);
};
export { QuickChatButton };
