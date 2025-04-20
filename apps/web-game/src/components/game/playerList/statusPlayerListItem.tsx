import * as React from "react";

import { createUseStyles } from "react-jss";

import { PlayerBattle } from "@creature-chess/models/game/playerList";

import { Label } from "../../ui/label";
import { BattleInfo } from "./battleInfo";

type Props = {
	name: string;
	opponentName?: string;
	battle: PlayerBattle;
	status: string;
	subtitle?: string;
};

const useStyles = createUseStyles({
	container: {
		display: "flex",
		flexDirection: "row",
		width: "100%",
		boxSizing: "border-box",
		padding: "0.4rem",
		marginBottom: "0.25em",
		fontSize: "1.2em",
		fontWeight: "700",
		color: "#fff",
		textAlign: "center",
		textTransform: "uppercase",
		background: "#3b3d40",
	},

	// todo make this into a component
	col: {
		flex: 1,
		display: "flex",
		flexDirection: "column",
		textAlign: "center",
		justifyContent: "space-around",
	},

	subtitle: {
		padding: "0.5em 0",
		marginTop: "0.5em",
		fontSize: "0.9em",
		fontWeight: 700,
		color: "#847878",
		textAlign: "center",
		textTransform: "uppercase",
		borderTop: "2px solid #847878",
		borderBottom: "2px solid #847878",
	},

	name: {
		fontSize: "1.8em",
		fontStyle: "italic",
		color: "#cecece",
	},
});

const StatusPlayerListItem: React.FunctionComponent<Props> = ({
	name,
	opponentName,
	battle,
	status,
	subtitle,
}) => {
	const classes = useStyles();

	return (
		<div className={classes.container}>
			<div className={classes.col}>
				<span className={classes.name}>{name}</span>
			</div>
			<div className={classes.col}>
				<Label>{status}</Label>
				<BattleInfo battle={battle} opponentName={opponentName} />
				{subtitle && <span className={classes.subtitle}>{subtitle}</span>}
			</div>
		</div>
	);
};

export { StatusPlayerListItem };
