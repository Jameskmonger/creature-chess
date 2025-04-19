import * as React from "react";
import { useState, useRef } from "react";

import { createUseStyles } from "react-jss";

import { PlayerListPlayer } from "@creature-chess/models/game/playerList";

import { useOnClickOutside } from "../../../hooks/useOnClickOutside";
import { Button } from "../../ui/Button";
import { Label } from "../../ui/label";
import { Half, Layout } from "../../ui/layout";
import { PlayerAvatar, PlayerProfile, PlayerHealthbar } from "../../ui/player";
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
		"border": props.isOpponent ? "3px solid #b13e53" : "",
		"boxSizing": "border-box",
		"padding": "0.5rem",
		"background": "#566c86",

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
		display: "flex",
		flexDirection: "row",
		justifyContent: "space-between",
		padding: "0 0.25em",
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

	const ref = useRef<HTMLDivElement>(null);
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
		<div className={styles.container} onClick={toggleExpanded} ref={ref}>
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
