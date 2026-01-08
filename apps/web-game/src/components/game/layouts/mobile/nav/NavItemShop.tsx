import React from "react";

import { createUseStyles } from "react-jss";
import { useSelector } from "react-redux";
import { AppState } from "~/store";

const useStyles = createUseStyles({
	chip: {
		position: "absolute",
		top: "-16px",
		width: "100%",
	},
	chipText: {
		fontSize: "12px",
		padding: "0.25em",
		borderRadius: "4px",
		background: "#b13e53",
		letterSpacing: "1px",
	},
});

export function NavItemShop() {
	const styles = useStyles();

	const shopLocked = useSelector<AppState, boolean>(
		(state) => state.game.cardShop.locked
	);

	if (shopLocked === false) {
		return null;
	}

	return (
		<div className={styles.chip}>
			<span className={styles.chipText}>LOCKED</span>
		</div>
	);
}
