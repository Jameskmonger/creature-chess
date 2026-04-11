import React from "react";

import classNames from "classnames";
import { createUseThemeStyles } from "~/useStyles";

type Props = React.PropsWithChildren<{
	className?: string;
	onClick?: React.MouseEventHandler<HTMLButtonElement>;
	color: "primary" | "secondary" | "muted";
	size: "small" | "medium" | "large";
	disabled?: boolean;
}>;

const useStyles = createUseThemeStyles<string, Props>((theme) => ({
	pushable: {
		"--btn-bg": ({ color }) => {
			switch (color) {
				case "primary":
					return theme.palette.primary.light;
				// todo add to theme
				case "secondary":
					return "#38b764";
				case "muted":
					return "#949494";
				default:
					return "hsl(345deg 100% 47%)";
			}
		},
		"--btn-text-color": ({ color }) => {
			switch (color) {
				case "primary":
					return theme.palette.dark.neutral;
				case "secondary":
					return theme.palette.dark.neutral;
				case "muted":
					return theme.palette.dark.neutral;
				default:
					return theme.palette.light.neutral;
			}
		},
		"--btn-font-size": ({ size }) => {
			switch (size) {
				case "small":
					return "1rem";
				case "medium":
					return "1.25rem";
				case "large":
					return "1.5rem";
				default:
					return "1.5rem";
			}
		},

		"--btn-border-radius": "4px",
		"--btn-padding": ({ size }) => {
			switch (size) {
				case "small":
					return "4px 8px";
				case "medium":
					return "8px";
				case "large":
					return "12px 42px";
				default:
					return "12px 42px";
			}
		},
		"--btn-3d-depth": ({ size }) => {
			switch (size) {
				case "small":
					return "2px";
				case "medium":
					return "3px";
				case "large":
					return "4px";
				default:
					return "4px";
			}
		},

		"position": "relative",
		"border": "none",
		"background": "transparent",
		"padding": 0,
		"cursor": "pointer",
		"outlineOffset": "4px",
		"transition": "filter 250ms",

		"&:hover:not(:active):not(:disabled)": {
			"filter": "brightness(110%)",

			"& $front": {
				transform: "translateY(calc(var(--btn-3d-depth) * -1.5))",
				transition: "transform 250ms cubic-bezier(0.3, 0.7, 0.4, 1.5)",
			},

			"& $shadow": {
				transform: "translateY(var(--btn-3d-depth))",
				transition: "transform 250ms cubic-bezier(0.3, 0.7, 0.4, 1.5)",
			},
		},

		"&:active:not(:disabled)": {
			"& $front": {
				transform: "translateY(calc(var(--btn-3d-depth) * -0.5))",
				transition: "transform 34ms",
			},

			"& $shadow": {
				transform: "translateY(calc(var(--btn-3d-depth) * 0.25))",
				transition: "transform 34ms",
			},
		},

		"&:focus:not(:focus-visible)": {
			outline: "none",
		},

		"&:disabled": {
			cursor: "not-allowed",
		},
	},
	shadow: {
		position: "absolute",
		top: 0,
		left: 0,
		width: "100%",
		height: "100%",
		borderRadius: "var(--btn-border-radius)",
		background: "hsl(0deg 0% 0% / 0.25)",
		willChange: "transform",
		transform: "translateY(calc(var(--btn-3d-depth) * 0.5))",
		transition: "transform 600ms cubic-bezier(0.3, 0.7, 0.4, 1)",
	},
	edge: {
		position: "absolute",
		top: 0,
		left: 0,
		width: "100%",
		height: "100%",
		borderRadius: "var(--btn-border-radius)",
		background: `linear-gradient(
			to left,
			color-mix(in oklab, var(--btn-bg) 45%, black) 0%,
			color-mix(in oklab, var(--btn-bg) 75%, black) 8%,
			color-mix(in oklab, var(--btn-bg) 75%, black) 92%,
			color-mix(in oklab, var(--btn-bg) 45%, black) 100%
		)`,
	},
	front: {
		display: "block",
		position: "relative",
		padding: "var(--btn-padding)",
		borderRadius: "var(--btn-border-radius)",
		fontSize: "var(--btn-font-size)",
		color: "var(--btn-text-color)",
		background: "var(--btn-bg)",
		willChange: "transform",
		transform: "translateY(calc(var(--btn-3d-depth) * -1))",
		transition: "transform 600ms cubic-bezier(0.3, 0.7, 0.4, 1)",
	},
}));

export function Button(props: Props) {
	const classes = useStyles(props);

	return (
		<button
			className={classNames(classes.pushable, props.className)}
			onClick={props.onClick}
			disabled={props.disabled}
		>
			<span className={classes.shadow} />
			<span className={classes.edge} />
			<span className={classes.front}>{props.children}</span>
		</button>
	);
}
