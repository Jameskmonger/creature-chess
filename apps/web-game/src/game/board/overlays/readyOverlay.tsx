import * as React from "react";
import { useSelector } from "react-redux";
import { usePlayerId } from "@creature-chess/auth-web";
import { GamePhase } from "@creature-chess/models";
import { PlayerAvatar, Title, PlayerHealthbar, Layout, Group } from "@creature-chess/ui";
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

	const localId = usePlayerId();
	const localPlayer = playerList.find(p => p.id === localId);

	const opponent = useSelector((state: AppState) => {
		const id = state.game.playerInfo.opponentId;
		return state.game.playerList.find(p => p.id === id);
	});

	const spectatingPlayer = useSelector<AppState, boolean>(state => state.game.spectating.id !== null);

	if (!localPlayer || !opponent || !inReadyPhase || spectatingPlayer) {
		return null;
	}

	return (
		<BoardOverlay>
			<div className={styles.textCenter}>
				<Layout direction="column">
					<Header2>Now Playing</Header2>
					<Group>
						<Layout direction="row">
							<PlayerAvatar player={localPlayer} />

							<Group>
								<Header4>{localPlayer.name}</Header4>
								<Title titleId={localPlayer.profile?.title || null} />
								<PlayerHealthbar health={localPlayer.health} />
								<QuickChatBox sendingPlayerId={localId} />
							</Group>
						</Layout>
					</Group>
					<Header2>vs.</Header2>
					<Group>
						<Layout direction="row">
							<Group>
								<Header4>{opponent.name}</Header4>
								<Title titleId={opponent.profile?.title || null} />
								<PlayerHealthbar health={opponent.health} />
								<QuickChatBox sendingPlayerId={opponent.id} />
							</Group>

							<PlayerAvatar player={opponent} />
						</Layout>
					</Group>

					<HeadToHeadStats player={localPlayer} opponent={opponent} />
					<QuickChatButtonArray />
				</Layout>
			</div>
		</BoardOverlay>
	);
};

export { ReadyOverlay };
