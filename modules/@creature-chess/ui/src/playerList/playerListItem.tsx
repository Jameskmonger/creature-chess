import * as React from "react";
import { useState, useRef } from "react";

import { createUseStyles } from "react-jss";

import { PlayerListPlayer } from "@creature-chess/models";

import { useOnClickOutside } from "../../hooks";
import { Half, Layout } from "../../layout";
import { Button } from "../button";
import { Label } from "../display";
import { PlayerHealthbar, PlayerProfile, PlayerAvatar } from "../player";
import { BattleInfo } from "./battleInfo";
import { StreakIndicator } from "./streakIndicator";

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

const getDetailReadyColor = ({
	player: { ready },
	showReadyIndicator = false,
}: Props) => (ready && showReadyIndicator ? "#20b720" : "#ccc");

const useStyles = createUseStyles({
	container: (props: Props) => ({
		border: props.isOpponent ? "3px solid #b13e53" : "",
		boxSizing: "border-box",
		padding: "0.5rem",
		background: "#566c86",

		"&:not(:last-child)": {
			marginBottom: "0.25em",
		},
	}),
	details: (props: Props) => ({
		flex: 1,
		paddingLeft: "0.5em",
		borderLeft: `5px solid ${getDetailReadyColor(props)}`,
		display: "flex",
		flexDirection: "column",
	}),
	grow: {
		flex: 1,
	},
	battleContainer: {
		width: "100%",
	},
	badges: {
		"&>:not(:last-child)": {
			marginRight: "0.25em",
		},
		display: "flex",
		flexDirection: "row",
		justifyContent: "space-between",
		padding: "0 1em",
		boxSizing: "border-box",
		alignItems: "center",
	},
});

const PlayerListItem: React.FunctionComponent<Props> = (props) => {
	const styles = useStyles(props);

	const {
		index,
		player,
		opponentName,
		isLocal,
		onSpectateClick,
		currentlySpectating = false,
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
		<div className={styles.container} onClick={toggleExpanded} ref={ref as any}>
			<Layout direction="row" noSpacer>
				<PlayerAvatar player={player} />
				<div className={styles.details}>
					<Layout direction="row" noSpacer>
						<Half>
							<PlayerProfile
								position={index + 1}
								player={player}
								isLocal={isLocal}
							/>
						</Half>
						<Half>
							<PlayerHealthbar health={player.health} />
						</Half>
					</Layout>
					<Layout direction="row" className={styles.grow}>
						<Half className={styles.badges}>
							<StreakIndicator
								type={player.streakType}
								amount={player.streakAmount}
							/>
							<Label type="highlight">${player.money}</Label>
							<Label>Lv {player.level}</Label>
						</Half>
						<Half>
							{currentlySpectating || isExpanded ? (
								<Button onClick={onSpectateClick}>
									{currentlySpectating ? "Stop spectating" : "Spectate"}
								</Button>
							) : (
								<Layout
									direction="row"
									noSpacer
									justifyContent="center"
									className={styles.battleContainer}
								>
									<BattleInfo
										battle={player.battle}
										opponentName={opponentName}
									/>
								</Layout>
							)}
						</Half>
					</Layout>
				</div>
			</Layout>
		</div>
	);
};

export { PlayerListItem };
