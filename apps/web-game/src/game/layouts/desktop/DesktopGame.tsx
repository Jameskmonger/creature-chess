import * as React from "react";

import { createUseStyles } from "react-jss";

import { Footer, Layout } from "@cc-web/ui";
import { LandscapeGameScreen } from "@cc-web/ui/gameScreen";

import { BoardContainer } from "../../board";
import { Controls } from "../../board/overlays";
import {
	PlayerList,
	CardShop,
	Help,
	Profile,
	RoundIndicator,
	PhaseInfo,
	NowPlaying,
	QuitGameButton,
} from "../../module";

const useStyles = createUseStyles({
	helpContainer: {
		overflowY: "scroll",
		padding: "0.5em",
		background: "#566c86",
	},
	rightColumn: {
		height: "100%",
	},
	actionBar: {
		width: "100%",
		height: "10%",
	},
});

const DesktopGame: React.FunctionComponent = () => {
	const styles = useStyles();

	return (
		<LandscapeGameScreen
			leftColumnContent={
				<>
					<RoundIndicator />

					<PhaseInfo />

					<NowPlaying />

					<PlayerList />

					<QuitGameButton />
				</>
			}
			middleColumnContent={
				<>
					<BoardContainer />

					<div className={styles.actionBar}>
						<Controls />
					</div>
				</>
			}
			rightColumnContent={
				<Layout direction="column" className={styles.rightColumn}>
					<CardShop />

					<Profile />

					<div className={styles.helpContainer}>
						<Help hideFooter />
						<Footer />
					</div>
				</Layout>
			}
		/>
	);
};

export { DesktopGame };
