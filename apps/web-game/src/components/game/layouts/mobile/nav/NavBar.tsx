import * as React from "react";

import {
	faChartColumn,
	faQuestionCircle,
	faUsers,
} from "@fortawesome/free-solid-svg-icons";
import { createUseStyles } from "react-jss";

import { Overlay } from "../../../../../store/game/ui";
import { NavItem } from "./NavItem";
import { NavItemShop } from "./NavItemShop";

const useStyles = createUseStyles({
	navBar: {
		display: "flex",
		flexDirection: "row",
	},
});

export const NavBar: React.FunctionComponent = () => {
	const styles = useStyles();

	return (
		<nav className={styles.navBar}>
			<NavItem overlay={Overlay.PLAYERS} icon={faUsers} />
			<NavItemShop />
			<NavItem overlay={Overlay.STATS} icon={faChartColumn} />
			<NavItem overlay={Overlay.SETTINGS} icon={faQuestionCircle} />
		</nav>
	);
};
