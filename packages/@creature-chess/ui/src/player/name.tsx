import * as React from "react";
import { createUseStyles } from "react-jss";

type Props = {
	name: string;
	position: number;
	isLocal?: boolean;
};

const getLocalStyles = ({ isLocal = false }: Props): { fontStyle: string; color: string } | {} =>
	isLocal ? { fontStyle: "italic", color: "#ffcd75" } : {};

const useStyles = createUseStyles({
	name: (props: Props) => ({
		fontFamily: "Arial, sans-serif",
		fontSize: "0.8em",
		fontWeight: 700,
		color: "#fff",
		textTransform: "uppercase",
		...getLocalStyles(props)
	})
});

const PlayerName: React.FunctionComponent<Props> = (props) => {
	const classes = useStyles(props);

	return <span className={classes.name}>{props.position}.&nbsp;{props.name}</span>;
};

export { PlayerName };
