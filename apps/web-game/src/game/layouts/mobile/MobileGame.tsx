import * as React from "react";

import { useSelector } from "react-redux";

import { getPlayerMoney } from "@creature-chess/gamemode";
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

	if (currentOverlay === null) {
		return (
			<MobileContentPane>
				<Profile />

				<div style={{ height: "1em" }}>
					<Controls />
				</div>

				<BoardContainer />
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
