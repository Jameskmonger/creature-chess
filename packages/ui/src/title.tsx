import * as React from "react";
import { createUseStyles } from "react-jss";
import { PlayerTitle, TITLES } from "@creature-chess/models";

type Props = { titleId: PlayerTitle | null };

const getColor = (titleId: PlayerTitle | null) => {
	switch (titleId) {
		case PlayerTitle.Developer:
			return "#79ffe0";
		case PlayerTitle.Contributor:
			return "#e89292";
		case PlayerTitle.HallOfFame:
			return "#f7ee85";
		default:
			return "#d6d0d0";
	}
};

const useStyles = createUseStyles({
	title: {
		fontFamily: "Arial, sans-serif",
		fontSize: "0.65rem",
		fontWeight: 700,
		color: ({ titleId }: Props) => getColor(titleId),
		textAlign: "inherit",
		textTransform: "uppercase",
	}
});

const Title: React.FunctionComponent<Props> = (props) => {
	const classes = useStyles(props);

	if (!props.titleId) {
		return null;
	}

	return <span className={classes.title}>{TITLES[props.titleId].text}</span>;
};

export { Title };
