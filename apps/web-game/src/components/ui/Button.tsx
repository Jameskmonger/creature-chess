import React, { useMemo } from "react";

import { createUseStyles } from "react-jss";

type ButtonProps = {
	children: React.ReactNode;
	disabled?: boolean;

	onClick?: () => void;

	type?: "primary" | "secondary";
	size?: "small" | "medium" | "large";
};

function getFontSize(size: ButtonProps["size"]) {
	switch (size) {
		case "small":
			return "0.8rem";
		case "large":
			return "1rem";
		default:
		case "medium":
			return "0.9rem";
	}
}

function getPadding(size: ButtonProps["size"]) {
	switch (size) {
		case "small":
			return "0.4em 0.8em";
		case "large":
			return "0.8em 1.6em";
		default:
		case "medium":
			return "0.6em 1.2em";
	}
}

function getBackgroundColor(type: ButtonProps["type"]) {
	switch (type) {
		case "secondary":
			return "#e1cab9";
		default:
		case "primary":
			return "#b13e53";
	}
}

function getTextColor(type: ButtonProps["type"]) {
	switch (type) {
		case "secondary":
			return "#393939";
		default:
		case "primary":
			return "#fff";
	}
}

const useStyles = createUseStyles<string, ButtonProps>({
	button: (props) => ({
		"padding": getPadding(props.size),
		"marginBottom": "1rem",
		"fontSize": getFontSize(props.size),
		"cursor": "pointer",
		"border": "none",
		"borderRadius": "4px",
		"color": getTextColor(props.type),
		"background": getBackgroundColor(props.type),
		"transition": `background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
			box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
			border-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
			color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
			filter 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms`,

		"&:hover, &:focus": {
			outline: "none",
			filter: "brightness(1.1)",
			boxShadow:
				"0px 2px 4px -1px rgba(0,0,0,0.2), 0px 4px 5px 0px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12)",
		},
	}),
});

export function Button(props: ButtonProps) {
	const styles = useStyles(props);

	return (
		<button
			onClick={props.onClick}
			className={styles.button}
			disabled={props.disabled}
		>
			{props.children}
		</button>
	);
}
