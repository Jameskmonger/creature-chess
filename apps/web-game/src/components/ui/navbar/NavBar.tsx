import * as React from "react";

import { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { createUseStyles } from "react-jss";

import { NavItem } from "./NavItem";

type NavBarItem = {
	key: string;
	icon: IconDefinition;
	children?: React.ReactNode;
};

type NavBarProps<TItems extends readonly NavBarItem[]> = {
	items: TItems;
	active?: TItems[number]["key"] | null;
	onSelect?: (key: TItems[number]["key"]) => void;
};

const useStyles = createUseStyles({
	navBar: {
		display: "flex",
		flexDirection: "row",
	},
});

export function NavBar<TItems extends readonly NavBarItem[]>({
	items,
	active,
	onSelect,
}: NavBarProps<TItems>) {
	const styles = useStyles();

	return (
		<nav className={styles.navBar}>
			{items.map((item) => (
				<NavItem
					key={item.key}
					icon={item.icon}
					isActive={active === item.key}
					onClick={() => onSelect?.(item.key)}
				>
					{item.children}
				</NavItem>
			))}
		</nav>
	);
}
