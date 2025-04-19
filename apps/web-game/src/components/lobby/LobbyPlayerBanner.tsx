import * as React from "react";

import { PlayerAvatar } from "apps/web-game/src/components/ui/player/avatar";
import { Title } from "apps/web-game/src/components/ui/player/title";
import { createUseStyles } from "react-jss";

import { LobbyPlayer } from "@creature-chess/models/lobby";

import { IMAGE_BASE_URL } from "@creature-chess-app/web-game/src/constants";

type Props = {
	player: LobbyPlayer | null;
};

const useStyles = createUseStyles({
	player: {
		padding: "0.4em 1em",
		marginBottom: "0.4em",
		fontWeight: "700",
		textAlign: "left",
		background: "#59616b",
		fontFamily: "Arial, Helvetica, sans-serif",
		color: "#fff",
		userSelect: "none",
	},
	nameAndImage: {
		display: "flex",
		alignItems: "center",
		justifyContent: "stretch",
		marginBottom: "0.25rem",
	},
	bot: {
		fontStyle: "italic",
		color: "#d0d0d0",
	},
});

const NO_PLAYER_IMAGE = `${IMAGE_BASE_URL}/ui/no_player_img.png`;

const LobbyPlayerBanner: React.FunctionComponent<Props> = ({ player }) => {
	const styles = useStyles();

	if (!player) {
		return (
			<div className={`${styles.player} ${styles.bot}`}>
				<span className={styles.nameAndImage}>
					<img src={NO_PLAYER_IMAGE} alt="no player image" />
					<div />
					empty slot
				</span>
			</div>
		);
	}

	return (
		<div className={styles.player}>
			<span className={styles.nameAndImage}>
				<PlayerAvatar player={player} />
				<div />
				{player.name}
			</span>
			<Title title={player.profile?.title} />
		</div>
	);
};

export { LobbyPlayerBanner };
