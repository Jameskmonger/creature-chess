import * as React from "react";
import { Title } from "../player/title";
import { LobbyPlayer } from "@creature-chess/models";


type Props = {
	player: LobbyPlayer | null;
};

const LobbyPlayerBanner: React.FunctionComponent<Props> = ({ player }) => {
	if (!player) {
		return (
			<div key={Math.floor(Math.random() * 1000)} className="player bot">
				<span className="name-and-image">
					<img
						src={"https://creaturechess.jamesmonger.com/images/ui/no_player_img.png"}
						alt="no player image"
					/>
					<div className="spacer" />
					empty slot
				</span>
			</div>
		);
	}
	return (
		<div key={player?.id} className="player">
			<span className="name-and-image">
				<img
					src={`https://creaturechess.jamesmonger.com/images/front/${player.profile?.picture}.png`}
					alt="avatar"
				/>
				<div className="spacer" />
				{player.name}
			</span>
			<Title titleId={player.profile?.title} />
		</div>
	);
};

export { LobbyPlayerBanner };
