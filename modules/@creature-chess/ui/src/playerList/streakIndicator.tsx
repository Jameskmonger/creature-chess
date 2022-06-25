import * as React from "react";

import { createUseStyles } from "react-jss";

import { StreakType } from "@creature-chess/models";

type Props = {
	type: StreakType | null;
	amount: number | null;
};

const getBackground = (type: StreakType | null) =>
	type === StreakType.WIN ? "#38b764" : "#b13e53";

const useStyles = createUseStyles({
	indicator: (props: Props) => ({
		display: "flex",
		flexDirection: "column",
		justifyContent: "center",
		boxSizing: "border-box",
		padding: "0 0.4em",
		fontFamily: "Arial, sans-serif",
		fontSize: "0.8em",
		color: "#fff",
		background: getBackground(props.type),
		borderRadius: "50%",
	}),
});

const StreakIndicator: React.FunctionComponent<Props> = (props) => {
	const classes = useStyles(props);

	if (props.type === null || !props.amount || props.amount === 1) {
		return null;
	}

	return <div className={classes.indicator}>{props.amount}</div>;
};

export { StreakIndicator };
