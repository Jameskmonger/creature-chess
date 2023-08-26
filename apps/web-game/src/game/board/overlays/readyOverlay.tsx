import * as React from "react";

import { createUseStyles } from "react-jss";
import { useSelector } from "react-redux";

import { useLocalPlayerId } from "@creature-chess/auth-web/context";
import { GamePhase } from "@creature-chess/models";
import { Label, StreakIndicator } from "@creature-chess/ui";
import {
	PlayerAvatar,
	Title,
	PlayerHealthbar,
	Layout,
	Group,
	Half,
} from "@creature-chess/ui";
import { Header2, Header4 } from "@creature-chess/ui/text";

import { AppState } from "../../../store";
import { BoardOverlay } from "./boardOverlay";
import { HeadToHeadStats } from "./h2h/headToHeadStats";
import { QuickChatBox } from "./quickChat/quickChatBox";
import { QuickChatButtonArray } from "./quickChat/quickChatButtonArray";

const useStyles = createUseStyles({
	wrapper: {
		textAlign: "center",
		flex: 1,
	},
	vs: {
		background: "#566c86",
		padding: "1em",
		border: "2px solid #b13e53",
	},
	vsHeader: {
		borderTop: "2px solid #b13e53",
		borderBottom: "2px solid #b13e53",
	},
	badges: {
		display: "flex",
		flexDirection: "row",
		justifyContent: "space-between",
		boxSizing: "border-box",
		alignItems: "center",
	},
	healthbar: {
		marginBottom: "0.25em",
	},
});

const ReadyOverlay: React.FunctionComponent = () => {
	const styles = useStyles();
	const inReadyPhase = useSelector<AppState, boolean>(
		(state) => state.game.roundInfo.phase === GamePhase.READY
	);

	const playerList = useSelector((state: AppState) => state.game.playerList);

	const localId = useLocalPlayerId();
	const localPlayer = playerList.find((p) => p.id === localId);

	const opponent = useSelector((state: AppState) => {
		const id = state.game.playerInfo.opponentId;
		return state.game.playerList.find((p) => p.id === id);
	});

	const spectatingPlayer = useSelector<AppState, boolean>(
		(state) => state.game.spectating.id !== null
	);

	if (!localPlayer || !opponent || !inReadyPhase || spectatingPlayer) {
		return null;
	}

	return (
		<BoardOverlay>
			<Layout
				direction="column"
				justifyContent="center"
				className={styles.wrapper}
			>
				<Header2>Now Playing</Header2>

				<div className={styles.vs}>
					<Group>
						<Layout direction="row">
							<Group>
								<Layout direction="row">
									<Half>
										<Group>
											<Header4>{localPlayer.name}</Header4>
											<Title titleId={localPlayer.profile?.title || null} />
										</Group>
										<Group className={styles.healthbar}>
											<PlayerHealthbar health={localPlayer.health} />
										</Group>
										<Group className={styles.badges}>
											<StreakIndicator
												type={localPlayer.streakType}
												amount={localPlayer.streakAmount}
											/>
											<Label type="highlight">${localPlayer.money}</Label>
											<Label>Lv {localPlayer.level}</Label>
										</Group>
									</Half>
									<Half>
										<PlayerAvatar player={localPlayer} />
										<QuickChatBox sendingPlayerId={localId} />
									</Half>
								</Layout>
							</Group>
						</Layout>
					</Group>
					<div className={styles.vsHeader}>
						<Header2>vs.</Header2>
					</div>
					<Group>
						<Layout direction="row">
							<Group>
								<Layout direction="row">
									<Half>
										<PlayerAvatar player={opponent} />
										<QuickChatBox sendingPlayerId={opponent.id} />
									</Half>
									<Half>
										<Group>
											<Header4>{opponent.name}</Header4>
											<Title titleId={opponent.profile?.title || null} />
										</Group>
										<Group className={styles.healthbar}>
											<PlayerHealthbar health={opponent.health} />
										</Group>
										<Group className={styles.badges}>
											<StreakIndicator
												type={opponent.streakType}
												amount={opponent.streakAmount}
											/>
											<Label type="highlight">${opponent.money}</Label>
											<Label>Lv {opponent.level}</Label>
										</Group>
									</Half>
								</Layout>
							</Group>
						</Layout>
					</Group>
				</div>

				<HeadToHeadStats player={localPlayer} opponent={opponent} />
				<QuickChatButtonArray />
			</Layout>
		</BoardOverlay>
	);
};

export { ReadyOverlay };
