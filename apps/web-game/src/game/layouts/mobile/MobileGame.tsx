import * as React from "react";
import { useSelector, useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCog, faQuestionCircle, faShoppingCart, faUsers, IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { getPlayerMoney } from "@creature-chess/gamemode";
import { AppState } from "../../../store";
import { Overlay } from "../../ui/overlay";
import { closeOverlay, openOverlay } from "../../ui/actions";

import {
	PlayerList, CardShop, Help,
	Settings, Profile, RoundIndicator, PhaseInfo
} from "../../module";
import { BoardContainer } from "../../board";
import { OverlayComponent } from "./OverlayComponent";
import { TopBar } from "./TopBar";

const NavItem: React.FunctionComponent<{ overlay: Overlay, icon: IconDefinition }> = ({ overlay, icon }) => {
	const dispatch = useDispatch();
	const isActive = useSelector<AppState, boolean>(state => state.game.ui.currentOverlay === overlay);
	const canUseShop = useSelector<AppState, boolean>(state => state.game.playerInfo.health !== 0);
	const isSpectating = useSelector<AppState, boolean>(state => state.game.spectating.id !== null);

	const onClick = () => {
		if (isActive) {
			dispatch(closeOverlay());
			return;
		}
		if (overlay === Overlay.SHOP) {
			if (!canUseShop || isSpectating) {
				return;
			}
		}

		dispatch(openOverlay(overlay));
	};

	return (
		<button className={`navitem${isActive ? " active" : ""}`} onClick={onClick}>
			<FontAwesomeIcon icon={icon} />
		</button>
	);
};

const Navbar: React.FunctionComponent = () => {
	return (
		<nav className="navbar">
			<NavItem overlay={Overlay.PLAYERS} icon={faUsers} />
			<NavItem overlay={Overlay.SHOP} icon={faShoppingCart} />
			<NavItem overlay={Overlay.HELP} icon={faQuestionCircle} />
			<NavItem overlay={Overlay.SETTINGS} icon={faCog} />
		</nav>
	);
};

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
			<div className="content-pane">
				<Profile />

				<BoardContainer />
			</div>
		);
	}

	return (
		<div className="content-pane">
			<GameOverlay currentOverlay={currentOverlay} />
		</div>
	);
};

const MobileGame: React.FunctionComponent = () => {
	return (
		<div className="game mobile portrait">
			<TopBar />

			<MobileGameContentPane />

			<Navbar />
		</div>
	);
};

export { MobileGame };
