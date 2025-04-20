import * as React from "react";

import { useSelector } from "react-redux";

import { BoardSelectors } from "@shoki/board";

import { getPlayerMoney } from "@creature-chess/gamemode";
import { GamePhase, PieceModel } from "@creature-chess/models";

import { useLocalPlayerId } from "../../../../auth/context";
import { AppState } from "../../../../store";
import { StatsState } from "../../../../store/game/stats/state";
import { Overlay } from "../../../../store/game/ui";
import { TabMenu } from "../../../ui/TabMenu";
import { PieceBattleStats } from "../../PieceBattleStats";
import { BoardContainer } from "../../board";
import { Controls } from "../../board/overlays";
import { CardShop } from "../../cardShop/cardShop";
import { Help } from "../../help";
import { PlayerList } from "../../playerList/playerList";
import { PlayerGameProfile } from "../../profile";
import { Settings } from "../../settings";
import { PortraitGameScreen } from "../PortraitGameScreen";
import { MobileContentPane } from "./MobileContentPane";
import { NavBar } from "./NavBar";
import { OverlayComponent } from "./OverlayComponent";
import { TopBar } from "./TopBar";

const GameOverlay: React.FunctionComponent<{ currentOverlay: Overlay }> = ({
	currentOverlay,
}) => {
	const localPlayerId = useLocalPlayerId();

	const currentBalance = useSelector<AppState, number>((state) =>
		getPlayerMoney(state.game)
	);

	const inPlayingOrReadyPhase = useSelector<AppState, boolean>(
		(state) =>
			state.game.roundInfo.phase === GamePhase.PLAYING ||
			state.game.roundInfo.phase === GamePhase.READY
	);

	const ownedPieces = useSelector<AppState, PieceModel[]>((state) =>
		[
			...BoardSelectors.getAllPieces(state.game.board),
			...BoardSelectors.getAllPieces(state.game.bench),
		].filter((p) => p.ownerId === localPlayerId)
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
							content: <Settings />,
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

	const inPlayingOrReadyPhase = useSelector<AppState, boolean>(
		(state) =>
			state.game.roundInfo.phase === GamePhase.PLAYING ||
			state.game.roundInfo.phase === GamePhase.READY
	);

	if (currentOverlay === null) {
		return (
			<MobileContentPane>
				<BoardContainer />

				{!inPlayingOrReadyPhase && (
					<>
						<PlayerGameProfile />

						<div style={{ height: "2em", paddingTop: "0.5em" }}>
							<Controls />
						</div>
					</>
				)}
			</MobileContentPane>
		);
	}

	return (
		<MobileContentPane>
			<GameOverlay currentOverlay={currentOverlay} />
		</MobileContentPane>
	);
};

const MobileGame = () => (
	<PortraitGameScreen
		topRowContent={<TopBar />}
		middleRowContent={<MobileGameContentPane />}
		bottomRowContent={<NavBar />}
	/>
);

export { MobileGame };
