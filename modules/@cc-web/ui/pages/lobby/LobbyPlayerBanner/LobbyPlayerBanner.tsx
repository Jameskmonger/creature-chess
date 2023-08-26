import * as React from "react";

import { createUseStyles } from "react-jss";

import { IMAGE_BASE_URL, LobbyPlayer } from "@creature-chess/models";

import { PlayerAvatar } from "../../../src/player/avatar";
import { Title } from "../../../src/player/title";

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
			<Title titleId={player.profile?.title} />
		</div>
	);
};

export { LobbyPlayerBanner };
