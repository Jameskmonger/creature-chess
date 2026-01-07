import React from "react";
import { createUseThemeStyles } from "~/useStyles";

const useStyles = createUseThemeStyles(theme => ({
	logoWrapper: {
		"width": "70%",
		"maxWidth": "440px",
		"& img": {
			width: "100%",
			height: "auto",
			display: "block",
			filter: "drop-shadow(0px 6px 4px #222)"
		}
	},
}));

export function Logo() {
	const classes = useStyles();

	return (
		<div className={classes.logoWrapper}>
			<img src={`${APP_IMAGE_ROOT}/ui/logo.png`} alt="Creature Chess Logo" />
		</div>
	);
}
