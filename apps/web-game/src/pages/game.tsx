import * as React from "react";

import Media from "react-media";
import { useSelector } from "react-redux";
import { GuestAuthProvider } from "~/auth/guest";
import { DesktopGame, MobileGame } from "~/components/game";
import { GamemodeSettingsContextProvider } from "~/contexts/GamemodeSettingsContext";
import { AppState } from "~/store";

export function GamePage() {
	const settings = useSelector((state: AppState) => state.game.settings);

	return (
		<GuestAuthProvider>
			<GamemodeSettingsContextProvider value={settings}>
				<Media query="(orientation: landscape) and (min-width: 1200px)">
					<DesktopGame />
				</Media>

				<Media query="(orientation: landscape) and (max-width: 1199px) and (min-width: 600px)">
					<MobileGame />
				</Media>

				<Media query="(orientation: portrait), (max-width: 599px)">
					<MobileGame />
				</Media>
			</GamemodeSettingsContextProvider>
		</GuestAuthProvider>
	);
}
