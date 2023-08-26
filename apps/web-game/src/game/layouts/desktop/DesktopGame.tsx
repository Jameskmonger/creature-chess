import * as React from "react";

import { Footer, Group, Layout } from "@cc-web/ui";
import { LandscapeGameScreen } from "@cc-web/ui/gameScreen";
import { createUseStyles } from "react-jss";

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
				</>
			}
			middleColumnContent={<BoardContainer />}
			rightColumnContent={
				<Layout direction="column" className={styles.rightColumn}>
					<QuitGameButton />

					<CardShop />

					<Profile />

					<Controls />

					<div className={styles.helpContainer}>
						<Help hideFooter />
					</div>

					<Footer />
				</Layout>
			}
		/>
	);
};

export { DesktopGame };
