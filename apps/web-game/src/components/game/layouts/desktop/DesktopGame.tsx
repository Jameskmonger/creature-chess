import * as React from "react";

import { createUseStyles } from "react-jss";

import { Footer } from "../../../ui/Footer";
import { TabMenu } from "../../../ui/TabMenu";
import { AnnouncementsBanner } from "../../AnnouncementsBanner";
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

function DesktopGame() {
	const styles = useStyles();

	const leftTabs = React.useMemo(
		() => [
			{
				label: "Players",
				content: <PlayerList />,
			},
			{
				label: "Stats",
				content: <span>coming back soon</span>,
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
		[styles.helpContainer]
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
				<AnnouncementsBanner />
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
}

export { DesktopGame };
