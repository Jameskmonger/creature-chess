import * as React from "react";
import { createUseStyles } from "react-jss";

import { Footer, Group, Layout } from "@creature-chess/ui";
import {
	PlayerList, CardShop, Help,
	Profile, RoundIndicator, PhaseInfo,
	NowPlaying, QuitGameButton
} from "../../module";
import { BoardContainer } from "../../board";

const useStyles = createUseStyles({
	helpContainer: {
		"overflowY": "scroll",
		"padding": "0.5em",
		"background": "#566c86",
	},
	rightLayout: {
		flex: "1",
	}
});

const DesktopGame: React.FunctionComponent = () => {
	const styles = useStyles();

	return (
		<Layout direction="row">
			<Group>
				<RoundIndicator />

				<PhaseInfo />

				<NowPlaying />

				<PlayerList />
			</Group>

			<BoardContainer />

			<Layout direction="column" className={styles.rightLayout}>
				<QuitGameButton />

				<CardShop />

				<Profile />

				<div className={styles.helpContainer}><Help hideFooter /></div>

				<Footer />
			</Layout>
		</Layout>
	);
};

export { DesktopGame };
