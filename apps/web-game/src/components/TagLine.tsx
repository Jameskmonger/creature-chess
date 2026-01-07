import classNames from "classnames";
import React from "react";
import { createUseThemeStyles } from "~/useStyles";

const useStyles = createUseThemeStyles(theme => ({
	tagline: {
		height: 18,
		fontSize: 18,
		color: "#fff",
		padding: "0.25em 2em",
		marginTop: "-16px",
		zIndex: 1,
		background: "rgba(85, 85, 85, 1.0)",
		transition: "opacity 0.3s linear, height 0.6s linear, padding 0.6s linear",
	},

	highlight: {
		color: theme.palette.accent.neutral,
		fontFamily: theme.typography.accent
	}
}));

export function TagLine() {
	const classes = useStyles();

	return (
		<div className={classNames(classes.tagline)}>
			A <span className={classes.highlight}>'Tiberisoft'</span> Game
		</div>
	);
}
