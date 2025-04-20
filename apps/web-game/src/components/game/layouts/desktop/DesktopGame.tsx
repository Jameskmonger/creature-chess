import * as React from "react";

import { createUseStyles } from "react-jss";
import { useSelector } from "react-redux";

import { BoardSelectors } from "@shoki/board";

import { GamePhase, PieceModel } from "@creature-chess/models";

import { useLocalPlayerId } from "../../../../auth/context";
import { AppState } from "../../../../store";
import { StatsState } from "../../../../store/game/stats/state";
import { Footer } from "../../../ui/Footer";
import { TabMenu } from "../../../ui/TabMenu";
import { Layout } from "../../../ui/layout";
import { PieceBattleStats } from "../../PieceBattleStats";
import { TopBar } from "../../TopBar";
import { BoardContainer } from "../../board";
import { Controls, NowPlaying } from "../../board/overlays";
import { CardShop } from "../../cardShop/cardShop";
import { Help } from "../../help";
import { PlayerList } from "../../playerList/playerList";
import { PlayerGameProfile } from "../../profile";
import { QuitGameButton } from "../../settings";
import { LandscapeGameScreen } from "../LandscapeGameScreen";

const useStyles = createUseStyles({
	helpContainer: {
		padding: "0.5em",
		background: "#566c86",
	},
	leftColumn: {
		height: "100%",
		display: "flex",
		flexDirection: "column",
	},
	tabMenu: {
		flex: 1,
	},
	rightColumn: {
		height: "100%",
	},
	actionBar: {
		width: "100%",
		height: "10%",
	},
});

const DesktopGame: React.FunctionComponent = () => {
	const styles = useStyles();

	const localPlayerId = useLocalPlayerId();

	const ownedPieces = useSelector<AppState, PieceModel[]>((state) =>
		[
			...BoardSelectors.getAllPieces(state.game.board),
			...BoardSelectors.getAllPieces(state.game.bench),
		].filter((p) => p.ownerId === localPlayerId)
	);

	const stats = useSelector<AppState, StatsState>((state) => state.game.stats);

	const inPreparingPhase = useSelector<AppState, boolean>(
		(state) => state.game.roundInfo.phase === GamePhase.PREPARING
	);

	const leftTabs = React.useMemo(
		() => [
			{
				label: "Players",
				content: <PlayerList />,
			},
			{
				label: "Stats",
				content: inPreparingPhase ? (
					<PieceBattleStats pieces={ownedPieces} stats={stats} />
				) : (
					<span>Stats are only available in preparing phase</span>
				),
			},
			{
				label: "Help",
				content: (
					<div className={styles.helpContainer}>
						<Help hideFooter />
						<Footer />
					</div>
				),
			},
		],
		[inPreparingPhase, ownedPieces, stats, styles.helpContainer]
	);

	const round = useSelector<AppState, number | null>(
		(state) => state.game.roundInfo.round
	);

	return (
		<LandscapeGameScreen
			leftColumnContent={
				<div className={styles.leftColumn}>
					<TopBar />

					<NowPlaying />

					<TabMenu tabs={leftTabs} className={styles.tabMenu} />

					<QuitGameButton />
				</div>
			}
			middleColumnContent={
				<>
					<BoardContainer />

					<div className={styles.actionBar}>
						<Controls />
					</div>
				</>
			}
			rightColumnContent={
				<Layout direction="column" className={styles.rightColumn}>
					<CardShop />

					<PlayerGameProfile />
				</Layout>
			}
		/>
	);
};

export { DesktopGame };
