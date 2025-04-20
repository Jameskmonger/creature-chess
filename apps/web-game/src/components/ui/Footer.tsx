import * as React from "react";

import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
	footer: {
		textAlign: "center",
	},
	item: {
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
			<a
				className={classes.item}
				href="https://github.com/Jameskmonger/creature-chess"
			>
				GitHub
			</a>
		</div>
	);
};
