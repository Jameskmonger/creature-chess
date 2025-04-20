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
		top: "-2px",
		right: "8px",
		fontFamily: '"Roboto", sans-serif',
		fontSize: "12px",
		fontWeight: 700,
		color: "#000",
	},
});

const renderHealthbar = (current: number) => `${current} / ${MAX_HEALTH} hp`;

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
