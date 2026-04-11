import * as React from "react";

import {
	faChartColumn,
	faQuestionCircle,
	faShoppingCart,
	faUsers,
} from "@fortawesome/free-solid-svg-icons";
import { createUseStyles } from "react-jss";
import { useDispatch, useSelector } from "react-redux";
import { NavBar } from "~/components/ui/navbar/NavBar";
import { closeOverlay, openOverlay, Overlay } from "~/store/game/ui";
import { AppState } from "~/store/state";

import { NavItemShop } from "./NavItemShop";

const useStyles = createUseStyles({
	navBar: {
		display: "flex",
		flexDirection: "row",
	},
});

const navBarItems = [
	{ key: "players", icon: faUsers },
	{ key: "shop", icon: faShoppingCart, children: <NavItemShop /> },
	{ key: "stats", icon: faChartColumn },
	{ key: "settings", icon: faQuestionCircle },
] as const;

function getOverlayKey(
	overlay: Overlay | null
): (typeof navBarItems)[number]["key"] | null {
	switch (overlay) {
		case Overlay.PLAYERS:
			return "players";
		case Overlay.SHOP:
			return "shop";
		case Overlay.STATS:
			return "stats";
		case Overlay.SETTINGS:
			return "settings";
		default:
			return null;
	}
}

function getKeyOverlay(
	key: (typeof navBarItems)[number]["key"]
): Overlay | null {
	switch (key) {
		case "players":
			return Overlay.PLAYERS;
		case "shop":
			return Overlay.SHOP;
		case "stats":
			return Overlay.STATS;
		case "settings":
			return Overlay.SETTINGS;
		default:
			return null;
	}
}

export function GameNavBar() {
	const styles = useStyles();
	const dispatch = useDispatch();

	const activeOverlay = useSelector<AppState, Overlay | null>(
		(state) => state.game.ui.currentOverlay
	);

	const canUseShop = useSelector<AppState, boolean>(
		(state) => state.game.playerInfo.health !== 0
	);
	const isSpectating = useSelector<AppState, boolean>(
		(state) => state.game.spectating.id !== null
	);

	const onClick = (key: (typeof navBarItems)[number]["key"]) => {
		if (key === getOverlayKey(activeOverlay)) {
			dispatch(closeOverlay());
			return;
		}

		if (key === "shop") {
			if (!canUseShop || isSpectating) {
				return;
			}
		}

		const overlay = getKeyOverlay(key);

		if (overlay === null) {
			return;
		}

		dispatch(openOverlay(overlay));
	};

	return (
		<NavBar
			items={navBarItems}
			active={getOverlayKey(activeOverlay)}
			onSelect={onClick}
		/>
	);
}
