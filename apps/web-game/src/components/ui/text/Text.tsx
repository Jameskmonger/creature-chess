import * as React from "react";

import classNames from "classnames";
import { createUseStyles } from "react-jss";

type Props = {
	children: React.ReactNode;
	tag?: "span" | "p";
	className?: string;
	uppercase?: boolean;
	size?: "sm" | "md" | "lg";
	font?: "standard" | "cursive";
	light?: boolean;
	center?: boolean;
};

const useStyles = createUseStyles<string, Props>({
	text: {
		// todo tie into media queries and use pixels
		fontSize: ({ size }) => {
			switch (size) {
				case "sm":
					return "0.8em";
				case "lg":
					return "1.2em";
				case "md":
				default:
					return "1em";
			}
		},
		textTransform: ({ uppercase }) => (uppercase ? "uppercase" : "none"),
		fontFamily: ({ font }) => {
			switch (font) {
				case "cursive":
					return '"Caveat Brush", cursive';
				case "standard":
				default:
					return '"Roboto", "sans-serif"';
			}
		},
		color: ({ light }) => {
			if (light) {
				return "#fff";
			}
			return "#000";
		},
		marginBottom: ({ tag, size }) =>
			tag === "p" && size !== "sm" ? "0.5em" : "0",
		textAlign: ({ center }) => (center ? "center" : "left"),
	},
});

export function Text(props: Props) {
	const classes = useStyles(props);

	const { children, tag = "span", className } = props;

	const Tag = tag;

	return <Tag className={classNames(classes.text, className)}>{children}</Tag>;
}
