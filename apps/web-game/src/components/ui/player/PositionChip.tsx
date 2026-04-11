import React from "react";

import { createUseThemeStyles } from "~/useStyles";

type Props = {
	position: number;
};

const useStyles = createUseThemeStyles((theme) => ({
	chip: {
		"background": "#333",
		"padding": "4px 8px",
		"fontFamily": theme.typography.primary,
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
}));

export function PositionChip({ position }: Props) {
	const classes = useStyles();

	return <div className={classes.chip}>#{position}</div>;
}
