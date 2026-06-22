import * as React from "react";

import classNames from "classnames";
import { createUseStyles } from "react-jss";
import { useSelector } from "react-redux";
import { Footer } from "~/components/ui/Footer";
import { AppState } from "~/store";
import { Overlay } from "~/store/game/ui";

import { GamePhase } from "@creature-chess/models";

import { TabMenu } from "../../../ui/TabMenu";
import { TopBar } from "../../TopBar";
import { BoardContainer } from "../../board";
import { CardShop } from "../../cardShop/cardShop";
import { Help } from "../../help";
import { PlayerList } from "../../playerList/playerList";
import { PlayerGameProfile } from "../../profile";
import { Settings } from "../../settings";
import { MobileContentPane } from "./MobileContentPane";
import { OverlayComponent } from "./OverlayComponent";
import { GameNavBar } from "./nav/GameNavBar";

function GameOverlay({ currentOverlay }: { currentOverlay: Overlay }) {
	const inPlayingOrReadyPhase = useSelector<AppState, boolean>(
		(state) =>
			state.game.roundInfo.phase === GamePhase.PLAYING ||
			state.game.roundInfo.phase === GamePhase.READY
	);

	if (currentOverlay === Overlay.PLAYERS) {
		return (
			<OverlayComponent title="Players" fullscreen>
				<PlayerList />
			</OverlayComponent>
		);
	}

	if (currentOverlay === Overlay.SHOP) {
		return (
			<OverlayComponent title="Card Shop" fullscreen>
				<CardShop />

				{inPlayingOrReadyPhase && (
					<>
						<PlayerGameProfile />

						{/* TODO show controls here too? to sell pieces maybe? */}
					</>
				)}
			</OverlayComponent>
		);
	}

	if (currentOverlay === Overlay.SETTINGS) {
		return (
			<OverlayComponent title="Options">
				<TabMenu
					tabs={[
						{
							label: "Help",
							content: <Help />,
						},
						{
							label: "Settings",
							content: (
								<div>
									<Settings />
									<Footer />
								</div>
							),
						},
					]}
				/>
			</OverlayComponent>
		);
	}

	return null;
}

function MobileGameContentPane() {
	const styles = useStyles();
	const currentOverlay = useSelector<AppState, Overlay | null>(
		(state) => state.game.ui.currentOverlay
	);

	return (
		<MobileContentPane>
			<div
				className={classNames(styles.boardSection, {
					[styles.boardSectionHidden]: currentOverlay !== null,
				})}
			>
				<BoardContainer />

				<PlayerGameProfile />
			</div>

			{currentOverlay !== null && (
				<GameOverlay currentOverlay={currentOverlay} />
			)}
		</MobileContentPane>
	);
}

const useStyles = createUseStyles({
	game: {
		display: "flex",
		height: "100%",
		width: "100%",
		flexDirection: "column",
	},
	content: {
		flex: 1,
		display: "flex",
		flexDirection: "column",
		justifyContent: "space-between",
		overflow: "hidden",
	},
	boardSection: {
		flex: 1,
		display: "flex",
		flexDirection: "column",
		justifyContent: "space-between",
		minHeight: 0,
	},
	boardSectionHidden: {
		display: "none",
	},
});

export function MobileGame() {
	const styles = useStyles();

	return (
		<div className={styles.game}>
			<TopBar />
			<div className={styles.content}>
				<MobileGameContentPane />
			</div>
			<GameNavBar />
		</div>
	);
}
