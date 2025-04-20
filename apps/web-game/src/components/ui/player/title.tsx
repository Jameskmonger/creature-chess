import * as React from "react";

import { createUseStyles } from "react-jss";

import { PlayerTitle } from "@creature-chess/models/player/title";

const useStyles = createUseStyles({
	title: {
		fontSize: "0.65rem",
		fontWeight: 700,
		color: ({ title }: React.ComponentProps<typeof Title>) =>
			title ? `#${title.color.toString(16)}` : "inherit",
		textAlign: "inherit",
		textTransform: "uppercase",
	},
});

export function Title(props: { title: PlayerTitle | null }) {
	const classes = useStyles(props);

	if (!props.title) {
		return null;
	}

	return <span className={classes.title}>{props.title.text}</span>;
}
