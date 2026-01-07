import React from "react";
import { createUseThemeStyles } from "~/useStyles";
import classNames from "classnames";

const useStyles = createUseThemeStyles(theme => ({
	"stage": {
		"height": "32px",
		"width": "100%",
		"position": "relative",
		"background": theme.palette.primary.neutral,
		"transition": "height 0.6s linear, opacity 0.3s linear",

		"&:before": {
			content: '""',
			position: "absolute",
			top: "-4px",
			bottom: "-4px",
			left: "-4px",
			right: "-4px",
		}
	},
	"bar": {
		position: "absolute",
		top: "0",
		right: "100%",
		bottom: "0",
		left: "0",
		background: theme.palette.primary.light,
		width: "0",
		animation: "$loading 2s linear infinite",
	},
	"@keyframes loading": {
		"0%": {
			left: "0%",
			right: "100%",
			width: "0%",
		},
		"25%": {
			left: "0%",
			right: "60%",
			width: "40%",
		},
		"50%": {
			left: "30%",
			right: "30%",
			width: "40%",
		},
		"75%": {
			left: "60%",
			right: "0%",
			width: "40%",
		},
		"100%": {
			left: "100%",
			right: "0%",
			width: "0%",
		},
	}
}));

export function LoadingBar() {
	const classes = useStyles();
	return (
		<div className={classNames(classes.stage)}>
			<div className={classes.bar} />
		</div>
	);
}
