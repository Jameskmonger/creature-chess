import React from "react";

import { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classnames from "classnames";
import { createUseStyles } from "react-jss";
import { useDispatch, useSelector } from "react-redux";

import { AppState } from "../../../../../store";
import {
	Overlay,
	closeOverlay,
	openOverlay,
} from "../../../../../store/game/ui";

type Props = {
	overlay: Overlay;
	icon: IconDefinition;
	children?: React.ReactNode;
};

const useStyles = createUseStyles({
	navBarItem: {
		"padding": "16px 0",
		"fontSize": "24px",

		"@media (min-width: 412px)": {
			padding: "16px 0",
			fontSize: "32px",
		},

		"color": "#fff",
		"background": "#171717",
		"flex": "1",
		"border": "none",
		"outline": "none",

		"&:not(:last-child)": {
			borderRight: "3px solid #3c3c3c",
		},

		"position": "relative",
	},
	navBarItemActive: {
		textDecoration: "underline",
		background: "#3c3c3c",
	},
});

export function NavItem({ overlay, icon, children }: Props) {
	const styles = useStyles();
	const dispatch = useDispatch();
	const isActive = useSelector<AppState, boolean>(
		(state) => state.game.ui.currentOverlay === overlay
	);
	const canUseShop = useSelector<AppState, boolean>(
		(state) => state.game.playerInfo.health !== 0
	);
	const isSpectating = useSelector<AppState, boolean>(
		(state) => state.game.spectating.id !== null
	);

	const onClick = () => {
		if (isActive) {
			dispatch(closeOverlay());
			return;
		}
		if (overlay === Overlay.SHOP) {
			if (!canUseShop || isSpectating) {
				return;
			}
		}

		dispatch(openOverlay(overlay));
	};

	return (
		<button
			className={classnames(styles.navBarItem, {
				[styles.navBarItemActive]: isActive,
			})}
			onClick={onClick}
		>
			<FontAwesomeIcon icon={icon} />

			{children}
		</button>
	);
}
