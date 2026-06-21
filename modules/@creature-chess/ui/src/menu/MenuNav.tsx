import * as React from "react";

import classNames from "classnames";

import { createUseThemeStyles } from "../styles";

export type MenuNavItem = {
	key: string;
	icon: React.ReactNode;
	label: string;
};

type Props<TItems extends readonly MenuNavItem[]> = {
	items: TItems;
	active?: TItems[number]["key"] | null;
	onSelect?: (key: TItems[number]["key"]) => void;
	className?: string;
};

const useStyles = createUseThemeStyles((theme) => ({
	nav: {
		display: "flex",
		flexDirection: "row",
		width: "100%",
		background: theme.palette.surface,
		borderRadius: "0.75rem",
		padding: "0.4rem",
		gap: "0.25rem",
		boxSizing: "border-box",
	},
	item: {
		"display": "flex",
		"flexDirection": "column",
		"alignItems": "center",
		"justifyContent": "center",
		"gap": "0.25rem",
		"flex": 1,
		"minWidth": 0,
		"padding": "0.5rem 0.25rem",
		"border": "none",
		"borderRadius": "0.5rem",
		"background": "transparent",
		"color": theme.palette.muted,
		"fontFamily": theme.typography.primary,
		"fontSize": "0.85rem",
		"cursor": "pointer",
		"transition": "color 150ms ease, background 150ms ease",

		"&:hover": {
			color: theme.palette.light.neutral,
		},
	},
	itemActive: {
		"color": theme.palette.primary.light,
		"&:hover": {
			color: theme.palette.primary.light,
		},
	},
	icon: {
		fontSize: "1.4rem",
		lineHeight: 1,
	},
	label: {
		overflow: "hidden",
		textOverflow: "ellipsis",
		whiteSpace: "nowrap",
		maxWidth: "100%",
	},
}));

export function MenuNav<TItems extends readonly MenuNavItem[]>({
	items,
	active,
	onSelect,
	className,
}: Props<TItems>) {
	const classes = useStyles();

	return (
		<nav className={classNames(classes.nav, className)}>
			{items.map((item) => (
				<button
					key={item.key}
					type="button"
					className={classNames(classes.item, {
						[classes.itemActive]: active === item.key,
					})}
					onClick={() => onSelect?.(item.key)}
				>
					<span className={classes.icon}>{item.icon}</span>
					<span className={classes.label}>{item.label}</span>
				</button>
			))}
		</nav>
	);
}
