import * as React from "react";
import { createUseStyles } from "react-jss";
import { PlayerListPlayer } from "../../../models/lib";

type Props = {
	player: PlayerListPlayer;
};

const useStyles = createUseStyles({
	image: {
		height: "64px"
	}
});

const PlayerAvatar: React.FunctionComponent<Props> = ({ player }) => {
	const classes = useStyles();

	if (!player || !player.profile?.picture) {
		return null;
	}

	return <img className={classes.image} src={`https://creaturechess.jamesmonger.com/images/front/${player.profile.picture}.png`} />;
};

export { PlayerAvatar };
