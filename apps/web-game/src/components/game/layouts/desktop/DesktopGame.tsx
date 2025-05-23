import * as React from "react";

import { createUseStyles } from "react-jss";
import { useSelector } from "react-redux";
import { useLocalPlayerId } from "~/auth/context";
import { AppState } from "~/store";
import { StatsState } from "~/store/game/stats/state";

import { BoardSelectors } from "@shoki/board";

import { GamePhase, PieceModel } from "@creature-chess/models";

import { Footer } from "../../../ui/Footer";
import { TabMenu } from "../../../ui/TabMenu";
import { PieceBattleStats } from "../../PieceBattleStats";
import { TopBar } from "../../TopBar";
import { BoardContainer } from "../../board";
import { SellPieceButton } from "../../board/overlays/controls/SellPieceButton";
import { CardShop } from "../../cardShop/cardShop";
import { Help } from "../../help";
import { PlayerList } from "../../playerList/playerList";
import { PlayerGameProfile } from "../../profile";
import { Settings } from "../../settings";

const useStyles = createUseStyles({
	helpContainer: {
		padding: "0.5em",
		background: "#566c86",
	},
	game: {
		width: "100%",
		height: "100%",
		display: "flex",
		flexDirection: "row",
		gap: "16px",
	},
	board: {
		display: "flex",
		flexDirection: "column",
		gap: "16px",
		flex: 3,
	},
	leftColumn: {
		height: "100%",
		display: "flex",
		flexDirection: "column",
		flex: 1,
		gap: "16px",
	},
	rightColumn: {
		height: "100%",
		display: "flex",
		flexDirection: "column",
		flex: 1,
		gap: "16px",
	},
	controls: {
		height: "128px",
	},
	tabMenu: {
		flex: 1,
	},
	fixed: {
		height: "256px",
		display: "flex",
		flexDirection: "column",
		justifyContent: "center",
	},
});

const DesktopGame: React.FunctionComponent = () => {
	const styles = useStyles();

	const localPlayerId = useLocalPlayerId();

	const ownedPieces = useSelector<AppState, PieceModel[]>((state) =>
		[...BoardSelectors.getAllPieces(state.game.board)].filter(
			(p) => p.ownerId === localPlayerId
		)
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
					</div>
				),
			},
			{
				label: "Settings",
				content: (
					<div className={styles.helpContainer}>
						<Settings />
						<Footer />
					</div>
				),
			},
		],
		[inPreparingPhase, ownedPieces, stats, styles.helpContainer]
	);

	return (
		<div className={styles.game}>
			<div className={styles.leftColumn}>
				<TabMenu tabs={leftTabs} className={styles.tabMenu} />

				<div className={styles.fixed}>
					<PlayerGameProfile />
				</div>
			</div>
			<div className={styles.board}>
				<TopBar />
				<BoardContainer />
			</div>
			<div className={styles.rightColumn}>
				<CardShop />

				<div className={styles.controls}>
					<SellPieceButton />
				</div>
			</div>
		</div>
	);
};

export { DesktopGame };
