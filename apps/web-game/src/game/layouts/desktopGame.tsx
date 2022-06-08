import * as React from "react";

import { Footer, Group } from "@creature-chess/ui";
import {
	PlayerList, CardShop, Help,
	Profile, RoundIndicator, PhaseInfo,
	NowPlaying, QuitGameButton
} from "../module";
import { BoardContainer } from "../board";

const DesktopGame: React.FunctionComponent = () => (
	<div className="game landscape">
		<Group>
			<RoundIndicator />

			<PhaseInfo />

			<NowPlaying />

			<PlayerList />
		</Group>

		<BoardContainer />

		<Group className="right-group-legacy">
			<QuitGameButton />

			<CardShop />

			<Profile />

			<div className="help-container"><Help hideFooter /></div>

			<Footer />
		</Group>
	</div>
);

export { DesktopGame };
