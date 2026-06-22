import classNames from "classnames";
import React from "react";

import { createUseThemeStyles } from "~/useStyles";

type Props = {
	position: number;
	className?: string;
};

const useStyles = createUseThemeStyles((theme) => ({
	chip: {
		background: "#333",
		padding: "2px 4px",
		fontFamily: "ui-monospace, monospace",
		fontWeight: 500,
		color: "#fff",
		fontSize: "12px",
	},
}));

export function PositionChip({ position, className }: Props) {
	const classes = useStyles();

	return <div className={classNames(classes.chip, className)}>#{position}</div>;
}
