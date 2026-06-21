import * as React from "react";

import classNames from "classnames";

import { createUseThemeStyles } from "../styles";

type Props = {
	/** Branding on the left, typically the logo. */
	brand: React.ReactNode;
	/** Identity slot on the right, typically an `AccountPill`. */
	account?: React.ReactNode;
	/** Gear icon node for the settings control. */
	settingsIcon?: React.ReactNode;
	onOpenSettings?: () => void;
	className?: string;
};

const useStyles = createUseThemeStyles((theme) => ({
	bar: {
		display: "flex",
		flexDirection: "row",
		alignItems: "center",
		gap: "0.5rem",
		width: "100%",
		padding: "0.4rem 0.75rem",
		boxSizing: "border-box",
		background: theme.palette.surface,
		borderRadius: "0.75rem",
	},
	brand: {
		"display": "flex",
		"alignItems": "center",
		"minWidth": 0,
		"marginRight": "auto",
		"& img": {
			display: "block",
			// Large enough that the pixel wordmark stays legible on small phones.
			height: "clamp(2.75rem, 9vw, 3.5rem)",
			width: "auto",
		},
	},
	account: {
		display: "flex",
		alignItems: "center",
		minWidth: 0,
	},
	settings: {
		"display": "flex",
		"alignItems": "center",
		"justifyContent": "center",
		"flex": "none",
		"width": "2rem",
		"height": "2rem",
		"padding": 0,
		"border": "none",
		"borderRadius": "0.5rem",
		"background": "transparent",
		"color": theme.palette.muted,
		"fontSize": "1.25rem",
		"cursor": "pointer",
		"transition": "color 150ms ease, background 150ms ease",

		"&:hover": {
			color: theme.palette.light.neutral,
			background: `color-mix(in oklab, ${theme.palette.light.neutral} 10%, transparent)`,
		},
	},
}));

export function MenuHeaderBar({
	brand,
	account,
	settingsIcon,
	onOpenSettings,
	className,
}: Props) {
	const classes = useStyles();

	return (
		<header className={classNames(classes.bar, className)}>
			<div className={classes.brand}>{brand}</div>
			{account && <div className={classes.account}>{account}</div>}
			{(settingsIcon || onOpenSettings) && (
				<button
					type="button"
					className={classes.settings}
					onClick={onOpenSettings}
					aria-label="Settings"
				>
					{settingsIcon}
				</button>
			)}
		</header>
	);
}
