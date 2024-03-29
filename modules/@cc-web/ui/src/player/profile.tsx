import * as React from "react";

import { createUseStyles } from "react-jss";

import { PlayerListPlayer } from "@creature-chess/models/game/playerList";

import { PlayerName } from "./name";
import { Title } from "./title";

type Props = {
	player: PlayerListPlayer;
	position: number;
	isLocal: boolean;
};

const useStyles = createUseStyles({
	container: {
		display: "flex",
		flexDirection: "column",
		paddingBottom: "0.15rem",
	},
	name: {
		marginBottom: "0.25rem",
	},
});

const PlayerProfile: React.FunctionComponent<Props> = (props) => {
	const classes = useStyles();

	const { position, player, isLocal } = props;

	return (
		<div className={classes.container}>
			<div className={classes.name}>
				<PlayerName position={position} name={player.name} isLocal={isLocal} />
			</div>
			<Title title={player.profile?.title || null} />
		</div>
	);
};

export { PlayerProfile };
