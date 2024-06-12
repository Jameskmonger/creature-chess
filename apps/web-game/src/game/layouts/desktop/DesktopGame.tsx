import * as React from "react";

import { createUseStyles } from "react-jss";
import { useSelector } from "react-redux";

import { BoardSelectors } from "@shoki/board";

import { GamePhase, PieceModel } from "@creature-chess/models";

import { useLocalPlayerId } from "@cc-web/auth/context";
import { Footer, Layout } from "@cc-web/ui";
import { TabMenu } from "@cc-web/ui/components/TabMenu";
import { LandscapeGameScreen } from "@cc-web/ui/gameScreen";
import { PieceBattleStats } from "@cc-web/ui/src/stats/PieceBattleStats";

import { AppState } from "../../../store";
import { BoardContainer } from "../../board";
import { Controls } from "../../board/overlays";
import {
	PlayerList,
	CardShop,
	Help,
	Profile,
	RoundIndicator,
	PhaseInfo,
	NowPlaying,
	QuitGameButton,
} from "../../module";
import { StatsState } from "../../module/stats";

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

	return (
		<LandscapeGameScreen
			leftColumnContent={
				<div className={styles.leftColumn}>
					<RoundIndicator />

					<PhaseInfo />

					<NowPlaying />

					<TabMenu tabs={leftTabs} className={styles.tabMenu} />

					<QuitGameButton />
				</div>
			}
			middleColumnContent={<BoardContainer />}
			rightColumnContent={
				<Layout direction="column" className={styles.rightColumn}>
					<QuitGameButton />

					<CardShop />

					<Profile />
				</Layout>
			}
		/>
	);
};

export { DesktopGame };
