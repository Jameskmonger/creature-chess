import * as React from "react";
import { useSelector } from "react-redux";
import { getPlayerMoney } from "@creature-chess/gamemode";
import { AppState } from "../../../store";
import { Overlay } from "../../ui/overlay";

import {
	PlayerList, CardShop, Help,
	Settings, Profile} from "../../module";
import { BoardContainer } from "../../board";
import { OverlayComponent } from "./OverlayComponent";
import { TopBar } from "./TopBar";
import { NavBar } from "./NavBar";
import { MobileContentPane } from "./MobileContentPane";
import { createUseStyles } from "react-jss";

const GameOverlay: React.FunctionComponent<{ currentOverlay: Overlay }> = ({ currentOverlay }) => {
	const currentBalance = useSelector<AppState, number>(state => getPlayerMoney(state.game));

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
	const currentOverlay = useSelector<AppState, Overlay | null>(state => state.game.ui.currentOverlay);

	if (currentOverlay === null) {
		return (
			<MobileContentPane>
				<Profile />

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

const useStyles = createUseStyles({
	portraitGame: {
		"display": "flex",
		"overflowY": "hidden",
		"flexDirection": "column",
		"width": "100%",
		"height": "100%",
		"padding": "0",
	}
})

const MobileGame: React.FunctionComponent = () => {
	const styles = useStyles();

	return (
		<div className={styles.portraitGame}>
			<TopBar />

			<MobileGameContentPane />

			<NavBar />
		</div>
	);
};

export { MobileGame };
