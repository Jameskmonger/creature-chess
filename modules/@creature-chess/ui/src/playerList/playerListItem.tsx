import * as React from "react";
import { useState, useRef } from "react";
import { createUseStyles } from "react-jss";
import { PlayerListPlayer } from "@creature-chess/models";
import { BattleInfo } from "./battleInfo";
import { useOnClickOutside } from "../../hooks";
import { Button } from "../button";
import { StreakIndicator } from "./streakIndicator";

import { Label } from "../display";
import { PlayerHealthbar, PlayerProfile, PlayerAvatar } from "../player";
import { Half, Layout } from "../../layout";

interface Props {
	index: number;
	player: PlayerListPlayer;

	isOpponent: boolean;
	isLocal: boolean;

	onSpectateClick: () => void;

	opponentName?: string;
	currentlySpectating?: boolean;
	showReadyIndicator?: boolean;
}

const getDetailReadyColor = ({ player: { ready }, showReadyIndicator = false }: Props) =>
	(ready && showReadyIndicator) ? "#20b720" : "#ccc";

const useStyles = createUseStyles({
	container: (props: Props) => ({
		"border": props.isOpponent ? "3px solid #b13e53" : "",
		"boxSizing": "border-box",
		"padding": "0.5rem",
		"background": "#566c86",

		"&:not(:last-child)": {
			marginBottom: "0.25em"
		}
	}),
	details: (props: Props) => ({
		flex: 1,
		paddingLeft: "0.5em",
		borderLeft: `5px solid ${getDetailReadyColor(props)}`
	}),
	badges: {
		"&>:not(:last-child)": {
			marginRight: "0.25em",
		}
	}
});

const PlayerListItem: React.FunctionComponent<Props> = (props) => {
	const classes = useStyles(props);

	const {
		index,
		player,
		opponentName,
		isLocal,
		onSpectateClick,
		currentlySpectating = false
	} = props;

	const ref = useRef();
	const [isExpanded, setIsExpanded] = useState<boolean>(false);
	useOnClickOutside(ref, () => setIsExpanded(false));

	const toggleExpanded = () => {
		// don't open for local player
		if (isLocal) {
			return;
		}

		setIsExpanded(!isExpanded);
	};

	return (
		<div
			className={classes.container}
			onClick={toggleExpanded}
			ref={ref as any}
		>
			<Layout direction="row" noSpacer>
				<div className="picture">
					<PlayerAvatar player={player} />
				</div>
				<div className={classes.details}>
					<Layout direction="row" noSpacer>
						<Half><PlayerProfile position={index + 1} player={player} isLocal={isLocal} /></Half>
						<Half><PlayerHealthbar health={player.health} /></Half>
					</Layout>
					<Layout direction="row">
						<Half className={classes.badges}>
							<Label type="highlight">${player.money}</Label>
							<Label>Lv {player.level}</Label>
						</Half>
						<Half>
							{
								currentlySpectating || isExpanded
									? <Button onClick={onSpectateClick}>{currentlySpectating ? "Stop spectating" : "Spectate"}</Button>
									: <Layout direction="row" noSpacer>
										<BattleInfo battle={player.battle} opponentName={opponentName} />
										<StreakIndicator type={player.streakType} amount={player.streakAmount} />
									</Layout>
							}
						</Half>
					</Layout>
				</div>
			</Layout>
		</div>
	);
};

export { PlayerListItem };
