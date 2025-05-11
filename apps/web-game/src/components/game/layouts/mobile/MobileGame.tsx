import * as React from "react";

import { createUseStyles } from "react-jss";
import { useSelector } from "react-redux";
import { useLocalPlayerId } from "~/auth/context";
import { Footer } from "~/components/ui/Footer";
import { AppState } from "~/store";
import { StatsState } from "~/store/game/stats/state";
import { Overlay } from "~/store/game/ui";

import { BoardSelectors } from "@shoki/board";

import { GamePhase, PieceModel } from "@creature-chess/models";

import { TabMenu } from "../../../ui/TabMenu";
import { PieceBattleStats } from "../../PieceBattleStats";
import { TopBar } from "../../TopBar";
import { BoardContainer } from "../../board";
import { CardShop } from "../../cardShop/cardShop";
import { Help } from "../../help";
import { PlayerList } from "../../playerList/playerList";
import { PlayerGameProfile } from "../../profile";
import { Settings } from "../../settings";
import { MobileContentPane } from "./MobileContentPane";
import { OverlayComponent } from "./OverlayComponent";
import { NavBar } from "./nav/NavBar";

const GameOverlay: React.FunctionComponent<{ currentOverlay: Overlay }> = ({
	currentOverlay,
}) => {
	const localPlayerId = useLocalPlayerId();

	const inPlayingOrReadyPhase = useSelector<AppState, boolean>(
		(state) =>
			state.game.roundInfo.phase === GamePhase.PLAYING ||
			state.game.roundInfo.phase === GamePhase.READY
	);

	const ownedPieces = useSelector<AppState, PieceModel[]>((state) =>
		[...BoardSelectors.getAllPieces(state.game.board)].filter(
			(p) => p.ownerId === localPlayerId
		)
	);
	const stats = useSelector<AppState, StatsState>((state) => state.game.stats);

	if (currentOverlay === Overlay.PLAYERS) {
		return (
			<OverlayComponent title="Players">
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

	if (currentOverlay === Overlay.STATS) {
		return (
			<OverlayComponent title="Stats">
				<PieceBattleStats pieces={ownedPieces} stats={stats} />
			</OverlayComponent>
		);
	}

	return null;
};

const MobileGameContentPane: React.FunctionComponent = () => {
	const currentOverlay = useSelector<AppState, Overlay | null>(
		(state) => state.game.ui.currentOverlay
	);

	if (currentOverlay === null) {
		return (
			<MobileContentPane>
				<BoardContainer />

				<PlayerGameProfile />
			</MobileContentPane>
		);
	}

	return (
		<MobileContentPane>
			<GameOverlay currentOverlay={currentOverlay} />
		</MobileContentPane>
	);
};

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
});

export function MobileGame() {
	const styles = useStyles();

	return (
		<div className={styles.game}>
			<TopBar />
			<div className={styles.content}>
				<MobileGameContentPane />
			</div>
			<NavBar />
		</div>
	);
}
