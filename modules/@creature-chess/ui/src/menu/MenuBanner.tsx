import * as React from "react";

import classNames from "classnames";

import { createUseThemeStyles } from "../styles";

type Props = {
	icon?: React.ReactNode;
	label: string;
	/** Muted text after the label. */
	suffix?: string;
	/** Trailing chevron node, shown when the banner is actionable. */
	chevron?: React.ReactNode;
	onClick?: () => void;
	className?: string;
};

const useStyles = createUseThemeStyles((theme) => ({
	banner: {
		"display": "flex",
		"alignItems": "center",
		"gap": "0.6rem",
		"width": "100%",
		"padding": "0.7rem 1rem",
		"border": "none",
		"borderRadius": "0.6rem",
		"background": theme.palette.surface,
		"color": theme.palette.light.neutral,
		"fontFamily": theme.typography.primary,
		"fontSize": "1.1rem",
		"cursor": "pointer",
		"textAlign": "left",
		"transition": "filter 150ms ease",

		"&:hover": {
			filter: "brightness(1.1)",
		},
	},
	icon: {
		display: "flex",
		alignItems: "center",
		flex: "none",
		color: theme.palette.secondary.light,
	},
	label: {
		overflow: "hidden",
		textOverflow: "ellipsis",
		whiteSpace: "nowrap",
	},
	suffix: {
		color: theme.palette.muted,
		whiteSpace: "nowrap",
	},
	chevron: {
		display: "flex",
		alignItems: "center",
		marginLeft: "auto",
		color: theme.palette.muted,
		flex: "none",
	},
}));

export function MenuBanner({
	icon,
	label,
	suffix,
	chevron,
	onClick,
	className,
}: Props) {
	const classes = useStyles();

	return (
		<button
			type="button"
			className={classNames(classes.banner, className)}
			onClick={onClick}
		>
			{icon && <span className={classes.icon}>{icon}</span>}
			<span className={classes.label}>{label}</span>
			{suffix && <span className={classes.suffix}>{suffix}</span>}
			{chevron && <span className={classes.chevron}>{chevron}</span>}
		</button>
	);
}
