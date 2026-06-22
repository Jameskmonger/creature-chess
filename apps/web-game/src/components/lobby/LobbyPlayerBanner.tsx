import * as React from "react";

import classNames from "classnames";
import { createUseThemeStyles } from "~/useStyles";

import { LobbyPlayer } from "@creature-chess/models";

import { PlayerAvatar, Title } from "../ui/player";

type Props = {
	player: LobbyPlayer | null;
};

const useStyles = createUseThemeStyles((theme) => ({
	slot: {
		display: "flex",
		alignItems: "center",
		gap: "clamp(0.4rem, 2.5vw, 0.7rem)",
		minWidth: 0,
		padding: "clamp(0.4rem, 2.5vw, 0.6rem)",
		boxSizing: "border-box",
		borderRadius: "0.6rem",
		background: `color-mix(in oklab, ${theme.palette.light.neutral} 6%, ${theme.palette.surface})`,
		border: `1px solid color-mix(in oklab, ${theme.palette.light.neutral} 9%, transparent)`,
		fontFamily: theme.typography.primary,
		color: theme.palette.light.neutral,
		userSelect: "none",
		overflow: "hidden",
	},
	empty: {
		background: "transparent",
		borderStyle: "dashed",
		borderColor: `color-mix(in oklab, ${theme.palette.muted} 40%, transparent)`,
		color: theme.palette.muted,
	},
	avatarFrame: {
		flex: "none",
		display: "grid",
		placeItems: "center",
		overflow: "hidden",
		borderRadius: "50%",
		width: "clamp(2rem, 9vw, 2.75rem)",
		height: "clamp(2rem, 9vw, 2.75rem)",
		background: `color-mix(in oklab, ${theme.palette.light.neutral} 8%, ${theme.palette.surface})`,
	},
	avatarFrameEmpty: {
		background: "transparent",
		border: `1px dashed color-mix(in oklab, ${theme.palette.muted} 45%, transparent)`,
	},
	avatar: {
		width: "100%",
		height: "100%",
		objectFit: "contain",
	},
	emptyImage: {
		width: "62%",
		height: "62%",
		objectFit: "contain",
		opacity: 0.55,
	},
	info: {
		display: "flex",
		flexDirection: "column",
		justifyContent: "center",
		minWidth: 0,
		gap: "0.1rem",
		textAlign: "left",
	},
	name: {
		fontWeight: 700,
		fontSize: "clamp(0.85rem, 4vw, 1.05rem)",
		lineHeight: 1.1,
		overflow: "hidden",
		textOverflow: "ellipsis",
		whiteSpace: "nowrap",
	},
	emptyName: {
		fontStyle: "italic",
		fontWeight: 600,
	},
}));

const NO_PLAYER_IMAGE = `${APP_IMAGE_ROOT}/ui/unknown.png`;

function LobbyPlayerBanner({ player }: Props) {
	const styles = useStyles();

	if (!player) {
		return (
			<div className={classNames(styles.slot, styles.empty)}>
				<div className={classNames(styles.avatarFrame, styles.avatarFrameEmpty)}>
					<img
						src={NO_PLAYER_IMAGE}
						alt=""
						className={styles.emptyImage}
					/>
				</div>
				<div className={styles.info}>
					<span className={classNames(styles.name, styles.emptyName)}>
						Empty
					</span>
				</div>
			</div>
		);
	}

	return (
		<div className={styles.slot}>
			<div className={styles.avatarFrame}>
				<PlayerAvatar player={player} className={styles.avatar} />
			</div>
			<div className={styles.info}>
				<span className={styles.name}>{player.name}</span>
				<Title title={player.profile?.title} />
			</div>
		</div>
	);
}

export { LobbyPlayerBanner };
