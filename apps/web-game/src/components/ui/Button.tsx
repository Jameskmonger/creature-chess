import React, { useMemo } from "react";

import { createUseStyles } from "react-jss";
import { createUseThemeStyles } from "~/useStyles";

type ButtonProps = {
	children: React.ReactNode;
	disabled?: boolean;

	onClick?: () => void;

	type?: "primary" | "secondary";
	size?: "small" | "medium" | "large";
};

const useStyles = createUseThemeStyles<string, ButtonProps>(theme => ({
	button: {
		background: theme.palette.primary.neutral,
		borderRadius: "12px",
		border: "none",
		padding: "0",
		cursor: (props) => (props.disabled ? "not-allowed" : "pointer"),
		outlineOffset: "4px",
		marginTop: "6px",

		"&:active:not(:disabled) $front": {
			transform: "translateY(-2px)",
		},
		"&:focus:not(:focus-visible)": {
			outline: "none",
		},
	},
	front: {
		display: "block",
		padding: "8px 16px",
		borderRadius: "12px",
		fontSize: "1.25rem",
		background: theme.palette.primary.light,
		color: theme.palette.primary.dark,
		transform: "translateY(-6px)",
		willChange: "transform",
		transition: "transform 250ms",
	},
}));

export function Button(props: ButtonProps) {
	const styles = useStyles(props);

	return (
		<button
			onClick={props.onClick}
			className={styles.button}
			disabled={props.disabled}
		>
			<span className={styles.front}>
				{props.children}
			</span>
		</button>
	);
}
