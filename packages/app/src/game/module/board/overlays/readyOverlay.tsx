import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { GamePhase, PlayerListPlayer } from "@creature-chess/models";
import { PlayerAvatar, Title, PlayerHealthbar } from "@creature-chess/ui";
import { usePlayerId } from "../../../../auth";
import { AppState } from "../../../../store";
import { BoardOverlay } from "./boardOverlay";
import { HeadToHeadStats } from "./h2h/headToHeadStats";
import { QuickChatValue, QuickChatOption } from "@creature-chess/models";
import { QuickChatBox } from "./quickChatBox";
import { quickChatCommands } from "../../chat";
import { QuickChatButton } from "./quickChatButton";

const ReadyOverlay: React.FunctionComponent = () => {

	const dispatch = useDispatch();

	const inReadyPhase = useSelector<AppState, boolean>(state =>
		state.game.roundInfo.phase === GamePhase.READY
	);

	const playerList = useSelector((state: AppState) => state.game.playerList);

	const localId = usePlayerId();
	const sendingPlayerId = localId;
	const localPlayer = playerList.find(p => p.id === localId);

	const opponent: PlayerListPlayer = useSelector((state: AppState) => {
		const id = state.game.playerInfo.opponentId;
		return state.game.playerList.find(p => p.id === id);
	});
	const receivingPlayerId = opponent?.id;

	const spectatingPlayer = useSelector<AppState, boolean>(state => state.game.spectating.id !== null);

	if (!opponent || !inReadyPhase || spectatingPlayer) {
		return null;
	}

	const sendQuickChat = (chatOption: QuickChatOption) => {
		const chatValue: QuickChatValue = {
			phrase: chatOption
		};
		dispatch(quickChatCommands.setPlayerChat({
			sendingPlayerId,
			receivingPlayerId,
			chatValue
		}));
	};

	const returnTitleOrSpacer = (player) => {
		if (player.profile.title) {
			return <Title titleId={player.profile.title} />;
		}
		return <div className="spacer" />;
	};


	return (
		<BoardOverlay>
			<div className="ready-overlay-content">
				<p className="h2h-header">Now Playing:</p>
				<div className="outer-profile-box">
					<div className="inner-profile-box">
						<div className="player-picture">
							<PlayerAvatar player={localPlayer} />
							<QuickChatBox sendingPlayerId={sendingPlayerId} />
						</div>
						<div className="name-and-health">
							<p className="player-name">{localPlayer.name}</p>
							{returnTitleOrSpacer(localPlayer)}
							<div className="healthbar-container">
								<PlayerHealthbar health={localPlayer.health} />
							</div>
						</div>
						<div className="spacer" />
						<div className="name-and-health right">
							<p className="player-name right">{opponent.name}</p>
							{returnTitleOrSpacer(opponent)}
							<div className="healthbar-container">
								<PlayerHealthbar health={opponent.health} />
							</div>
						</div>
						<div className="player-picture">
							<PlayerAvatar player={opponent} />
							<QuickChatBox sendingPlayerId={receivingPlayerId} />
						</div>
					</div>
				</div>
				<HeadToHeadStats player={localPlayer} opponent={opponent} />
				<div className="quick-chat-box-container">


					<div className="quick-chat-buttons">
						<QuickChatButton chatOption={QuickChatOption.GG} />
						<button onClick={() => sendQuickChat(QuickChatOption.ANGRY)}>Angry</button>
						<button onClick={() => sendQuickChat(QuickChatOption.HAPPY)}>Happy</button>
						<button onClick={() => sendQuickChat(QuickChatOption.SHOCKED)}>Shocked</button>
					</div>
				</div>
			</div>
		</BoardOverlay>
	);
};

export { ReadyOverlay };
