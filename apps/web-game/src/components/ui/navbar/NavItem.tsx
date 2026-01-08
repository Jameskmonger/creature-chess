import React from "react";

import { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classnames from "classnames";
import { createUseStyles } from "react-jss";

type Props = {
	isActive: boolean;
	icon: IconDefinition;
	children?: React.ReactNode;
	onClick?: () => void;
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

export function NavItem({ isActive, icon, children, onClick }: Props) {
	const styles = useStyles();

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
