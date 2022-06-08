import * as React from "react";
import { useSelector } from "react-redux";
import { usePlayerId } from "@creature-chess/auth-web";
import { GamePhase, PlayerListPlayer } from "@creature-chess/models";
import { PlayerAvatar, Title, PlayerHealthbar, Layout, Half } from "@creature-chess/ui";
import { Header2, Header4 } from "@creature-chess/ui/text";
import { AppState } from "../../../store";
import { BoardOverlay } from "./boardOverlay";
import { HeadToHeadStats } from "./h2h/headToHeadStats";
import { QuickChatBox } from "./quickChat/quickChatBox";
import { QuickChatButtonArray } from "./quickChat/quickChatButtonArray";
import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
	textCenter: {
		"textAlign": "center",
	},
});

const ReadyOverlay: React.FunctionComponent = () => {
	const styles = useStyles();
	const inReadyPhase = useSelector<AppState, boolean>(state =>
		state.game.roundInfo.phase === GamePhase.READY
	);

	const playerList = useSelector((state: AppState) => state.game.playerList);

	// TODO JM FIX THIS
	const localId = usePlayerId() || "1234";
	const localPlayer = playerList.find(p => p.id === localId);

	const opponent = useSelector((state: AppState) => {
		const id = state.game.playerInfo.opponentId;
		return state.game.playerList.find(p => p.id === id);
	});

	const spectatingPlayer = useSelector<AppState, boolean>(state => state.game.spectating.id !== null);

	console.log({ localId, localPlayer, opponent, inReadyPhase, spectatingPlayer });

	if (!localPlayer || !opponent || !inReadyPhase || spectatingPlayer) {
		return null;
	}

	const returnTitleOrSpacer = (player: PlayerListPlayer) => {
		if (player.profile?.title) {
			return <Title titleId={player.profile.title} />;
		}
		return <div className="spacer" />;
	};

	return (
		<BoardOverlay>
			<div className={styles.textCenter}>
				<Layout direction="column">
					<Header2>Now Playing</Header2>
					<div>
						<Layout direction="row">
							<div>
								<PlayerAvatar player={localPlayer} />
							</div>
							<div>
								<Header4>{localPlayer.name}</Header4>
								{returnTitleOrSpacer(localPlayer)}
								<PlayerHealthbar health={localPlayer.health} />
								<QuickChatBox sendingPlayerId={localId} />
							</div>
						</Layout>
					</div>
					<Header2>vs.</Header2>
					<div>
						<Layout direction="row">
							<div>
								<Header4>{opponent.name}</Header4>
								{returnTitleOrSpacer(opponent)}
								<PlayerHealthbar health={opponent.health} />
								<QuickChatBox sendingPlayerId={opponent.id} />
							</div>
							<div>
								<PlayerAvatar player={opponent} />
							</div>
						</Layout>
					</div>

					<HeadToHeadStats player={localPlayer} opponent={opponent} />
					<QuickChatButtonArray />
				</Layout>
			</div>
		</BoardOverlay>
	);
};

export { ReadyOverlay };
