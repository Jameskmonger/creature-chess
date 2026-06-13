import * as React from "react";

import {
	faPlay,
	faQuestionCircle,
	faBook,
} from "@fortawesome/free-solid-svg-icons";
import { useSocketManager } from "~/networking";
import { getAvailableCreatureIds } from "~/networking/creatureDefinitions";
import { Region } from "~/plugins";
import { createUseThemeStyles } from "~/useStyles";

import { PageBoardBackground } from "../PageBackground";
import { TagLine } from "../TagLine";
import { UpdateNotes } from "../game/UpdateNotes";
import { Help } from "../game/help";
import { Button } from "../ui";
import { CreatureImage } from "../ui/creatureImage";
import { NavBar } from "../ui/navbar/NavBar";
import { MenuCard } from "./MenuCard";

const useStyles = createUseThemeStyles((theme) => ({
	root: {
		width: "100%",
		height: "100%",
		boxSizing: "border-box",
		display: "flex",
		flexDirection: "column",
	},
	brandBar: {
		"display": "flex",
		"flexDirection": "row",
		"alignItems": "center",
		"justifyContent": "space-between",
		"background": theme.palette.background,
		"borderBottom": "2px solid hsl(224 26% 24% / 1)",
		"padding": "0.25rem 1rem",

		"& img": {
			height: "5rem",
			filter: "drop-shadow(0px 2px 2px #222)",
		},
	},
	content: {
		padding: "0.5rem",
		flex: 1,
		position: "relative",
		display: "flex",
		flexDirection: "column",
		overflow: "hidden",
		gap: "0.5rem",
	},
	main: {
		flex: 1,
		overflow: "auto",
	},
	home: {
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		height: "100%",
		gap: "0.5rem",
	},
	homeCard: {
		display: "flex",
		flexDirection: "column",
		gap: "1rem",
	},
	creatures: {
		"display": "flex",
		"justifyContent": "center",
		"gap": "8px",
		"& img": {
			height: "48px",
			width: "48px",
		},
	},
	welcome: {
		fontSize: "24px",
		textAlign: "center",
		color: theme.palette.light.neutral,
	},
	highlight: {
		color: "#f5d742",
		fontFamily: theme.typography.accent,
	},
}));

const WELCOME_CREATURE_COUNT = 5;

const pickRandomCreatureIds = (count: number): number[] => {
	const pool = getAvailableCreatureIds();
	for (let i = pool.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[pool[i], pool[j]] = [pool[j], pool[i]];
	}
	return pool.slice(0, count);
};

export function GameMenu() {
	const classes = useStyles();
	const socketManager = useSocketManager();

	const welcomeCreatures = React.useMemo(
		() => pickRandomCreatureIds(WELCOME_CREATURE_COUNT),
		[]
	);

	const onFindGameClick = React.useCallback(
		() => socketManager.connect(),
		[socketManager]
	);

	const [view, setView] = React.useState<"help" | "home" | "updates">("home");

	return (
		<div className={classes.root}>
			<div className={classes.brandBar}>
				<img src={`${APP_IMAGE_ROOT}/ui/logo.png`} alt="Creature Chess Logo" />
				<TagLine />
			</div>
			<div className={classes.content}>
				<PageBoardBackground />
				<Region cls="menu-header" ctx={{}} />
				<div className={classes.main}>
					{view === "home" && (
						<div className={classes.home}>
							<Region cls="main-menu" ctx={{}}>
								<MenuCard className={classes.homeCard}>
									<p className={classes.welcome}>
										Welcome to{" "}
										<span className={classes.highlight}>Creature Chess</span>!
									</p>
									<div className={classes.creatures}>
										{welcomeCreatures.map((id) => (
											<CreatureImage
												key={id}
												definitionId={id}
												facing="front"
											/>
										))}
									</div>
									<Button
										color="primary"
										size="large"
										onClick={onFindGameClick}
									>
										Start Game
									</Button>
									<Button
										color="muted"
										size="medium"
										onClick={() => setView("help")}
									>
										How to Play
									</Button>
									<Button
										color="muted"
										size="medium"
										onClick={() => setView("updates")}
									>
										Update Notes
									</Button>
								</MenuCard>
							</Region>
						</div>
					)}
					{view === "help" && (
						<MenuCard>
							<Help onBack={() => setView("home")} />
						</MenuCard>
					)}
					{view === "updates" && (
						<MenuCard>
							<UpdateNotes onBack={() => setView("home")} />
						</MenuCard>
					)}
				</div>
			</div>
			<div>
				<NavBar
					items={
						[
							{
								key: "help",
								icon: faQuestionCircle,
							},
							{
								key: "home",
								icon: faPlay,
							},
							{
								key: "updates",
								icon: faBook,
							},
						] as const
					}
					active={view}
					onSelect={setView}
				/>
			</div>
		</div>
	);
}
