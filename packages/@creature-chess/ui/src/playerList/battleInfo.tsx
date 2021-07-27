import * as React from "react";
import { createUseStyles } from "react-jss";
import classnames from "classnames";
import { PlayerBattle, PlayerBattleStatus } from "@creature-chess/models";

type Props = { battle: PlayerBattle; opponentName?: string };

const getBattleText = (battle: PlayerBattle) => {
	if (!battle) {
		return "";
	}

	if (battle.status === PlayerBattleStatus.IN_PROGRESS) {
		return "Battling";
	}

	if (battle.status === PlayerBattleStatus.FINISHED) {
		return `${battle.homeScore} - ${battle.awayScore}`;
	}

	return "";
};

const getResultColor = (props: Props) => {
	if (!props || !props.battle || props.battle.status !== PlayerBattleStatus.FINISHED) {
		return "#ffcd74";
	}

	const { isHomePlayer, homeScore, awayScore } = props.battle;
	const win = isHomePlayer ? homeScore > awayScore : awayScore > homeScore;

	return win ? "#38b764" : "#b13e53";
};

const useStyles = createUseStyles({
	battleInfo: {
		width: "fit-content",
		padding: "0.4em 1.2em",
		margin: "0 auto",
		fontFamily: "Arial, sans-serif",
		fontSize: "0.75em",
		color: "#c3c3c3",
		textAlign: "center",
		background: "#333",
	},
	highlight: {
		fontWeight: 700,
		color: "#fff",
		textTransform: "uppercase",
	},
	result: (props: Props) => ({ color: getResultColor(props) })
});

const BattleInfo: React.FunctionComponent<Props> = (props) => {
	const classes = useStyles(props);
	const text = getBattleText(props.battle);

	if (!props.battle) {
		return null;
	}

	return (
		<div className={classes.battleInfo}>
			<span className={classnames(classes.highlight, classes.result)}>{text}</span>
			&nbsp;vs&nbsp;
			<span className={classes.highlight}>{props.opponentName || ""}</span>
		</div>
	);
};

export { BattleInfo };
