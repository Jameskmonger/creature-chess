import * as React from "react";

import { createUseStyles } from "react-jss";

import { Footer, Layout } from "@cc-web/ui";
import { TabMenu } from "@cc-web/ui/components/TabMenu";
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
		padding: "0.5em",
		background: "#566c86",
	},
	leftColumn: {
		height: "100%",
		display: "flex",
		flexDirection: "column",
	},
	tabMenu: {
		flex: 1,
	},
	rightColumn: {
		height: "100%",
	},
});

const DesktopGame: React.FunctionComponent = () => {
	const styles = useStyles();

	const leftTabs = React.useMemo(
		() => [
			{
				label: "Players",
				content: <PlayerList />,
			},
			{
				label: "Help",
				content: (
					<div className={styles.helpContainer}>
						<Help hideFooter />
						<Footer />
					</div>
				),
			},
		],
		[styles.helpContainer]
	);

	return (
		<LandscapeGameScreen
			leftColumnContent={
				<div className={styles.leftColumn}>
					<RoundIndicator />

					<PhaseInfo />

					<NowPlaying />

					<TabMenu tabs={leftTabs} className={styles.tabMenu} />

					<QuitGameButton />
				</div>
			}
			middleColumnContent={<BoardContainer />}
			rightColumnContent={
				<Layout direction="column" className={styles.rightColumn}>
					<QuitGameButton />

					<CardShop />

					<Profile />
				</Layout>
			}
		/>
	);
};

export { DesktopGame };
