import * as React from "react";

import { createUseStyles } from "react-jss";

interface Props {
	disabled?: boolean;
	type?: "primary" | "secondary";
	onClick?: (e: React.MouseEvent) => void;
	children: React.ReactNode | React.ReactNode[];
}

// todo implement primary style
const getColor = (style: "primary" | "secondary") =>
	style === "primary" ? "#fff" : "#fff";
const getBackground = (style: "primary" | "secondary") =>
	style === "primary" ? "#1a1c2c" : "#1a1c2c";

const useStyles = createUseStyles({
	button: (props: Props) => ({
		padding: "0.25em 1em",
		fontSize: "1em",
		color: getColor(props.type!),
		background: getBackground(props.type!),
		border: "none",
		cursor: "pointer",

		"&:disabled": {
			background: "#575758",
			cursor: "not-allowed",
		},
	}),
});

const Button: React.FunctionComponent<Props> = (props) => {
	const classes = useStyles(props);

	const { onClick, disabled = false, children } = props;

	return (
		<button
			className={classes.button}
			onClick={!disabled ? onClick : undefined}
			disabled={disabled}
		>
			{children}
		</button>
	);
};

export { Button };
