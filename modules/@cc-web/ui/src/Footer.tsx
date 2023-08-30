import * as React from "react";

import { createUseStyles } from "react-jss";

import { APP_BASE_URL } from "@cc-web/shared/constants";

// eslint-disable-next-line @typescript-eslint/no-var-requires
const APP_VERSION = require("../../../../package.json").version;

const useStyles = createUseStyles({
	footer: {
		marginTop: "0.5em",
		marginBottom: "0.5em",
		textAlign: "center",
	},
	item: {
		fontFamily: "Arial, sans-serif",
		fontSize: "0.8em",
		fontStyle: "italic",
		color: "#fff",
	},
});

export const Footer: React.FunctionComponent = () => {
	const classes = useStyles();

	return (
		<div className={classes.footer}>
			<span className={classes.item}>v{APP_VERSION || "-.-.-"}</span>
			{" - "}
			<a className={classes.item} href="https://reddit.com/r/creaturechess/">
				/r/CreatureChess
			</a>
			{" - "}
			<a className={classes.item} href={`${APP_BASE_URL}privacy`}>
				Privacy Policy
			</a>
			{" - "}
			<a
				className={classes.item}
				href="https://github.com/Jameskmonger/creature-chess"
			>
				Licenses on GitHub
			</a>
		</div>
	);
};
