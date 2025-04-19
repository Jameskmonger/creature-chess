import * as React from "react";

import { createUseStyles } from "react-jss";

import { MAX_HEALTH } from "@creature-chess/models/config";

import { ProgressBar } from "../progressBar";

type Props = {
	health: number;
};

const useStyles = createUseStyles({
	playerHealth: {
		position: "relative",
		display: "block",
		width: "100%",
		height: "16px",
	},
	fill: {
		background: "#20b720",
	},
	content: {
		position: "absolute",
		top: 0,
		right: "0.25em",
		fontFamily: "Arial, sans-serif",
		fontSize: "0.8em",
		fontWeight: 700,
		color: "#000",
	},
});

const renderHealthbar = (current: number) => current.toString();

const PlayerHealthbar: React.FunctionComponent<Props> = ({ health }) => {
	const classes = useStyles();

	return (
		<ProgressBar
			className={classes.playerHealth}
			fillClassName={classes.fill}
			contentClassName={classes.content}
			current={health}
			max={MAX_HEALTH}
			renderContents={renderHealthbar}
		/>
	);
};

export { PlayerHealthbar };
