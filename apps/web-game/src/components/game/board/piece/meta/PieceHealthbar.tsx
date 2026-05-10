import * as React from "react";

import { createUseStyles } from "react-jss";

import { ProgressBar } from "../../../../ui/progressBar";

interface HealthbarProps {
	color: "friendly" | "enemy";
	current: number;
	max: number;

	children?: React.ReactNode | React.ReactNode[];
}

const getFillBackground = ({ color }: HealthbarProps) =>
	color === "enemy" ? "#e03c71" : "#3887ca";

const getBorderColor = ({ color }: HealthbarProps) =>
	color === "enemy" ? "#a81a47" : "#296599";

const useStyles = createUseStyles<string, HealthbarProps>({
	fill: {
		background: getFillBackground,
		position: "absolute",
		bottom: 0,
		borderWidth: "2px",
		borderStyle: "solid",
		borderColor: getBorderColor,
	},
	bar: {
		"border": "2px solid #4a4a4a",

		"@container (max-width: 32px)": {
			borderWidth: "1px",
		},
	},
	container: {
		containerType: "size",
		width: "100%",
		height: "100%",
	},
});

function PieceHealthbar(props: HealthbarProps) {
	const classes = useStyles(props);

	return (
		<div className={classes.container}>
			<ProgressBar
				className={classes.bar}
				fillClassName={classes.fill}
				current={props.current}
				max={props.max}
			>
				{props.children}
			</ProgressBar>
		</div>
	);
}

export { PieceHealthbar };
