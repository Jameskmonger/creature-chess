import * as React from "react";

import classNames from "classnames";
import { createUseStyles } from "react-jss";

import { LobbyPlayer } from "@creature-chess/models/lobby";

import { PlayerAvatar, Title } from "../ui/player";

type Props = {
	player: LobbyPlayer | null;
};

const useStyles = createUseStyles({
	player: {
		"padding": "4px 8px",

		"@media (orientation: portrait) and (min-width: 376px)": {
			padding: "8px 16px",
		},

		"boxSizing": "border-box",

		"fontWeight": "700",
		"textAlign": "right",
		"background": "#59616b",
		"fontFamily": '"Roboto", sans-serif',
		"color": "#fff",
		"userSelect": "none",

		"containerName": "player",
		"containerType": "size",

		"flex": 1,

		"display": "flex",
		"flexDirection": "column",
	},
	bot: {
		fontStyle: "italic",
		color: "#d0d0d0",
	},
	avatar: {
		"width": "16px",
		"height": "16px",

		"@media (orientation: portrait) and (min-width: 321px) and (max-width: 539px)":
			{
				width: "24px",
				height: "24px",
			},

		"@media (orientation: portrait) and (min-width: 540px) and (max-width: 800px)":
			{
				width: "32px",
				height: "32px",
			},

		"@media (orientation: portrait) and (min-width: 801px)": {
			width: "48px",
			height: "48px",
		},

		"@media (orientation: landscape)": {
			width: "48px",
			height: "48px",
		},
	},
	avatarWrapper: {
		display: "flex",
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
	},
});

const NO_PLAYER_IMAGE = `${APP_IMAGE_ROOT}/ui/no_player_img.png`;

const LobbyPlayerBanner: React.FunctionComponent<Props> = ({ player }) => {
	const styles = useStyles();

	if (!player) {
		return (
			<div className={classNames(styles.player, styles.bot)}>
				<div className={styles.avatarWrapper}>
					<img
						src={NO_PLAYER_IMAGE}
						alt="no player image"
						className={styles.avatar}
					/>
					<span>empty</span>
				</div>
			</div>
		);
	}

	return (
		<div className={styles.player}>
			<div className={styles.avatarWrapper}>
				<PlayerAvatar player={player} className={styles.avatar} />
				<span>{player.name}</span>
			</div>
			<Title title={player.profile?.title} />
		</div>
	);
};

export { LobbyPlayerBanner };
