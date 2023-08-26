import React from "react";

import { useLocalPlayer } from "@cc-web/auth/context";
import { MenuPage, MenuPageContextProvider } from "@cc-web/ui";

import { MenuRegistrationPage } from "./register";

export function MenuHomePage() {
	const localPlayer = useLocalPlayer();

	if (!localPlayer) {
		return <span>please wait...</span>;
	}

	if (localPlayer.type === "user" && localPlayer.registered) {
		return <MenuRegistrationPage />;
	}

	const onFindGameClick = () => {
		window.location.href = process.env.GAME_SERVER_URL!;
	};

	const menuPageContext = {
		findGame: onFindGameClick,
		auth: {
			logout: () => {
				/* .. */
			},
		},
	};

	return (
		<MenuPageContextProvider value={menuPageContext}>
			<MenuPage />
		</MenuPageContextProvider>
	);
}
