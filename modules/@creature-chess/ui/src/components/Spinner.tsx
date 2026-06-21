import * as React from "react";

import classNames from "classnames";

import { createUseThemeStyles } from "../styles";

type Props = {
	/** Diameter in px, or any CSS length. */
	size?: number | string;
	className?: string;
};

const useStyles = createUseThemeStyles((theme) => ({
	"spinner": {
		width: "var(--spinner-size)",
		height: "var(--spinner-size)",
		border: `calc(var(--spinner-size) / 8) solid color-mix(in oklab, ${theme.palette.light.neutral} 20%, transparent)`,
		borderTopColor: theme.palette.primary.light,
		borderRadius: "50%",
		animation: "$spin 1s linear infinite",
	},
	"@keyframes spin": {
		to: { transform: "rotate(360deg)" },
	},
}));

export function Spinner({ size = 48, className }: Props) {
	const classes = useStyles();
	const cssSize = typeof size === "number" ? `${size}px` : size;

	return (
		<div
			className={classNames(classes.spinner, className)}
			style={{ ["--spinner-size" as string]: cssSize } as React.CSSProperties}
			role="status"
			aria-label="Loading"
		/>
	);
}
