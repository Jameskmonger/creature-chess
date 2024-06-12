import * as React from "react";

import {
	faChartColumn,
	faQuestionCircle,
	faShoppingCart,
	faUsers,
	IconDefinition,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classnames from "classnames";
import { useSelector, useDispatch } from "react-redux";

import { AppState } from "../../../store";
import { closeOverlay, openOverlay } from "../../ui/actions";
import { Overlay } from "../../ui/overlay";
import { useStyles } from "./NavBar.styles";

const NavItem: React.FunctionComponent<{
	overlay: Overlay;
	icon: IconDefinition;
	chipText?: string;
	chipTextClassName?: string;
}> = ({ overlay, icon, chipText, chipTextClassName }) => {
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
			{chipText && (
				<div className={styles.chip}>
					<span className={classnames(styles.chipText, chipTextClassName)}>
						{chipText}
					</span>
				</div>
			)}
			<FontAwesomeIcon icon={icon} />
		</button>
	);
};

export const NavBar: React.FunctionComponent = () => {
	const styles = useStyles();

	const shopLocked = useSelector<AppState, boolean>(
		(state) => state.game.cardShop.locked
	);

	return (
		<nav className={styles.navBar}>
			<NavItem overlay={Overlay.PLAYERS} icon={faUsers} />
			<NavItem
				overlay={Overlay.SHOP}
				icon={faShoppingCart}
				chipText={shopLocked ? "LOCKED" : undefined}
				chipTextClassName={styles.shopLockChip}
			/>
			<NavItem overlay={Overlay.STATS} icon={faChartColumn} />
			<NavItem overlay={Overlay.SETTINGS} icon={faQuestionCircle} />
		</nav>
	);
};
