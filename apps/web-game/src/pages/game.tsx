import * as React from "react";

import Media from "react-media";
import { GuestAuthProvider } from "~/auth/guest";
import { DesktopGame, MobileGame } from "~/components/game";

export function GamePage() {
	return (
		<GuestAuthProvider>
			<Media query="(orientation: landscape) and (min-width: 1200px)">
				<DesktopGame />
			</Media>

			<Media query="(orientation: landscape) and (max-width: 1199px) and (min-width: 600px)">
				<MobileGame />
			</Media>

			<Media query="(orientation: portrait), (max-width: 599px)">
				<MobileGame />
			</Media>
		</GuestAuthProvider>
	);
}
