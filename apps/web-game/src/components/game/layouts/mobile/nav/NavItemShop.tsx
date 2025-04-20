import React from "react";

import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { createUseStyles } from "react-jss";
import { useSelector } from "react-redux";

import { AppState } from "../../../../../store";
import { Overlay } from "../../../../../store/game/ui";
import { NavItem } from "./NavItem";

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
		fontFamily: '"Roboto", sans-serif',
		letterSpacing: "1px",
	},
});

export function NavItemShop() {
	const styles = useStyles();

	const shopLocked = useSelector<AppState, boolean>(
		(state) => state.game.cardShop.locked
	);

	return (
		<NavItem overlay={Overlay.SHOP} icon={faShoppingCart}>
			{shopLocked && (
				<div className={styles.chip}>
					<span className={styles.chipText}>LOCKED</span>
				</div>
			)}
		</NavItem>
	);
}
