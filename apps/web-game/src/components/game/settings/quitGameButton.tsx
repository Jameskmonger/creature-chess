import * as React from "react";

import { createUseStyles } from "react-jss";
import { useDispatch } from "react-redux";

import { PlayerActions } from "@creature-chess/gamemode";

const useStyles = createUseStyles({
	button: {
		background: "#b13e53",
		color: "white",
		border: "none",
		padding: "0.5em 1em",
		borderRadius: "4px",
		cursor: "pointer",
		fontSize: "1rem",
	},
});

export function QuitGameButton() {
	const styles = useStyles();
	const dispatch = useDispatch();
	const [areYouSure, setAreYouSure] = React.useState<boolean>(false);

	const onClick = areYouSure
		? () => {
				dispatch(PlayerActions.quitGamePlayerAction());
			}
		: () => {
				setAreYouSure(true);
			};

	if (!areYouSure) {
		return (
			<button className={styles.button} onClick={onClick}>
				Quit Game
			</button>
		);
	}

	return (
		<button className={styles.button} onClick={onClick}>
			Click again to quit
		</button>
	);
}
