import * as React from "react";
import { createUseStyles } from "react-jss";

interface Props {
	style?: "primary" | "secondary";
	onClick?: (e: React.MouseEvent) => void;
	children: React.ReactNode | React.ReactNode[];
}

// todo implement primary style
const getColor = (style: "primary" | "secondary") => style === "primary" ? "#fff" : "#fff";
const getBackground = (style: "primary" | "secondary") => style === "primary" ? "#1a1c2c" : "#1a1c2c";

const useStyles = createUseStyles({
	button: (props: Props) => ({
		padding: "0.25em 1em",
		fontSize: "1em",
		color: getColor(props.style!),
		background: getBackground(props.style!),
		border: "none"
	})
});

const Button: React.FunctionComponent<Props> = (props) => {
	const classes = useStyles(props);

	return <button className={classes.button} onClick={props.onClick}>{props.children}</button>;
};

export { Button };
