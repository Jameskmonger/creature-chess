import * as React from "react";

import { Footer } from "@creature-chess/ui";
import {
	PlayerList, CardShop, Help,
	Profile, RoundIndicator, PhaseInfo,
	NowPlaying, QuitGameButton
} from "../module";
import { BoardContainer } from "../board";

const DesktopGame: React.FunctionComponent = () => (
	<div className="game landscape">
		<div className="group">
			<RoundIndicator />

			<PhaseInfo />

			<NowPlaying />

			<PlayerList />
		</div>

		<BoardContainer />

		<div className="group right">
			<QuitGameButton />

			<CardShop />

			<Profile />

			<div className="help-container"><Help hideFooter /></div>

			<Footer />
		</div>
	</div>
);

export { DesktopGame };
