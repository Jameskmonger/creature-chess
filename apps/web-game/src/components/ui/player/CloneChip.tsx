import React from "react";

import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
	chip: {
		"background": "#8fa3bd",
		"padding": "4px 8px",
		"fontFamily": '"Roboto", sans-serif',
		"fontWeight": 700,
		"color": "#fff",
		"fontStyle": "italic",
		"fontSize": "16px",

		"@media (orientation: portrait) and (max-width: 400px)": {
			padding: "4px",
			fontSize: "12px",
		},
	},
});

export function CloneChip() {
	const classes = useStyles();

	return <div className={classes.chip}>(clone)</div>;
}
