import React from "react";

import { createUseStyles } from "react-jss";

type Props = {
	position: number;
};

const useStyles = createUseStyles({
	chip: {
		"background": "#333",
		"padding": "4px 8px",
		"fontFamily": '"Roboto", sans-serif',
		"fontWeight": 700,
		"color": "#fff",
		"fontStyle": "italic",
		"letterSpacing": "2px",
		"fontSize": "16px",

		"@media (orientation: portrait) and (max-width: 400px)": {
			padding: "4px",
			fontSize: "12px",
		},
	},
});

export function PositionChip({ position }: Props) {
	const classes = useStyles();

	return <div className={classes.chip}>#{position}</div>;
}
