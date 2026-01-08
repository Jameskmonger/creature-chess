import classNames from "classnames";
import React from "react";
import { createUseThemeStyles } from "~/useStyles";

const useStyles = createUseThemeStyles(theme => ({
	tagline: {
		height: 18,
		fontSize: 18,
		color: theme.palette.light.neutral,
		padding: "0.25em 1em",
		zIndex: 1,
		background: "rgba(85, 85, 85, 1.0)",
		transition: "opacity 0.3s linear, height 0.6s linear, padding 0.6s linear",
		cursor: "pointer",
	},

	highlight: {
		color: theme.palette.accent.neutral,
		fontFamily: theme.typography.accent
	}
}));

export function TagLine() {
	const classes = useStyles();

	function openTiberisoftWebsite() {
		window.open("https://tiberisoft.dev", "_blank");
	}

	return (
		<div
			className={classes.tagline}
			tabIndex={0}
			role="button"
			title="http://tiberisoft.dev"
			onClick={openTiberisoftWebsite}
			onKeyDown={(e) => { if (e.key === 'Enter') openTiberisoftWebsite(); }}
		>
			A <span className={classes.highlight}>'Tiberisoft'</span> Game
		</div>
	);
}
