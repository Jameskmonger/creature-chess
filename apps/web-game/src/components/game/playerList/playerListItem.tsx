import * as React from "react";
import { useState, useRef } from "react";

import { BalanceIcon } from "~/components/ui/icon/BalanceIcon";
import { LevelIcon } from "~/components/ui/icon/LevelIcon";
import { PositionChip } from "~/components/ui/player/PositionChip";

import { PlayerListPlayer } from "@creature-chess/models";

import { useOnClickOutside } from "../../../hooks/useOnClickOutside";
import { Button } from "~/components/ui";
import { PlayerAvatar, PlayerHealthbar, Title } from "../../ui/player";
import { BattleInfo } from "./battleInfo";
import { StreakIndicator } from "./streakIndicator";
import { createUseThemeStyles } from "~/useStyles";

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

const useStyles = createUseThemeStyles<string, Props>(theme => ({
	container: (props) => ({
		"border": props.isOpponent ? "3px solid #b13e53" : "",
		"boxSizing": "border-box",
		"padding": "0.5rem",
		"background": "#566c86",

		"display": "flex",
		"flexDirection": "row",

		"&:not(:last-child)": {
			marginBottom: "0.25em",
		},
	}),
	details: (props) => ({
		"flex": 1,
		"paddingLeft": "0.5em",
		"borderLeft": `5px solid ${getDetailReadyColor(props)}`,
		"display": "flex",
		"flexDirection": "row",
		"alignItems": "flex-start",

		"gap": "16px",

		"@media (orientation: portrait) and (max-width: 400px)": {
			gap: "4px",
		},
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

	// new ...

	profile: {
		display: "flex",
		flexDirection: "column",
		height: "100%",
		justifyContent: "space-between",

		flex: 4,
	},

	name: {
		"fontFamily": theme.typography.primary,
		"fontSize": "14px",
		"fontWeight": 700,
		"color": "#fff",
		"textTransform": "uppercase",

		"@media (orientation: portrait) and (max-width: 400px)": {
			fontSize: "10px",
		},
	},

	status: {
		display: "flex",
		flexDirection: "column",
		justifyContent: "space-between",
		height: "100%",

		flex: 5,
		gap: "8px",
	},

	stats: {
		display: "flex",
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		gap: "8px",
	},

	avatar: {
		"@media (orientation: portrait) and (max-width: 400px)": {
			height: "32px",
			width: "32px",
		},
	},
}));

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
			<PlayerAvatar player={player} className={styles.avatar} />
			<div className={styles.details}>
				<PositionChip position={index + 1} />

				<div className={styles.profile}>
					<span className={styles.name}>{player.name}</span>
					<Title title={player.profile?.title || null} />

					<div className={styles.stats}>
						<StreakIndicator
							type={player.streakType}
							amount={player.streakAmount}
						/>
						<BalanceIcon amount={player.money} />
						<LevelIcon amount={player.level} />
					</div>
				</div>

				<div className={styles.status}>
					<PlayerHealthbar health={player.health} />
					{currentlySpectating || isExpanded ? (
						<Button color="primary" size="small" onClick={onSpectateClick}>
							{currentlySpectating ? "Stop Spectating" : "Spectate"}
						</Button>
					) : (
						<BattleInfo battle={player.battle} opponentName={opponentName} />
					)}
				</div>
			</div>
		</div>
	);
};

export { PlayerListItem };
