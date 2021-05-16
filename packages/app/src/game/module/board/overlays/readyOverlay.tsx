import { usePlayerId } from "packages/app/src/auth";
import { GamePhase, PlayerListPlayer } from "packages/models/lib";
import * as React from "react";
import { useSelector } from "react-redux";
import { ProgressBar } from "../../../../display";
import { AppState } from "../../../../store";
import { PlayerPicture } from "../../playerList/components/playerPicture";
import { PlayerTitle } from "../../playerList/components/playerTitle";
import { BoardOverlay } from "./boardOverlay";
import { HeadToHeadStats } from "./h2h/headToHeadStats";

const ReadyOverlay: React.FunctionComponent = () => {

	const inReadyPhase = useSelector<AppState, boolean>(state =>
		state.game.roundInfo.phase === GamePhase.READY
	);

	const playerList = useSelector((state: AppState) => {
		return state.game.playerList;
	});

	const localId = usePlayerId();
	const playerInfo = playerList.find(p => p.id === localId);

	const opponentInfo: PlayerListPlayer = useSelector((state: AppState) => {
		const id = state.game.playerInfo.opponentId;
		return state.game.playerList.find(p => p.id === id);
	});

	const spectatingPlayer = useSelector<AppState, boolean>(state => state.game.spectating.id !== null);

	if (!opponentInfo || !inReadyPhase || spectatingPlayer) {
		return null;
	}
	const renderHealthbar = (current: number) => current.toString();

	const returnTitleOrBuffer = (player) => {
		if (player.profile.title !== null) {
			return <PlayerTitle playerId={player.id} />;
		}
		return <div className="buffer" />;
	};

	return (
		<BoardOverlay>
			<div className="ready-overlay-content">
				<p className="h2h-header">Now Playing:</p>
				<div className="outer-profile-box">
					<div className="inner-profile-box">
						<div className="player-picture">
							<PlayerPicture playerId={playerInfo.id} />
						</div>
						<div className="name-and-health">
							<p className="player-name">{playerInfo.name}</p>
							{returnTitleOrBuffer(playerInfo)}
							<ProgressBar
								className="healthbar player-health h2h"
								current={playerInfo.health}
								max={100}
								renderContents={renderHealthbar}
							/>
						</div>
						<div className="buffer" />
						<div className="name-and-health right">
							<p className="player-name right">{opponentInfo.name}</p>
							{returnTitleOrBuffer(opponentInfo)}
							<ProgressBar
								className="healthbar player-health h2h"
								current={opponentInfo.health}
								max={100}
								renderContents={renderHealthbar}
							/>
						</div>
						<div className="player-picture">
							<PlayerPicture playerId={opponentInfo.id} />
						</div>
					</div>
				</div>
				<HeadToHeadStats player={playerInfo} opponent={opponentInfo} />
			</div>
		</BoardOverlay>
	);
};

export { ReadyOverlay };
