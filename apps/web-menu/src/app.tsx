import * as React from "react";

import ReactModal from "react-modal";

import { useLocalPlayer } from "@cc-web/auth/context";
import { useGlobalStyles } from "@cc-web/ui";

import { MenuHomePage } from "./pages/home";
import { MenuLoginPage } from "./pages/login";

ReactModal.setAppElement("#approot");

const App: React.FunctionComponent = () => {
	const localPlayer = useLocalPlayer();

	useGlobalStyles();

	if (!localPlayer) {
		return <MenuLoginPage />;
	}

	return <MenuHomePage />;
};

export { App };
