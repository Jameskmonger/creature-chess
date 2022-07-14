import * as React from "react";

import { createUseStyles } from "react-jss";

import { Footer, Group, Layout } from "@creature-chess/ui";
import { LandscapeGameScreen } from "@creature-chess/ui/gameScreen";

import { BoardContainer } from "../../board";
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
			middleColumnContent={<BoardContainer scaleMode="width" />}
			rightColumnContent={
				<Layout direction="column" className={styles.rightColumn}>
					<QuitGameButton />

					<CardShop />

					<Profile />

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
