// tslint:disable:jsx-ban-props
import * as React from "react";

import Div100vh from "react-div-100vh";
import Media from "react-media";
import { useSelector } from "react-redux";

import { GamemodeSettingsContextProvider } from "@cc-web/ui/GamemodeSettingsContext";

import { AppState } from "../store";
import { DesktopGame } from "./layouts/desktop/DesktopGame";
import { MobileGame } from "./layouts/mobile/MobileGame";

export function GamePage() {
	const settings = useSelector((state: AppState) => state.game.settings);

	return (
		<GamemodeSettingsContextProvider value={settings}>
			<Div100vh>
				<Media query="(orientation: landscape) and (min-width: 1200px)">
					<DesktopGame />
				</Media>

				<Media query="(orientation: landscape) and (max-width: 1199px) and (min-width: 600px)">
					<MobileGame />
				</Media>

				<Media query="(orientation: portrait), (max-width: 599px)">
					<MobileGame />
				</Media>
			</Div100vh>
		</GamemodeSettingsContextProvider>
	);
}
