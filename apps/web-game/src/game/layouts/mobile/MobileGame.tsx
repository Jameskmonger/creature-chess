import * as React from "react";

import { useSelector } from "react-redux";

import { getPlayerMoney } from "@creature-chess/gamemode";
import { GamePhase } from "@creature-chess/models";
import { PortraitGameScreen } from "@creature-chess/ui/gameScreen";

import { AppState } from "../../../store";
import { BoardContainer } from "../../board";
import { Controls } from "../../board/overlays";
import { PlayerList, CardShop, Help, Settings, Profile } from "../../module";
import { Overlay } from "../../ui/overlay";
import { MobileContentPane } from "./MobileContentPane";
import { NavBar } from "./NavBar";
import { OverlayComponent } from "./OverlayComponent";
import { TopBar } from "./TopBar";

const GameOverlay: React.FunctionComponent<{ currentOverlay: Overlay }> = ({
	currentOverlay,
}) => {
	const currentBalance = useSelector<AppState, number>((state) =>
		getPlayerMoney(state.game)
	);

	const inPlayingOrReadyPhase = useSelector<AppState, boolean>(
		(state) =>
			state.game.roundInfo.phase === GamePhase.PLAYING ||
			state.game.roundInfo.phase === GamePhase.READY
	);

	if (currentOverlay === Overlay.PLAYERS) {
		return (
			<OverlayComponent title="Players">
				<PlayerList />
			</OverlayComponent>
		);
	}

	if (currentOverlay === Overlay.SHOP) {
		return (
			<OverlayComponent title={`Balance: $${currentBalance}`} fullscreen>
				<CardShop />

				{inPlayingOrReadyPhase && (
					<>
						<Profile />

						{/* TODO show controls here too? to sell pieces maybe? */}
					</>
				)}
			</OverlayComponent>
		);
	}

	if (currentOverlay === Overlay.HELP) {
		return (
			<OverlayComponent title="Help">
				<Help />
			</OverlayComponent>
		);
	}

	if (currentOverlay === Overlay.SETTINGS) {
		return (
			<OverlayComponent title="Settings">
				<Settings />
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
						<Profile />

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
