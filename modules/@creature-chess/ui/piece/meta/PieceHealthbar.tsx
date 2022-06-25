import * as React from "react";

import { createUseStyles } from "react-jss";

import { ProgressBar } from "../../src/display";

interface HealthbarProps {
	color: "friendly" | "enemy" | "spectating";
	current: number;
	max: number;

	children?: React.ReactNode | React.ReactNode[];
}

const getFillBackground = ({ color }: HealthbarProps) => {
	if (color === "spectating") {
		return "#601a4a";
	}

	if (color === "enemy") {
		return "#e03c71";
	}

	return "#3887ca";
};

const useStyles = createUseStyles({
	fill: {
		background: getFillBackground,
		position: "absolute",
		bottom: 0,
	},
});

const PieceHealthbar: React.FunctionComponent<HealthbarProps> = (props) => {
	const classes = useStyles(props);

	return (
		<ProgressBar
			fillClassName={classes.fill}
			current={props.current}
			max={props.max}
			vertical
		>
			{props.children}
		</ProgressBar>
	);
};

export { PieceHealthbar };
